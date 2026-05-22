'use client'

import { useState } from 'react'
import { Smartphone, Sparkles } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'

export default function StoryPage() {
  const [intent, setIntent] = useState('')
  const [loading, setLoading] = useState(false)
  const [story, setStory] = useState('')
  const [error, setError] = useState('')

  const generate = async () => {
    if (!intent.trim()) return
    setLoading(true)
    setError('')
    setStory('')
    try {
      const res = await fetch('/api/generate/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setStory(data.story)
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération')
    } finally {
      setLoading(false)
    }
  }

  const examples = [
    'Présenter une nouvelle monture Lindberg arrivée ce matin',
    'Rappeler que les examens de vue sont remboursés',
    'Montrer les coulisses de la boutique un vendredi soir',
    'Annoncer une promotion sur les lentilles de contact',
  ]

  return (
    <div className="px-10 py-10 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center shadow-sm">
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Générateur de story</h1>
          <p className="text-sm text-slate-500">Texte, stickers, sondage et CTA — tout pour une story engageante</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Qu'est-ce que tu veux publier en story ?
          </label>
          <textarea
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="Ex: Montrer l'arrivée d'une nouvelle collection de lunettes de soleil"
            rows={3}
            className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          />
        </div>

        {/* Examples */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Exemples rapides :</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setIntent(ex)}
                className="px-3 py-1.5 rounded-lg text-xs bg-pink-50 text-pink-700 hover:bg-pink-100 transition border border-pink-100"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading || !intent.trim()}
          className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl px-6 py-3.5 text-sm transition-all shadow-sm shadow-pink-200 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Générer la story
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
      {story && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Plan de story généré</h2>
            <CopyButton text={story} />
          </div>

          {/* Story phone mockup */}
          <div className="mb-5 flex justify-center">
            <div className="w-44 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-2xl p-4 aspect-[9/16] flex flex-col justify-between shadow-lg shadow-pink-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative">
                <div className="flex gap-1 mb-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-0.5 flex-1 bg-white/50 rounded-full">
                      <div className={`h-full bg-white rounded-full ${i === 0 ? 'w-full' : 'w-0'}`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative text-center">
                <p className="text-white font-bold text-xs leading-tight">John Paul Optique</p>
                <p className="text-white/60 text-[10px]">Votre story preview</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{story}</p>
          </div>
        </div>
      )}
    </div>
  )
}
