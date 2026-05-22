import { NextRequest, NextResponse } from 'next/server'
import { generate, generateWithImage } from '@/lib/claude/client'

export async function POST(req: NextRequest) {
  try {
    const { description, imageBase64, mediaType } = await req.json()
    if (!description && !imageBase64) {
      return NextResponse.json({ error: 'Image ou description requise' }, { status: 400 })
    }

    const prompt = `Tu es expert en marketing visuel Instagram pour "John Paul Optique", magasin d'optique premium.
${description ? `Description de l'image : "${description}"` : 'Analyse cette image.'}

Propose une analyse complète pour Instagram. Réponds avec ce format structuré :

📝 TEXTE PRINCIPAL À SUPERPOSER
(1 phrase percutante, max 6 mots, style typographie Instagram)

💬 SOUS-TEXTE OPTIONNEL
(Complément, max 10 mots)

📸 LÉGENDE INSTAGRAM
(Caption complète : accroche + corps + CTA + hashtags)

🎨 IDÉE DE MONTAGE
(Comment améliorer ou mettre en valeur : recadrage, couleurs, filtre suggéré, éléments à ajouter)

🖼️ VERSION CARROUSEL (si applicable)
Slide 1 : [accroche]
Slide 2 : [contenu]
Slide 3 : [contenu]
Slide 4 : [CTA]

✨ CONSEIL CRÉATIF
(Astuce pour rendre ce post encore plus premium et engageant)`

    let analysis: string
    if (imageBase64 && mediaType) {
      analysis = await generateWithImage(prompt, imageBase64, mediaType)
    } else {
      analysis = await generate(prompt, 1500)
    }

    return NextResponse.json({ analysis })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
