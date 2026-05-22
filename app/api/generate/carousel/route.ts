import { NextRequest, NextResponse } from 'next/server'
import { generate, hasRealApiKey } from '@/lib/claude/client'
import { demoCarousel, delay } from '@/lib/claude/demo'

export async function POST(req: NextRequest) {
  try {
    const { subject, style } = await req.json()
    if (!subject) return NextResponse.json({ error: 'Sujet requis' }, { status: 400 })

    if (!hasRealApiKey()) {
      await delay(1800)
      return NextResponse.json({ result: demoCarousel(subject), demo: true })
    }

    const prompt = `Tu es un expert en marketing Instagram pour opticiens premium (magasin "John Paul Optique").
Crée un carrousel Instagram complet sur le sujet : "${subject}"
Style souhaité : ${style || 'moderne et premium'}

Réponds UNIQUEMENT avec ce JSON valide (pas de markdown, pas d'explication) :
{
  "slides": [
    { "number": 1, "type": "accroche", "emoji": "👁️", "title": "Titre percutant", "content": "Texte court qui donne envie de swiper. Max 15 mots." },
    { "number": 2, "type": "contenu", "emoji": "✨", "title": "Titre slide", "content": "Contenu informatif et engageant. Max 20 mots." },
    { "number": 3, "type": "contenu", "emoji": "🔬", "title": "Titre slide", "content": "Contenu. Max 20 mots." },
    { "number": 4, "type": "contenu", "emoji": "💡", "title": "Titre slide", "content": "Contenu. Max 20 mots." },
    { "number": 5, "type": "cta", "emoji": "📍", "title": "Titre CTA", "content": "Appel à l'action clair et motivant." }
  ],
  "caption": "Légende Instagram complète avec intro accrocheuse, corps du texte, CTA, ligne vide, puis 20 hashtags pertinents mélangés français/anglais pour opticien"
}

Règles :
- Slide 1 (accroche) : hook ultra fort, donne envie de swiper
- Slides 2-4 (contenu) : informatif, utile, humain, premium
- Slide 5 (cta) : "Venez nous voir", "Prenez rendez-vous", etc.
- Texte des slides : court, percutant, lisible sur mobile
- Ton : moderne, premium, professionnel mais chaleureux`

    const raw = await generate(prompt, 2048)
    let result
    try {
      result = JSON.parse(raw)
    } catch {
      const match = raw.match(/\{[\s\S]*\}/)
      result = match ? JSON.parse(match[0]) : { slides: [], caption: raw }
    }
    return NextResponse.json({ result })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
