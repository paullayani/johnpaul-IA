export interface Email {
  id: string
  threadId: string
  from: string
  fromName: string
  to: string
  subject: string
  body: string
  bodyHtml?: string
  receivedAt: string
  isRead: boolean
  labels: string[]
  snippet: string
}

export interface EmailDraft {
  id?: string
  emailId: string
  subject: string
  body: string
  to: string
  generatedAt: string
  status: 'pending' | 'sent' | 'discarded'
  tone: 'professional' | 'friendly' | 'formal'
}

export interface Agent {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'running'
  type: 'email' | 'instagram' | 'google_reviews' | 'marketing'
  lastRun?: string
  tasksCompleted: number
}

export interface DashboardStats {
  emailsToProcess: number
  draftsGenerated: number
  agentsActive: number
  postsScheduled: number
}

export interface GmailToken {
  access_token: string
  refresh_token: string
  expiry_date: number
}
