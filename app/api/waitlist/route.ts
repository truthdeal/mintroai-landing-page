import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Validate Ethereum address
function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Validate Twitter username
function isValidTwitterUsername(username: string): boolean {
  // Remove @ if present and validate
  const cleanUsername = username.replace('@', '')
  return /^[A-Za-z0-9_]{1,15}$/.test(cleanUsername)
}

// Generate referral code
function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const { email, walletAddress, twitterUsername, referralCode } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate wallet address if provided
    if (walletAddress && !isValidEthereumAddress(walletAddress)) {
      return NextResponse.json(
        { error: 'Please provide a valid Ethereum wallet address' },
        { status: 400 }
      )
    }

    // Validate Twitter username if provided
    if (twitterUsername && !isValidTwitterUsername(twitterUsername)) {
      return NextResponse.json(
        { error: 'Please provide a valid Twitter username' },
        { status: 400 }
      )
    }

    // Clean Twitter username (remove @ if present)
    const cleanTwitter = twitterUsername ? twitterUsername.replace('@', '') : null

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (existingEmail) {
      return NextResponse.json({
        error: 'This email is already on the waitlist',
        referralCode: existingEmail.referral_code
      }, { status: 409 })
    }

    // Check if wallet address already exists (if provided)
    if (walletAddress) {
      const { data: existingWallet } = await supabase
        .from('waitlist')
        .select('*')
        .eq('wallet_address', walletAddress.toLowerCase())
        .single()

      if (existingWallet) {
        return NextResponse.json({
          error: 'This wallet address is already registered',
          field: 'walletAddress'
        }, { status: 409 })
      }
    }

    // Check if Twitter username already exists (if provided)
    if (cleanTwitter) {
      const { data: existingTwitter } = await supabase
        .from('waitlist')
        .select('*')
        .eq('twitter_username', cleanTwitter.toLowerCase())
        .single()

      if (existingTwitter) {
        return NextResponse.json({
          error: 'This Twitter/X username is already registered',
          field: 'twitterUsername'
        }, { status: 409 })
      }
    }

    // Generate unique referral code for new user
    let newReferralCode = generateReferralCode()
    let codeExists = true
    
    // Ensure code is unique
    while (codeExists) {
      const { data: existingCode } = await supabase
        .from('waitlist')
        .select('id')
        .eq('referral_code', newReferralCode)
        .single()
      
      if (!existingCode) {
        codeExists = false
      } else {
        newReferralCode = generateReferralCode()
      }
    }

    // Calculate initial points based on provided information
    let initialPoints = 10 // Base points for joining
    if (walletAddress) initialPoints += 5 // Bonus for wallet
    if (twitterUsername) initialPoints += 5 // Bonus for Twitter

    // Add to waitlist with referral tracking
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          wallet_address: walletAddress?.toLowerCase() || null,
          twitter_username: cleanTwitter?.toLowerCase() || null,
          referral_code: newReferralCode,
          referred_by: referralCode || null,
          points: initialPoints,
          total_referrals: 0,
          created_at: new Date().toISOString(),
          metadata: {
            user_agent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
            source: request.headers.get('referer') || 'direct',
            initial_points_breakdown: {
              base: 10,
              wallet: walletAddress ? 5 : 0,
              twitter: twitterUsername ? 5 : 0
            }
          }
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist. Please try again.' },
        { status: 500 }
      )
    }

    // Process referral if a valid referral code was provided
    if (referralCode && data) {
      // Find the referrer
      const { data: referrer, error: referrerError } = await supabase
        .from('waitlist')
        .select('id, points, total_referrals')
        .eq('referral_code', referralCode)
        .single()

      if (referrer && !referrerError) {
        // Update referrer's points and count
        await supabase
          .from('waitlist')
          .update({
            points: referrer.points + 10,
            total_referrals: referrer.total_referrals + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', referrer.id)

        // Log referral event
        await supabase
          .from('referral_events')
          .insert({
            referrer_id: referrer.id,
            referee_id: data.id,
            referrer_code: referralCode,
            points_awarded: 10,
            event_type: 'signup'
          })
      }
    }

    // Get the current position in waitlist
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      position: count || 0,
      referralCode: newReferralCode,
      referralLink: `${process.env.NEXT_PUBLIC_APP_URL || `${request.nextUrl.protocol}//${request.nextUrl.host}`}/waitlist?ref=${newReferralCode}`,
      data: {
        email: data.email,
        referralCode: newReferralCode,
        points: data.points,
        pointsEarned: initialPoints
      }
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Get waitlist stats and leaderboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // Public leaderboard endpoint
    if (action === 'leaderboard') {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .limit(50)

      if (error) {
        console.error('Leaderboard error:', error)
        return NextResponse.json(
          { error: 'Failed to fetch leaderboard' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        leaderboard: data
      })
    }

    // Get user stats by referral code
    if (action === 'stats') {
      const referralCode = searchParams.get('code')
      
      if (!referralCode) {
        return NextResponse.json(
          { error: 'Referral code required' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('waitlist')
        .select('points, total_referrals, referral_code')
        .eq('referral_code', referralCode)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: 'Invalid referral code' },
          { status: 404 }
        )
      }

      // Get rank
      const { data: leaderboard } = await supabase
        .from('leaderboard')
        .select('rank')
        .eq('referral_code', referralCode)
        .single()

      return NextResponse.json({
        success: true,
        stats: {
          points: data.points,
          totalReferrals: data.total_referrals,
          rank: leaderboard?.rank || null
        }
      })
    }

    // Search user by email
    if (action === 'search') {
      const email = searchParams.get('email')
      
      if (!email || !email.includes('@')) {
        return NextResponse.json(
          { error: 'Valid email required' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('waitlist')
        .select('email, points, total_referrals, referral_code, created_at')
        .eq('email', email.toLowerCase())
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: 'Email not found in waitlist' },
          { status: 404 }
        )
      }

      // Get rank from leaderboard view
      const { data: leaderboardEntry } = await supabase
        .from('leaderboard')
        .select('rank')
        .eq('referral_code', data.referral_code)
        .single()

      // Get total users for position
      const { count: totalUsers } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

      return NextResponse.json({
        success: true,
        user: {
          email: data.email,
          points: data.points,
          totalReferrals: data.total_referrals,
          referralCode: data.referral_code,
          rank: leaderboardEntry?.rank || null,
          position: totalUsers || 0,
          joinedDate: data.created_at
        }
      })
    }

    // Protected admin endpoint
    const authHeader = request.headers.get('authorization')
    
    if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error, count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      total: count,
      entries: data
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}