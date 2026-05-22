import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LucideIcon, Play, Pause } from 'lucide-react'
import type { Agent } from '@/types'

interface AgentCardProps {
  agent: Agent
  icon: LucideIcon
  onToggle?: () => void
}

export function AgentCard({ agent, icon: Icon, onToggle }: AgentCardProps) {
  const statusVariant = {
    active: 'success' as const,
    inactive: 'default' as const,
    running: 'info' as const,
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{agent.name}</h4>
            <Badge variant={statusVariant[agent.status]} className="mt-1">
              {agent.status === 'active' ? 'Actif' : agent.status === 'running' ? 'En cours' : 'Inactif'}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">{agent.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{agent.tasksCompleted} tâches réalisées</span>
        {agent.lastRun && <span>Dernier run: {new Date(agent.lastRun).toLocaleDateString('fr-FR')}</span>}
      </div>

      <Button
        variant={agent.status === 'active' ? 'secondary' : 'primary'}
        size="sm"
        onClick={onToggle}
        className="w-full"
      >
        {agent.status === 'active' ? (
          <><Pause className="w-3.5 h-3.5" /> Désactiver</>
        ) : (
          <><Play className="w-3.5 h-3.5" /> Activer</>
        )}
      </Button>
    </div>
  )
}
