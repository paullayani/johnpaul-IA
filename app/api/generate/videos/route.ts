import { NextRequest, NextResponse } from 'next/server'
import { generate, hasRealApiKey } from '@/lib/claude/client'
import { demoVideos, delay } from '@/lib/claude/demo'

export async function POST(req: NextRequest) {
  try {
    const { subject } = await req.json()

    if (!hasRealApiKey()) {
      await delay(2000)
      return NextResponse.json({ result: demoVideos(), demo: true })
    }

    const subjectLine = subject ? `Thème suggéré : "${subject}"` : 'Idées libres pour un opticien'

    const prompt = `Tu es expert en contenu vidéo Instagram Reels pour opticiens premium.
${subjectLine}

Génère 3 idées de Reels créatifs et FACILES à tourner seul en magasin.

Réponds UNIQUEMENT avec ce JSON valide :
{
  "ideas": [
    {
      "title": "Nom court et accrocheur",
      "hook": "Texte d'accroche 0-3 premières secondes (max 8 mots)",
      "structure": ["Plan 1 (Xs)", "Plan 2 (Xs)", "Plan 3 (Xs)", "Plan 4 (Xs)"],
      "screenText": ["Texte 1", "Texte 2", "Texte 3"],
      "script": "Ce que tu dis à voix haute (2-3 phrases naturelles)",
      "caption": "Légende Instagram complète avec CTA et hashtags"
    }
  ]
}

Contraintes : tournables seul avec smartphone en magasin, 15-30 secondes, hook fort.`

    const raw = await generate(prompt, 3000)
    let result
    try {
      result = JSON.parse(raw)
    } catch {
      const match = raw.match(/\{[\s\S]*\}/)
      result = match ? JSON.parse(match[0]) : { ideas: [] }
    }
    return NextResponse.json({ result })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
