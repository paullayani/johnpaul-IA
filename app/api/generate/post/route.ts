import { NextRequest, NextResponse } from 'next/server'
import { generate } from '@/lib/claude/client'

export async function POST(req: NextRequest) {
  try {
    const { description, tone } = await req.json()
    if (!description) return NextResponse.json({ error: 'Description requise' }, { status: 400 })

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

Règles importantes :
- Emojis : quelques-uns mais pas excessifs, bien placés
- Ton : premium, chaleureux, moderne, jamais agressif
- Pas de clichés ("Découvrez notre...", "N'attendez plus...")
- La première ligne doit être magnétique
- Les hashtags incluent : optique, lunettes, opticien, vision, style, santé visuelle + localisation si applicable`

    const caption = await generate(prompt, 1024)
    return NextResponse.json({ caption })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
