import { NextRequest, NextResponse } from 'next/server'
import { generate } from '@/lib/claude/client'

export async function POST(req: NextRequest) {
  try {
    const { subject } = await req.json()

    const subjectLine = subject ? `Thème suggéré : "${subject}"` : 'Idées libres pour un opticien'

    const prompt = `Tu es expert en contenu vidéo Instagram Reels pour opticiens premium.
${subjectLine}

Génère 3 idées de Reels créatifs et FACILES à tourner seul en magasin d'optique.

Réponds UNIQUEMENT avec ce JSON valide :
{
  "ideas": [
    {
      "title": "Nom court et accrocheur de l'idée",
      "hook": "Texte d'accroche à afficher les 2-3 premières secondes (max 8 mots)",
      "structure": [
        "Plan 1 : description (2 sec)",
        "Plan 2 : description (3 sec)",
        "Plan 3 : description (3 sec)",
        "Plan 4 : description (2 sec)"
      ],
      "screenText": [
        "Texte superposé 1",
        "Texte superposé 2",
        "Texte superposé 3"
      ],
      "script": "Ce que tu dis à voix haute ou en voix off (2-3 phrases naturelles)",
      "caption": "Légende Instagram complète avec CTA et 15 hashtags"
    }
  ]
}

Contraintes :
- Tournables seul avec un smartphone, en magasin
- Durée : 15 à 30 secondes chacun
- Hook ultra fort pour les 3 premières secondes
- Engagement maximum (commentaires, partages, saves)
- Exemples de formats : avant/après, conseil rapide, coulisses, test produit, mythes vs vérité`

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
