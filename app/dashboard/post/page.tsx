'use client'

import { useState } from 'react'
import { FileText, Sparkles } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'

const TONES = ['Moderne & authentique', 'Premium & élégant', 'Éducatif & expert', 'Chaleureux & proche']

export default function PostPage() {
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState(TONES[0])
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const [error, setError] = useState('')

  const generate = async () => {
    if (!description.trim()) return
    setLoading(true)
    setError('')
    setCaption('')
    try {
      const res = await fetch('/api/generate/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, tone }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setCaption(data.caption)
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
        <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-sm">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Générateur de description</h1>
          <p className="text-sm text-slate-500">Décris ta photo ou vidéo → légende parfaite avec hashtags</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Décris ce que tu vas publier
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Photo d'une nouvelle collection de lunettes de soleil haut de gamme, rayonnement estival, posées sur le comptoir en bois du magasin"
            rows={4}
            className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Ton</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  tone === t
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading || !description.trim()}
          className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl px-6 py-3.5 text-sm transition-all shadow-sm shadow-sky-200 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Rédaction en cours...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Générer la description
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
      {caption && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Légende générée</h2>
            <CopyButton text={caption} />
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{caption}</p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span>{caption.length} caractères</span>
            <span>·</span>
            <span>~{Math.round(caption.split(' ').length / 130)} min de lecture</span>
          </div>
        </div>
      )}
    </div>
  )
}
