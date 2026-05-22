import { NextRequest, NextResponse } from 'next/server'
import { getOAuth2Client } from '@/lib/gmail/client'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/dashboard?error=gmail_denied', request.url))
  }

  try {
    const oauth2Client = getOAuth2Client()
    const { tokens } = await oauth2Client.getToken(code)

    // For MVP: use a fixed demo user id
    // In production: get from session
    const userId = 'demo-user'

    await supabaseAdmin.from('gmail_tokens').upsert({
      user_id: userId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
      scope: tokens.scope,
    })

    return NextResponse.redirect(new URL('/dashboard?gmail=connected', request.url))
  } catch (err) {
    console.error('Gmail OAuth error:', err)
    return NextResponse.redirect(new URL('/dashboard?error=gmail_failed', request.url))
  }
}
