import { NextRequest, NextResponse } from 'next/server'
import { generate, generateWithImage, hasRealApiKey } from '@/lib/claude/client'
import { demoPhoto, delay } from '@/lib/claude/demo'

export async function POST(req: NextRequest) {
  try {
    const { description, imageBase64, mediaType } = await req.json()
    if (!description && !imageBase64) {
      return NextResponse.json({ error: 'Image ou description requise' }, { status: 400 })
    }

    if (!hasRealApiKey()) {
      await delay(2000)
      return NextResponse.json({ analysis: demoPhoto(description || ''), demo: true })
    }

    const prompt = `Tu es expert en marketing visuel Instagram pour "John Paul Optique", magasin d'optique premium.
${description ? `Description : "${description}"` : 'Analyse cette image.'}

Propose une analyse complète pour Instagram :

📝 TEXTE PRINCIPAL À SUPERPOSER
(1 phrase percutante, max 6 mots)

💬 SOUS-TEXTE OPTIONNEL
(Complément, max 10 mots)

📸 LÉGENDE INSTAGRAM
(Caption complète : accroche + corps + CTA + hashtags)

🎨 IDÉE DE MONTAGE
(Recadrage, couleurs, filtre, éléments à ajouter)

🖼️ VERSION CARROUSEL
Slide 1 / Slide 2 / Slide 3 / Slide 4

✨ CONSEIL CRÉATIF
(Astuce pour rendre ce post encore plus premium)`

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
