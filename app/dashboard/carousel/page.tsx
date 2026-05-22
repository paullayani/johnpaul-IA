'use client'

import { useState } from 'react'
import { Layers, Sparkles, ChevronRight } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'
import type { CarouselResult, CarouselSlide } from '@/types'

const slideColors: Record<CarouselSlide['type'], string> = {
  accroche: 'from-violet-600 to-indigo-600',
  contenu: 'from-slate-700 to-slate-800',
  cta: 'from-rose-500 to-pink-600',
}

const slideLabels: Record<CarouselSlide['type'], string> = {
  accroche: 'Accroche',
  contenu: 'Contenu',
  cta: 'Appel à l\'action',
}

const STYLES = ['Moderne & Premium', 'Éducatif', 'Inspirant', 'Conseils pratiques', 'Avant/Après']

export default function CarouselPage() {
  const [subject, setSubject] = useState('')
  const [style, setStyle] = useState(STYLES[0])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CarouselResult | null>(null)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!subject.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/generate/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, style }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data.result)
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération')
    } finally {
      setLoading(false)
    }
  }

  const allText = result
    ? result.slides.map((s) => `SLIDE ${s.number} — ${s.title}\n${s.content}`).join('\n\n') +
      `\n\n---\nLÉGENDE:\n${result.caption}`
    : ''

  return (
    <div className="px-10 py-10 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center shadow-sm">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Générateur de carrousel</h1>
          <p className="text-sm text-slate-500">Un sujet → un carrousel complet prêt à publier</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Sujet du carrousel</label>
          <textarea
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex: Comment choisir ses lunettes selon la forme de son visage"
            rows={3}
            className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Style</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  style === s
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading || !subject.trim()}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl px-6 py-3.5 text-sm transition-all shadow-sm shadow-violet-200 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Générer le carrousel
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Slides */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              {result.slides.length} slides générées
            </h2>
            <CopyButton text={allText} />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {result.slides.map((slide) => (
              <div
                key={slide.number}
                className={`flex-shrink-0 w-52 aspect-square bg-gradient-to-br ${slideColors[slide.type]} rounded-2xl p-4 flex flex-col justify-between shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs font-medium">{slideLabels[slide.type]}</span>
                  <span className="text-2xl">{slide.emoji}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-snug mb-1">{slide.title}</p>
                  <p className="text-white/75 text-xs leading-relaxed">{slide.content}</p>
                </div>
                <div className="text-white/40 text-xs">#{slide.number}</div>
              </div>
            ))}
          </div>

          {/* Slide text details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {result.slides.map((slide) => (
              <div key={slide.number} className="p-4 flex gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0 mt-0.5">
                  {slide.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-900">{slide.title}</span>
                    <span className="text-xs text-slate-400">{slideLabels[slide.type]}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{slide.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">Légende Instagram</h3>
              <CopyButton text={result.caption} />
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{result.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}
