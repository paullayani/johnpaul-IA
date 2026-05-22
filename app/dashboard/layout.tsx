import { Sidebar } from '@/components/layout/Sidebar'
import { DemoBanner } from '@/components/ui/DemoBanner'

const IS_DEMO = !process.env.ANTHROPIC_API_KEY ||
  process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key' ||
  !process.env.ANTHROPIC_API_KEY.startsWith('sk-')

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="ml-60 min-h-screen pb-10">
        {IS_DEMO && <DemoBanner />}
        {children}
      </main>
    </div>
  )
}
