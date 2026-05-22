import { google } from 'googleapis'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { Email, GmailToken } from '@/types'

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

export function getAuthUrl() {
  const oauth2Client = getOAuth2Client()
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.modify',
    ],
    prompt: 'consent',
  })
}

export async function getGmailClient(userId: string) {
  const { data: tokenData } = await supabaseAdmin
    .from('gmail_tokens')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!tokenData) throw new Error('No Gmail token found')

  const oauth2Client = getOAuth2Client()
  oauth2Client.setCredentials({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expiry_date: tokenData.expiry_date,
  })

  // Auto-refresh if expired
  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.refresh_token || tokens.access_token) {
      await supabaseAdmin
        .from('gmail_tokens')
        .update({
          access_token: tokens.access_token,
          expiry_date: tokens.expiry_date,
        })
        .eq('user_id', userId)
    }
  })

  return google.gmail({ version: 'v1', auth: oauth2Client })
}

export async function fetchUnreadEmails(userId: string, maxResults = 10): Promise<Email[]> {
  const gmail = await getGmailClient(userId)

  const listRes = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread category:primary',
    maxResults,
  })

  const messages = listRes.data.messages || []
  if (messages.length === 0) return []

  const emails = await Promise.all(
    messages.map(async (msg) => {
      const detail = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id!,
        format: 'full',
      })

      const headers = detail.data.payload?.headers || []
      const getHeader = (name: string) =>
        headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || ''

      const fromRaw = getHeader('From')
      const fromMatch = fromRaw.match(/^(.*?)\s*<(.+?)>$/)
      const fromName = fromMatch ? fromMatch[1].trim().replace(/"/g, '') : fromRaw
      const fromEmail = fromMatch ? fromMatch[2] : fromRaw

      const body = extractBody(detail.data.payload)

      return {
        id: msg.id!,
        threadId: detail.data.threadId!,
        from: fromEmail,
        fromName,
        to: getHeader('To'),
        subject: getHeader('Subject'),
        body,
        receivedAt: new Date(parseInt(detail.data.internalDate!)).toISOString(),
        isRead: !detail.data.labelIds?.includes('UNREAD'),
        labels: detail.data.labelIds || [],
        snippet: detail.data.snippet || '',
      } satisfies Email
    })
  )

  return emails
}

function extractBody(payload: any): string {
  if (!payload) return ''

  if (payload.mimeType === 'text/plain' && payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8')
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      const text = extractBody(part)
      if (text) return text
    }
  }

  return ''
}

export async function createDraft(
  userId: string,
  to: string,
  subject: string,
  body: string,
  threadId?: string
) {
  const gmail = await getGmailClient(userId)

  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    body,
  ].join('\n')

  const encoded = Buffer.from(message).toString('base64url')

  const draft = await gmail.users.drafts.create({
    userId: 'me',
    requestBody: {
      message: {
        raw: encoded,
        ...(threadId ? { threadId } : {}),
      },
    },
  })

  return draft.data
}
