'use client'

import { useState } from 'react'
import { AgentCard } from '@/components/dashboard/AgentCard'
import { Card } from '@/components/ui/Card'
import { Bot, Mail, Star, Camera, Calendar } from 'lucide-react'
import type { Agent } from '@/types'

const INITIAL_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Email Assistant',
    description: 'Analyse vos emails entrants et génère des brouillons de réponses personnalisés grâce à Claude AI.',
    status: 'active',
    type: 'email',
    tasksCompleted: 42,
    lastRun: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Google Reviews Agent',
    description: 'Surveille et répond automatiquement aux avis Google Business avec un ton adapté.',
    status: 'inactive',
    type: 'google_reviews',
    tasksCompleted: 0,
  },
  {
    id: '3',
    name: 'Instagram Agent',
    description: 'Génère des posts Instagram créatifs et les planifie selon votre calendrier marketing.',
    status: 'inactive',
    type: 'instagram',
    tasksCompleted: 0,
  },
  {
    id: '4',
    name: 'Marketing Planner',
    description: 'Planifie et organise vos campagnes marketing multicanal de façon autonome.',
    status: 'inactive',
    type: 'marketing',
    tasksCompleted: 0,
  },
]

const ICONS = { email: Mail, google_reviews: Star, instagram: Camera, marketing: Calendar }

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS)

  const toggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a
      )
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agents IA</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gérez vos agents intelligents autonomes</p>
      </div>

      <Card>
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="font-medium text-sm text-gray-900">1 agent actif sur 4</p>
            <p className="text-xs text-gray-500">Les agents inactifs seront disponibles dans les prochaines mises à jour</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            icon={ICONS[agent.type] || Bot}
            onToggle={() => toggleAgent(agent.id)}
          />
        ))}
      </div>
    </div>
  )
}
