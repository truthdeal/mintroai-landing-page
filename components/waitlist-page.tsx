"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Sparkles, Users, Bell, Zap, Shield, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/logo-small.svg"

export default function WaitlistPage() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

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

    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    setIsSubmitting(false)
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
          <Link href="/">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 font-[450] tracking-wider" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
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
                <span className="text-sm font-[450] text-violet-300">Early Access</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-6xl font-light tracking-tighter leading-tight mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-violet-400">
                  Be Among the First
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                  to Experience AI-Powered
                </span>
                <br />
                <span className="text-white">
                  Smart Contracts
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg text-gray-400 mb-8 font-normal tracking-wide max-w-xl mx-auto lg:mx-0"
              >
                Join our exclusive waitlist and get early access to the future of blockchain development. 
                Be notified when we launch and receive special benefits as an early adopter.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-violet-400">2,000+</div>
                  <div className="text-sm text-gray-500">Developers Waiting</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-indigo-400">Q1 2025</div>
                  <div className="text-sm text-gray-500">Launch Date</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-purple-400">50%</div>
                  <div className="text-sm text-gray-500">Early Bird Discount</div>
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
                      <h2 className="text-2xl font-[450] tracking-tight mb-2">Reserve Your Spot</h2>
                      <p className="text-gray-400 mb-6 text-sm">
                        Enter your email to join the waitlist. No spam, ever.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                            required
                          />
                          {error && (
                            <p className="text-red-400 text-sm mt-2">{error}</p>
                          )}
                        </div>

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
                              Join Waitlist
                              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          )}
                        </Button>
                      </form>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>Get notified when we launch</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>Exclusive early access benefits</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>Special pricing for early adopters</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-[450] tracking-tight mb-2">You're on the list!</h3>
                      <p className="text-gray-400 mb-6">
                        We'll notify you at <span className="text-violet-400 font-medium">{email}</span> when we launch.
                      </p>
                      <Button
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        onClick={() => {
                          setSubmitted(false)
                          setEmail("")
                        }}
                      >
                        Add Another Email
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                {waitlistFeatures.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <feature.icon className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-[450] text-sm text-neutral-200">{feature.title}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Section - Why Join */}
      <section className="relative py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tighter mb-4">
              Why Join Our Waitlist?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-normal tracking-wide">
              As an early member, you'll get exclusive access to features and pricing that won't be available later
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
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

const waitlistFeatures = [
  {
    title: "Priority Access",
    description: "Be first to try",
    icon: Zap,
  },
  {
    title: "Lifetime Discount",
    description: "50% off forever",
    icon: Shield,
  },
  {
    title: "Beta Features",
    description: "Test new tools",
    icon: Brain,
  },
  {
    title: "Direct Support",
    description: "Priority help",
    icon: Users,
  },
]

const benefits = [
  {
    title: "Early Bird Pricing",
    description: "Lock in discounted rates that will never increase for your account, saving thousands annually.",
    icon: Bell,
  },
  {
    title: "Shape the Product",
    description: "Your feedback will directly influence features and improvements. Be part of building the future.",
    icon: Users,
  },
  {
    title: "Exclusive Community",
    description: "Join a select group of innovators and get access to private workshops and networking events.",
    icon: Sparkles,
  },
]