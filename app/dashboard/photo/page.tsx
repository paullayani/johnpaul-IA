'use client'

import { useState, useRef } from 'react'
import { ScanSearch, Sparkles, Upload, X, Image as ImageIcon } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'

export default function PhotoPage() {
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const generate = async () => {
    if (!description.trim() && !imageFile) return
    setLoading(true)
    setError('')
    setAnalysis('')

    try {
      let imageBase64: string | undefined
      let mediaType: string | undefined

      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer()
        imageBase64 = Buffer.from(arrayBuffer).toString('base64')
        mediaType = imageFile.type
      }

      const res = await fetch('/api/generate/photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, imageBase64, mediaType }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAnalysis(data.analysis)
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'analyse')
    } finally {
      setLoading(false)
    }
  }

  const canGenerate = (description.trim() || imageFile) && !loading

  return (
    <div className="px-10 py-10 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
          <ScanSearch className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Analyse photo & montage</h1>
          <p className="text-sm text-slate-500">Envoie une photo, l'IA propose texte, montage et légende Instagram</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Photo (optionnelle)
          </label>
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-200">
              <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover" />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-all"
            >
              <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500 font-medium">Clique pour importer une photo</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP</p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Décris la photo ou donne du contexte
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Photo d'un client essayant des lunettes Lindberg, lumière naturelle, ambiance chaleureuse en magasin, il sourit"
            rows={3}
            className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>

        <button
          onClick={generate}
          disabled={!canGenerate}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl px-6 py-3.5 text-sm transition-all shadow-sm shadow-emerald-200 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyser et générer des idées
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
      {analysis && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Analyse & idées créatives</h2>
            <CopyButton text={analysis} />
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{analysis}</p>
          </div>
        </div>
      )}
    </div>
  )
}
