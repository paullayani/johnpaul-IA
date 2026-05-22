import { NextRequest, NextResponse } from 'next/server'
import { generateEmailReply, processEmailBatch } from '@/lib/agents/email-agent'
import { createDraft } from '@/lib/gmail/client'
import type { Email } from '@/types'

// Generate a single draft reply
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, tone, saveToDraft } = body as {
      email: Email
      tone?: 'professional' | 'friendly' | 'formal'
      saveToDraft?: boolean
    }

    const draft = await generateEmailReply(email, tone || 'professional')

    if (saveToDraft) {
      const gmailDraft = await createDraft(
        'demo-user',
        draft.to,
        draft.subject,
        draft.body,
        email.threadId
      )
      return NextResponse.json({ draft, gmailDraftId: gmailDraft.id })
    }

    return NextResponse.json({ draft })
  } catch (err: any) {
    console.error('Email agent error:', err)
    return NextResponse.json(
      { error: err.message || 'Agent failed' },
      { status: 500 }
    )
  }
}

// Process all unread emails in batch
export async function PUT(request: NextRequest) {
  try {
    const { emails } = await request.json() as { emails: Email[] }
    const drafts = await processEmailBatch(emails)
    return NextResponse.json({ drafts, count: drafts.length })
  } catch (err: any) {
    console.error('Batch email agent error:', err)
    return NextResponse.json(
      { error: err.message || 'Batch processing failed' },
      { status: 500 }
    )
  }
}
