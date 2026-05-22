import { NextRequest, NextResponse } from 'next/server'
import { generate, hasRealApiKey } from '@/lib/claude/client'
import { demoPost, delay } from '@/lib/claude/demo'

export async function POST(req: NextRequest) {
  try {
    const { description, tone } = await req.json()
    if (!description) return NextResponse.json({ error: 'Description requise' }, { status: 400 })

    if (!hasRealApiKey()) {
      await delay(1600)
      return NextResponse.json({ caption: demoPost(description), demo: true })
    }

    const prompt = `Tu es un expert en marketing Instagram pour "John Paul Optique", un magasin d'optique premium.
Je vais publier : "${description}"
Ton souhaité : ${tone || 'moderne et authentique'}

Rédige une légende Instagram complète et optimisée :

Structure attendue :
1. ACCROCHE (première ligne) : phrase qui arrête le scroll, sans emoji au début
2. CORPS : 2 à 4 lignes maximum, naturel, humain, inspire confiance
3. APPEL À L'ACTION : invitation claire (rendez-vous, visite, DM, lien bio)
4. — (séparateur)
5. HASHTAGS : 20 à 25 hashtags pertinents (mélange français/anglais, général + niche optique)

Règles :
- Emojis : quelques-uns mais pas excessifs
- Ton : premium, chaleureux, moderne
- Pas de clichés
- La première ligne doit être magnétique`

    const caption = await generate(prompt, 1024)
    return NextResponse.json({ caption })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
