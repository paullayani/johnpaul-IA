'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Mail, RefreshCw, Wand2, Send, Trash2, ChevronDown, ChevronUp,
  User, Clock, Sparkles, CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Email, EmailDraft } from '@/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export function EmailAgent() {
  const [emails, setEmails] = useState<Email[]>([])
  const [drafts, setDrafts] = useState<Record<string, EmailDraft>>({})
  const [loadingEmails, setLoadingEmails] = useState(false)
  const [loadingDraft, setLoadingDraft] = useState<string | null>(null)
  const [savingDraft, setSavingDraft] = useState<string | null>(null)
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null)
  const [tone, setTone] = useState<'professional' | 'friendly' | 'formal'>('professional')
  const [savedDrafts, setSavedDrafts] = useState<Set<string>>(new Set())

  const fetchEmails = useCallback(async () => {
    setLoadingEmails(true)
    try {
      const res = await fetch('/api/gmail/emails')
      const data = await res.json()
      if (data.emails) setEmails(data.emails)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingEmails(false)
    }
  }, [])

  const generateDraft = useCallback(async (email: Email) => {
    setLoadingDraft(email.id)
    try {
      const res = await fetch('/api/agents/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tone }),
      })
      const data = await res.json()
      if (data.draft) {
        setDrafts((prev) => ({ ...prev, [email.id]: data.draft }))
        setExpandedEmail(email.id)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingDraft(null)
    }
  }, [tone])

  const saveDraftToGmail = useCallback(async (email: Email) => {
    const draft = drafts[email.id]
    if (!draft) return
    setSavingDraft(email.id)
    try {
      const res = await fetch('/api/agents/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tone, saveToDraft: true }),
      })
      const data = await res.json()
      if (data.gmailDraftId) {
        setSavedDrafts((prev) => new Set(prev).add(email.id))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSavingDraft(null)
    }
  }, [drafts, tone])

  const generateAllDrafts = useCallback(async () => {
    for (const email of emails) {
      await generateDraft(email)
    }
  }, [emails, generateDraft])

  return (
    <div className="space-y-5">
      {/* Header */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Email Assistant</h2>
              <p className="text-xs text-gray-500">Agent IA — Génération automatique de réponses</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Tone selector */}
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as typeof tone)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="professional">Ton professionnel</option>
              <option value="friendly">Ton amical</option>
              <option value="formal">Ton formel</option>
            </select>
            <Button variant="secondary" size="sm" onClick={fetchEmails} loading={loadingEmails}>
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
            <Button size="sm" onClick={generateAllDrafts} disabled={emails.length === 0}>
              <Sparkles className="w-4 h-4" />
              Générer tout
            </Button>
          </div>
        </div>
      </Card>

      {/* Empty state */}
      {emails.length === 0 && !loadingEmails && (
        <Card>
          <div className="py-12 text-center">
            <Mail className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Aucun email chargé</p>
            <p className="text-sm text-gray-400 mt-1">
              Connectez Gmail et cliquez sur "Actualiser" pour charger vos emails
            </p>
            <Button className="mt-4" size="sm" onClick={fetchEmails} loading={loadingEmails}>
              Charger les emails
            </Button>
          </div>
        </Card>
      )}

      {/* Email list */}
      <div className="space-y-3">
        {emails.map((email) => {
          const draft = drafts[email.id]
          const isExpanded = expandedEmail === email.id
          const isSaved = savedDrafts.has(email.id)

          return (
            <Card key={email.id} className="p-0 overflow-hidden">
              {/* Email header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedEmail(isExpanded ? null : email.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-semibold text-sm">
                      {email.fromName[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-gray-900 truncate">{email.fromName}</span>
                        <span className="text-xs text-gray-400">{email.from}</span>
                        {isSaved && <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />Brouillon sauvé</Badge>}
                        {draft && !isSaved && <Badge variant="info"><Wand2 className="w-3 h-3 mr-1" />Réponse générée</Badge>}
                      </div>
                      <p className="text-sm font-medium text-gray-700 mt-0.5 truncate">{email.subject}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{email.snippet}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {format(new Date(email.receivedAt), 'dd MMM HH:mm', { locale: fr })}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {/* Original email */}
                  <div className="p-4 bg-gray-50">
                    <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Message original
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {email.body || email.snippet}
                    </p>
                  </div>

                  {/* Draft reply */}
                  {draft && (
                    <div className="p-4 border-t border-gray-100">
                      <p className="text-xs font-medium text-indigo-600 mb-2 flex items-center gap-1.5">
                        <Wand2 className="w-3.5 h-3.5" /> Réponse générée par IA
                      </p>
                      <textarea
                        className="w-full text-sm text-gray-700 bg-indigo-50 rounded-lg p-3 border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none leading-relaxed"
                        rows={8}
                        value={draft.body}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [email.id]: { ...prev[email.id], body: e.target.value },
                          }))
                        }
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="p-4 pt-0 flex items-center gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="secondary"
                      loading={loadingDraft === email.id}
                      onClick={() => generateDraft(email)}
                    >
                      <Wand2 className="w-4 h-4" />
                      {draft ? 'Regénérer' : 'Générer une réponse'}
                    </Button>

                    {draft && (
                      <>
                        <Button
                          size="sm"
                          loading={savingDraft === email.id}
                          disabled={isSaved}
                          onClick={() => saveDraftToGmail(email)}
                        >
                          <Send className="w-4 h-4" />
                          {isSaved ? 'Sauvé dans Gmail' : 'Sauver comme brouillon Gmail'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDrafts((prev) => {
                            const next = { ...prev }
                            delete next[email.id]
                            return next
                          })}
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
