'use client'

import { useState } from 'react'
import { Video, Sparkles, ChevronDown, ChevronUp, Zap, Monitor, Mic, FileText } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'
import type { VideoIdeasResult, VideoIdea } from '@/types'

const QUICK_TOPICS = [
  'Choisir ses lunettes selon son visage',
  'Différence verres simples et progressifs',
  'Entretien de vos lunettes',
  'Les tendances lunettes 2025',
  'Pourquoi faire un bilan visuel',
]

function VideoIdeaCard({ idea, index }: { idea: VideoIdea; index: number }) {
  const [open, setOpen] = useState(index === 0)

  const fullText = `🎬 ${idea.title}\n\nHOOK: ${idea.hook}\n\nSTRUCTURE:\n${idea.structure.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nTEXTE ÉCRAN:\n${idea.screenText.join('\n')}\n\nSCRIPT:\n${idea.script}\n\nLÉGENDE:\n${idea.caption}`

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-sm font-bold text-amber-600">
            {index + 1}
          </div>
          <span className="font-semibold text-slate-900">{idea.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={fullText} />
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
          {/* Hook */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Hook (0–3 sec)</span>
            </div>
            <p className="text-base font-bold text-slate-900">"{idea.hook}"</p>
          </div>

          {/* Structure */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Structure des plans</span>
            </div>
            <div className="space-y-1.5">
              {idea.structure.map((step, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Screen text */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Texte à l'écran</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {idea.screenText.map((t, i) => (
                <span key={i} className="bg-slate-900 text-white text-xs px-3 py-1 rounded-lg font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Script */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mic className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Script / Voix off</span>
            </div>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-100 italic leading-relaxed">
              "{idea.script}"
            </p>
          </div>

          {/* Caption */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Légende Instagram</span>
              </div>
              <CopyButton text={idea.caption} />
            </div>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-100 leading-relaxed whitespace-pre-wrap">
              {idea.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function VideosPage() {
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VideoIdeasResult | null>(null)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/generate/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject }),
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

  return (
    <div className="px-10 py-10 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
          <Video className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Idées de vidéos Reels</h1>
          <p className="text-sm text-slate-500">Scripts complets, hooks et plans de tournage pour ton magasin</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Thème (optionnel — laisse vide pour des idées variées)
          </label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex: conseils entretien lunettes, tendances 2025..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-2">Inspirations rapides :</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => setSubject(t)}
                className="px-3 py-1.5 rounded-lg text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 transition border border-amber-100"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl px-6 py-3.5 text-sm transition-all shadow-sm shadow-amber-200 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Génération de 3 idées...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Générer 3 idées de Reels
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Results */}
      {result && result.ideas && (
        <div className="mt-6 space-y-4">
          <h2 className="font-semibold text-slate-900">{result.ideas.length} idées générées</h2>
          {result.ideas.map((idea, i) => (
            <VideoIdeaCard key={i} idea={idea} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
