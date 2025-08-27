import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      )
    }

    // Add to waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          created_at: new Date().toISOString(),
          referral_source: request.headers.get('referer') || 'direct',
          metadata: {
            user_agent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          }
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist. Please try again.' },
        { status: 500 }
      )
    }

    // Get the current position in waitlist
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      position: count || 0,
      data: data?.[0]
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Protected endpoint - using Supabase service role key for admin access
    const authHeader = request.headers.get('authorization')
    
    // Check for service role key to protect admin endpoint
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