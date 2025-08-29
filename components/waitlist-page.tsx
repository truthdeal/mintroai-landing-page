"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Sparkles, Users, Wallet, Copy, Trophy, TrendingUp, Gift, Search, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/logo-small.svg"

export default function WaitlistPage() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [twitterUsername, setTwitterUsername] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [userReferralCode, setUserReferralCode] = useState<string | null>(null)
  const [referralLink, setReferralLink] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  interface LeaderboardEntry {
    id: number
    display_name: string
    points: number
    total_referrals: number
    referral_code: string
    created_at: string
    rank: number
  }

  interface UserStats {
    points: number
    totalReferrals: number
    rank: number | null
  }

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [searchEmail, setSearchEmail] = useState("")
  interface SearchResultUser {
    email: string
    points: number
    totalReferrals: number
    referralCode: string
    rank: number | null
    position: number
    joinedDate: string
  }

  const [searchResult, setSearchResult] = useState<SearchResultUser | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")

  useEffect(() => {
    setMounted(true)
    // Get referral code from URL
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      setReferralCode(ref)
    }
    // Fetch leaderboard
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/waitlist?action=leaderboard')
      const data = await response.json()
      if (data.success) {
        setLeaderboard(data.leaderboard || [])
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    }
  }

  const fetchUserStats = async (code: string) => {
    try {
      const response = await fetch(`/api/waitlist?action=stats&code=${code}`)
      const data = await response.json()
      if (data.success) {
        setUserStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
    }
  }

  const searchUserByEmail = async () => {
    if (!searchEmail || !searchEmail.includes('@')) {
      setSearchError("Please enter a valid email address")
      return
    }

    setIsSearching(true)
    setSearchError("")
    setSearchResult(null)

    try {
      const response = await fetch(`/api/waitlist?action=search&email=${encodeURIComponent(searchEmail)}`)
      const data = await response.json()
      
      if (data.success) {
        setSearchResult(data.user)
      } else {
        setSearchError(data.error || "Email not found in waitlist")
      }
    } catch (error) {
      console.error('Search failed:', error)
      setSearchError("Failed to search. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  if (!mounted) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          walletAddress,
          twitterUsername,
          referralCode 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          if (data.referralCode) {
            // Email already exists, show their referral code
            setUserReferralCode(data.referralCode)
            setReferralLink(`${window.location.origin}/waitlist?ref=${data.referralCode}`)
            setSubmitted(true)
            fetchUserStats(data.referralCode)
          } else if (data.field === 'walletAddress') {
            setError("This wallet address is already registered with another account")
            // Clear the wallet field
            setWalletAddress("")
          } else if (data.field === 'twitterUsername') {
            setError("This Twitter/X username is already registered with another account")
            // Clear the Twitter field
            setTwitterUsername("")
          } else {
            setError(data.error || "Failed to join waitlist")
          }
        } else {
          setError(data.error || "Failed to join waitlist")
        }
        setIsSubmitting(false)
        return
      }

      setUserReferralCode(data.referralCode)
      setReferralLink(data.referralLink)
      setSubmitted(true)
      setIsSubmitting(false)
      // Fetch user stats and refresh leaderboard
      if (data.referralCode) {
        fetchUserStats(data.referralCode)
        fetchLeaderboard()
      }
    } catch (error) {
      console.error("Error submitting to waitlist:", error)
      setError("An error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const shareOnTwitter = () => {
    const text = `🚀 Join me on the @MintroAI waitlist! All in one Web3 Hub AI agent. 

Use my referral code for priority access: ${userReferralCode}

`
    const url = referralLink || ''
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10 animate-gradient" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,0,255,0.1)_0%,rgba(120,0,255,0)_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(0,100,255,0.1)_0%,rgba(0,100,255,0)_50%)]" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Header */}
      <header className="relative z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-1">
            <Image src={Logo} alt="MintroAI logo" width={30} height={30} />
            <span className="font-medium tracking-tight text-xl">MintroAI</span>
          </Link>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-violet-500/10 border-violet-500/20 text-violet-400 hover:bg-violet-500/20" 
              size="sm"
              onClick={() => {
                setShowLeaderboard(!showLeaderboard)
                // Clear search when toggling
                setSearchEmail("")
                setSearchResult(null)
                setSearchError("")
              }}
            >
              <Trophy className="h-4 w-4 mr-1" />
              Leaderboard
            </Button>
            <Link href="/">
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 font-[450] tracking-wider" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Referral Banner if coming from referral */}
      {referralCode && !submitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-40 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border-b border-violet-500/30"
        >
          <div className="container mx-auto px-4 py-3 text-center">
            <span className="text-sm text-violet-300">
              <Gift className="inline h-4 w-4 mr-1" />
              You&apos;re joining with referral code <span className="font-bold text-violet-400">{referralCode}</span>
            </span>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content or Leaderboard */}
            {showLeaderboard ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 max-w-4xl mx-auto w-full"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">🏆 Referral Leaderboard</h2>
                
                {/* Search Bar */}
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm mb-4">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Search by your email address..."
                          value={searchEmail}
                          onChange={(e) => setSearchEmail(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && searchUserByEmail()}
                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                        />
                      </div>
                      <Button
                        onClick={searchUserByEmail}
                        disabled={isSearching}
                        className="bg-violet-600 hover:bg-violet-500 text-white"
                      >
                        {isSearching ? (
                          <span className="flex items-center">
                            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Searching...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Search className="h-4 w-4 mr-1" />
                            Search
                          </span>
                        )}
                      </Button>
                    </div>
                    
                    {/* Search Error */}
                    {searchError && (
                      <p className="text-red-400 text-sm mt-3">{searchError}</p>
                    )}
                    
                    {/* Search Result */}
                    {searchResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-lg border border-violet-500/20"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-1">Your Stats</p>
                            <p className="font-medium text-white mb-2">{searchResult.email}</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                              <div>
                                <p className="text-2xl font-bold text-violet-400">{searchResult.points}</p>
                                <p className="text-xs text-gray-500">Points</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-indigo-400">{searchResult.totalReferrals}</p>
                                <p className="text-xs text-gray-500">Referrals</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-yellow-400">
                                  {searchResult.rank ? `#${searchResult.rank}` : '—'}
                                </p>
                                <p className="text-xs text-gray-500">Rank</p>
                              </div>
                              <div className="hidden sm:block">
                                <p className="text-lg font-bold text-purple-400">{searchResult.referralCode}</p>
                                <p className="text-xs text-gray-500">Your Code</p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSearchResult(null)
                              setSearchEmail("")
                            }}
                            className="text-gray-400 hover:text-white ml-4"
                          >
                            ✕
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-300">Top 10 Referrers</h3>
                    {leaderboard.length > 0 ? (
                      <div className="space-y-3">
                        {leaderboard.slice(0, 10).map((entry, index) => (
                          <div
                            key={entry.id}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              index < 3 ? 'bg-gradient-to-r from-violet-500/10 to-indigo-500/10' : 'bg-white/[0.02]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`text-2xl font-bold ${
                                index === 0 ? 'text-yellow-400' :
                                index === 1 ? 'text-gray-400' :
                                index === 2 ? 'text-orange-400' :
                                'text-white'
                              }`}>
                                #{entry.rank}
                              </div>
                              <div>
                                <div className="font-medium text-gray-200">{entry.display_name}</div>
                                <div className="text-xs text-gray-500">Joined {new Date(entry.created_at).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-violet-400">{entry.points} pts</div>
                              <div className="text-xs text-gray-500">{entry.total_referrals} referrals</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400">No referrals yet. Be the first!</p>
                    )}
                  </CardContent>
                </Card>
                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    className="bg-white/5 border-white/10"
                    onClick={() => {
                      setShowLeaderboard(false)
                      // Clear search when going back
                      setSearchEmail("")
                      setSearchResult(null)
                      setSearchError("")
                    }}
                  >
                    Back to Waitlist
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-center lg:text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6"
                  >
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-[450] text-violet-300">Early Access + Referral Rewards</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-light tracking-tighter leading-tight mb-6"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-violet-400">
                      Join & Earn Rewards
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                      Share to Climb the Ranks
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-lg text-gray-400 mb-8 font-normal tracking-wide max-w-xl mx-auto lg:mx-0"
                  >
                    Get early access to AI-powered smart contracts. Earn 10 points for each friend who joins with your referral code. 
                    Top referrers get exclusive benefits!
                  </motion.p>

                  {/* Referral Benefits */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto lg:mx-0"
                  >
                    <div className="text-center lg:text-left">
                      <div className="text-2xl font-bold text-violet-400">10 pts</div>
                      <div className="text-sm text-gray-500">Per Referral</div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-2xl font-bold text-indigo-400">Top 10</div>
                      <div className="text-sm text-gray-500">Get VIP Access</div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-2xl font-bold text-purple-400">∞</div>
                      <div className="text-sm text-gray-500">Referrals</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm">
                    <CardContent className="p-8">
                      {!submitted ? (
                        <>
                          <h2 className="text-2xl font-[450] tracking-tight mb-2 text-gray-100">Reserve Your Spot</h2>
                          <p className="text-gray-400 mb-4 text-sm">
                            Join the waitlist and get your unique referral code
                          </p>
                          
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">
                                Email * <span className="text-violet-400 font-medium ml-1">+10 pts</span>
                              </label>
                              <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                                required
                              />
                            </div>

                            <div>
                              <label className="text-xs text-gray-400 block mb-1">
                                <Wallet className="inline h-3 w-3 mr-1" />
                                EVM Wallet Address (Optional) <span className="text-violet-400 font-medium ml-1">+5 pts</span>
                              </label>
                              <input
                                type="text"
                                placeholder="0x..."
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                              />
                              <p className="text-xs text-gray-500 mt-1">For future airdrops and rewards</p>
                            </div>

                            <div>
                              <label className="text-xs text-gray-400 block mb-1">
                                𝕏 X (Twitter) Username (Optional) <span className="text-violet-400 font-medium ml-1">+5 pts</span>
                              </label>
                              <input
                                type="text"
                                placeholder="@username"
                                value={twitterUsername}
                                onChange={(e) => setTwitterUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                              />
                              <p className="text-xs text-gray-500 mt-1">Link your X account</p>
                            </div>

                            {error && (
                              <p className="text-red-400 text-sm">{error}</p>
                            )}

                            <Button 
                              type="submit"
                              size="lg"
                              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-[450] tracking-wide group"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Joining...
                                </span>
                              ) : (
                                <span className="flex items-center justify-center">
                                  Join Waitlist & Get Referral Code
                                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                              )}
                            </Button>
                          </form>

                          <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span>Earn up to 20 points instantly on signup</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span>Get +10 points for each friend you refer</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span>Top referrers get exclusive rewards</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-center py-4"
                        >
                          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                          </div>
                          <h3 className="text-2xl font-[450] tracking-tight mb-4 text-gray-100">You&apos;re on the list!</h3>
                          
                          {/* Referral Code Display */}
                          <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-400 mb-2">Your Referral Code</p>
                            <div className="text-3xl font-bold text-violet-400 mb-3">{userReferralCode}</div>
                            
                            <div className="flex gap-2 justify-center">
                              <Button
                                variant="outline"
                                className="bg-white/5 border-white/10"
                                onClick={copyToClipboard}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                {copySuccess ? "Copied!" : "Copy Link"}
                              </Button>
                              <Button
                                variant="outline"
                                className="bg-white/5 border-white/10"
                                onClick={shareOnTwitter}
                              >
                                𝕏
                                <span className="ml-1">Share</span>
                              </Button>
                            </div>
                          </div>

                          {/* User Stats */}
                          {userStats && (
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="bg-white/[0.02] rounded-lg p-3">
                                <TrendingUp className="h-4 w-4 text-violet-400 mx-auto mb-1" />
                                <div className="text-lg font-bold text-gray-100">{userStats.points || 0}</div>
                                <div className="text-xs text-gray-500">Points</div>
                              </div>
                              <div className="bg-white/[0.02] rounded-lg p-3">
                                <Users className="h-4 w-4 text-indigo-400 mx-auto mb-1" />
                                <div className="text-lg font-bold text-gray-100">{userStats.totalReferrals || 0}</div>
                                <div className="text-xs text-gray-500">Referrals</div>
                              </div>
                              <div className="bg-white/[0.02] rounded-lg p-3">
                                <Trophy className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
                                <div className="text-lg font-bold text-gray-100">#{userStats.rank || '∞'}</div>
                                <div className="text-xs text-gray-500">Rank</div>
                              </div>
                            </div>
                          )}

                          <p className="text-sm text-gray-400 mb-4">
                            Share your referral link to earn points and climb the leaderboard!
                          </p>

                          <Button
                            variant="outline"
                            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                            onClick={() => {
                              setSubmitted(false)
                              setEmail("")
                              setWalletAddress("")
                              setTwitterUsername("")
                            }}
                          >
                            Add Another Email
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Section - Why Join */}
      {!showLeaderboard && (
        <section className="relative py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-normal tracking-tighter mb-4">
                Referral Rewards System
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-normal tracking-wide">
                The more friends you bring, the higher you climb. Top referrers get exclusive perks!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {referralBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="bg-indigo-950/20 border-indigo-500/10 hover:border-indigo-500/30 hover:bg-indigo-950/30 transition-all h-full">
                    <CardContent className="p-6">
                      <benefit.icon className="w-10 h-10 text-violet-400 mb-4" />
                      <h3 className="text-lg font-[450] tracking-tight mb-2 text-neutral-200">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-400 font-[350] tracking-wide text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 mb-4 md:mb-0">
              <Image src={Logo} alt="MintroAI logo" width={24} height={24} />
              <span className="font-medium text-sm">MintroAI</span>
            </div>
            <div className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} MintroAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const referralBenefits = [
  {
    title: "Earn Points",
    description: "Get 10 points for every friend who joins with your referral code. Points unlock exclusive benefits.",
    icon: Gift,
  },
  {
    title: "Climb the Ranks",
    description: "Top 10 referrers get VIP access, special perks, and priority support when we launch.",
    icon: Trophy,
  },
  {
    title: "Future Rewards",
    description: "Points may be converted to platform credits, NFTs, or other rewards when we launch.",
    icon: Sparkles,
  },
]

