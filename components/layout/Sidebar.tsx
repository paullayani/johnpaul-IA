'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { Layers, FileText, Smartphone, Video, ScanSearch, Glasses, Sparkles } from 'lucide-react'

const tools = [
  {
    href: '/dashboard/carousel',
    label: 'Carrousel',
    icon: Layers,
    color: 'group-hover:text-violet-400',
    activeColor: 'text-violet-400',
  },
  {
    href: '/dashboard/post',
    label: 'Description post',
    icon: FileText,
    color: 'group-hover:text-sky-400',
    activeColor: 'text-sky-400',
  },
  {
    href: '/dashboard/story',
    label: 'Story',
    icon: Smartphone,
    color: 'group-hover:text-pink-400',
    activeColor: 'text-pink-400',
  },
  {
    href: '/dashboard/videos',
    label: 'Idées vidéos',
    icon: Video,
    color: 'group-hover:text-amber-400',
    activeColor: 'text-amber-400',
  },
  {
    href: '/dashboard/photo',
    label: 'Analyse photo',
    icon: ScanSearch,
    color: 'group-hover:text-emerald-400',
    activeColor: 'text-emerald-400',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 h-screen bg-[#0a0a0f] flex flex-col fixed left-0 top-0 z-40 border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/50">
            <Glasses className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">John Paul</p>
            <p className="text-slate-500 text-xs mt-1">Studio Instagram IA</p>
          </div>
        </Link>
      </div>

      {/* Label */}
      <div className="px-5 pt-6 pb-2">
        <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest">Outils</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {tools.map(({ href, label, icon: Icon, activeColor }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                active
                  ? 'bg-white/8 text-white'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 transition-colors',
                  active ? activeColor : 'text-slate-600 group-hover:text-slate-400'
                )}
              />
              <span className="font-medium">{label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-300">Propulsé par Claude</p>
            <p className="text-xs text-slate-600">Anthropic AI</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
