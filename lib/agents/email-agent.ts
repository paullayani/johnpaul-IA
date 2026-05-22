import Anthropic from '@anthropic-ai/sdk'
import type { Email, EmailDraft } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const STORE_CONTEXT = `
Tu es l'assistant IA d'un magasin d'optique professionnel.
Le magasin s'appelle "John Paul Optique".
Tu rédiges des réponses par email en français, polies, professionnelles et chaleureuses.
Tu peux aussi écrire en anglais si le client écrit en anglais.
Domaines : lunettes, lentilles de contact, examens de vue, montures, verres correcteurs.
Toujours proposer un rendez-vous ou inviter à venir en magasin quand c'est pertinent.
Signe toujours avec "L'équipe John Paul Optique".
`

export async function generateEmailReply(
  email: Email,
  tone: 'professional' | 'friendly' | 'formal' = 'professional'
): Promise<EmailDraft> {
  const toneInstructions = {
    professional: 'Ton professionnel et chaleureux.',
    friendly: 'Ton amical et détendu, tout en restant courtois.',
    formal: 'Ton très formel et officiel.',
  }

  const prompt = `${STORE_CONTEXT}

${toneInstructions[tone]}

Voici l'email reçu :
De : ${email.fromName} <${email.from}>
Sujet : ${email.subject}
Message :
${email.body || email.snippet}

Rédige une réponse complète et appropriée à cet email.
Commence directement par "Bonjour" ou "Madame/Monsieur" selon le contexte.
Ne mets pas d'objet, juste le corps du message.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const body = response.content[0].type === 'text' ? response.content[0].text : ''

  const replySubject = email.subject.startsWith('Re:')
    ? email.subject
    : `Re: ${email.subject}`

  return {
    emailId: email.id,
    subject: replySubject,
    body,
    to: email.from,
    generatedAt: new Date().toISOString(),
    status: 'pending',
    tone,
  }
}

export async function processEmailBatch(emails: Email[]): Promise<EmailDraft[]> {
  const drafts = await Promise.all(
    emails.map((email) => generateEmailReply(email))
  )
  return drafts
}
