'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
        copied
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
        className
      )}
    >
      {copied ? (
        <><Check className="w-3.5 h-3.5" /> Copié !</>
      ) : (
        <><Copy className="w-3.5 h-3.5" /> Copier</>
      )}
    </button>
  )
}
