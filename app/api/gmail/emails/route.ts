import { NextResponse } from 'next/server'
import { fetchUnreadEmails } from '@/lib/gmail/client'

export async function GET() {
  try {
    // MVP: fixed user id — replace with session user in production
    const emails = await fetchUnreadEmails('demo-user', 10)
    return NextResponse.json({ emails })
  } catch (err: any) {
    console.error('Gmail fetch error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to fetch emails' },
      { status: 500 }
    )
  }
}
