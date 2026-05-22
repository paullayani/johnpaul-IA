'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AgentCard } from '@/components/dashboard/AgentCard'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Mail, FileText, Bot, Calendar, Zap,
  CheckCircle, AlertCircle, ArrowRight, Wifi
} from 'lucide-react'
import Link from 'next/link'
import type { Agent } from '@/types'

const AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Email Assistant',
    description: 'Génère automatiquement des brouillons de réponses pour vos emails clients.',
    status: 'active',
    type: 'email',
    tasksCompleted: 42,
    lastRun: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Google Reviews',
    description: 'Répond automatiquement aux avis Google Business de votre magasin.',
    status: 'inactive',
    type: 'google_reviews',
    tasksCompleted: 0,
  },
  {
    id: '3',
    name: 'Instagram Agent',
    description: 'Génère et programme des posts Instagram pour votre magasin.',
    status: 'inactive',
    type: 'instagram',
    tasksCompleted: 0,
  },
]

const AGENT_ICONS = { email: Mail, google_reviews: CheckCircle, instagram: Zap, marketing: Calendar }

function DashboardContent() {
  const searchParams = useSearchParams()
  const gmailConnected = searchParams.get('gmail') === 'connected'
  const error = searchParams.get('error')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">John Paul Optique — Centre de commande IA</p>
        </div>
        <Link href="/api/auth/gmail">
          <Button size="sm" variant={gmailConnected ? 'secondary' : 'primary'}>
            <Wifi className="w-4 h-4" />
            {gmailConnected ? 'Gmail connecté' : 'Connecter Gmail'}
          </Button>
        </Link>
      </div>

      {/* Connection alerts */}
      {gmailConnected && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Gmail connecté avec succès. L'Email Assistant peut maintenant lire vos emails.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Erreur de connexion Gmail. Veuillez réessayer.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Emails à traiter" value={12} icon={Mail} color="indigo" description="Non lus aujourd'hui" />
        <StatsCard title="Brouillons générés" value={8} icon={FileText} color="emerald" description="Cette semaine" />
        <StatsCard title="Agents actifs" value={1} icon={Bot} color="blue" description="Sur 3 disponibles" />
        <StatsCard title="Posts planifiés" value={0} icon={Calendar} color="amber" description="Instagram — bientôt" />
      </div>

      {/* Quick access */}
      <Card>
        <CardHeader>
          <CardTitle>Accès rapide</CardTitle>
        </CardHeader>
        <Link href="/dashboard/emails">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">Email Assistant</p>
                <p className="text-xs text-gray-500">Générer des réponses à vos emails clients</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">Actif</Badge>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </Link>
      </Card>

      {/* Agents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Agents IA</h2>
          <Link href="/dashboard/agents">
            <Button variant="ghost" size="sm">Voir tout <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AGENTS.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              icon={AGENT_ICONS[agent.type] || Bot}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Chargement...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
