import Link from 'next/link'
import { Layers, FileText, Smartphone, Video, ScanSearch, ArrowRight } from 'lucide-react'

const tools = [
  {
    href: '/dashboard/carousel',
    icon: Layers,
    label: 'Carrousel',
    description: 'Génère un carrousel Instagram complet slide par slide sur n\'importe quel sujet.',
    color: 'bg-violet-500',
    glow: 'hover:shadow-violet-100',
    badge: 'Populaire',
  },
  {
    href: '/dashboard/post',
    icon: FileText,
    label: 'Description post',
    description: 'Décris ta photo ou vidéo, l\'IA écrit la légende parfaite avec hashtags et CTA.',
    color: 'bg-sky-500',
    glow: 'hover:shadow-sky-100',
    badge: null,
  },
  {
    href: '/dashboard/story',
    icon: Smartphone,
    label: 'Story',
    description: 'Texte accrocheur, idées de stickers, sondages et appels à l\'action pour tes stories.',
    color: 'bg-pink-500',
    glow: 'hover:shadow-pink-100',
    badge: null,
  },
  {
    href: '/dashboard/videos',
    icon: Video,
    label: 'Idées vidéos',
    description: 'Scripts de Reels, hooks, textes à l\'écran et descriptions — faciles à tourner en magasin.',
    color: 'bg-amber-500',
    glow: 'hover:shadow-amber-100',
    badge: null,
  },
  {
    href: '/dashboard/photo',
    icon: ScanSearch,
    label: 'Analyse photo',
    description: 'Envoie une photo, l\'IA propose texte, montage, description et idée de carrousel.',
    color: 'bg-emerald-500',
    glow: 'hover:shadow-emerald-100',
    badge: 'Vision IA',
  },
]

export default function DashboardPage() {
  return (
    <div className="px-10 py-10 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Studio Instagram IA
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Créez du contenu professionnel pour votre magasin en quelques secondes.
        </p>
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map(({ href, icon: Icon, label, description, color, glow, badge }) => (
          <Link key={href} href={href}>
            <div className={`group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg ${glow} transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  {badge && (
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5">{label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-8 p-4 bg-violet-50 border border-violet-100 rounded-xl">
        <p className="text-sm text-violet-700">
          <span className="font-semibold">Astuce :</span> Chaque outil est optimisé pour un magasin d'optique premium. Plus tu es précis dans ta description, plus le résultat est qualitatif.
        </p>
      </div>
    </div>
  )
}
