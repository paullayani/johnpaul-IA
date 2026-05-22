import { EmailAgent } from '@/components/agents/EmailAgent'
import { Mail } from 'lucide-react'

export default function EmailsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Assistant</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Agent IA qui génère automatiquement des réponses professionnelles à vos emails clients
        </p>
      </div>
      <EmailAgent />
    </div>
  )
}
