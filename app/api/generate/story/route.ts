import { NextRequest, NextResponse } from 'next/server'
import { generate } from '@/lib/claude/client'

export async function POST(req: NextRequest) {
  try {
    const { intent } = await req.json()
    if (!intent) return NextResponse.json({ error: 'Intention requise' }, { status: 400 })

    const prompt = `Tu es expert en Instagram Stories pour "John Paul Optique", magasin d'optique premium.
Je veux publier cette story : "${intent}"

Propose un plan complet pour cette story. Réponds avec ce format structuré :

🎯 TEXTE PRINCIPAL
(1 phrase courte et percutante, maximum 8 mots, style Instagram moderne)

💬 STICKER SONDAGE
Question : [question engageante]
Option A : [réponse 1]
Option B : [réponse 2]

❓ STICKER QUESTION OUVERTE
[Question ouverte pour engager la communauté]

🎬 CONSEIL MONTAGE
[Comment filmer ou organiser visuellement la story : fond, position texte, ambiance]

🔗 CTA (bouton lien si applicable)
[Texte du bouton : ex "Prendre RDV", "Voir la collection", "Nous appeler"]

✨ EMOJIS SUGGÉRÉS
[3-5 emojis qui correspondent à la story]

Ton : spontané, moderne, authentique. Les stories doivent donner envie d'interagir.`

    const story = await generate(prompt, 1024)
    return NextResponse.json({ story })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
