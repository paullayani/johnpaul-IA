import { NextRequest, NextResponse } from 'next/server'
import { generate, hasRealApiKey } from '@/lib/claude/client'
import { demoStory, delay } from '@/lib/claude/demo'

export async function POST(req: NextRequest) {
  try {
    const { intent } = await req.json()
    if (!intent) return NextResponse.json({ error: 'Intention requise' }, { status: 400 })

    if (!hasRealApiKey()) {
      await delay(1500)
      return NextResponse.json({ story: demoStory(intent), demo: true })
    }

    const prompt = `Tu es expert en Instagram Stories pour "John Paul Optique", magasin d'optique premium.
Je veux publier cette story : "${intent}"

Propose un plan complet. Réponds avec ce format structuré :

🎯 TEXTE PRINCIPAL
(1 phrase courte et percutante, maximum 8 mots, style Instagram moderne)

💬 STICKER SONDAGE
Question : [question engageante]
Option A : [réponse 1]
Option B : [réponse 2]

❓ STICKER QUESTION OUVERTE
[Question ouverte pour engager la communauté]

🎬 CONSEIL MONTAGE
[Comment filmer ou organiser visuellement la story]

🔗 CTA (bouton lien si applicable)
[Texte du bouton]

✨ EMOJIS SUGGÉRÉS
[3-5 emojis qui correspondent à la story]`

    const story = await generate(prompt, 1024)
    return NextResponse.json({ story })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
