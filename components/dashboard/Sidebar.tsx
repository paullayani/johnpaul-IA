'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  Mail,
  Star,
  Camera,
  Calendar,
  Settings,
  Bot,
  Glasses,
} from 'lucide-react'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/emails', label: 'Email Agent', icon: Mail },
  { href: '/dashboard/reviews', label: 'Avis Google', icon: Star, soon: true },
  { href: '/dashboard/instagram', label: 'Instagram', icon: Camera, soon: true },
  { href: '/dashboard/calendar', label: 'Calendrier', icon: Calendar, soon: true },
  { href: '/dashboard/agents', label: 'Agents IA', icon: Bot },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Glasses className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-none">John Paul</p>
            <p className="text-xs text-gray-400 mt-0.5">Optique IA</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon, soon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={soon ? '#' : href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group',
                active
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                soon && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {soon && (
                <span className="text-xs bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">Bientôt</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
            JP
          </div>
          <div>
            <p className="text-xs font-medium text-white">John Paul</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
