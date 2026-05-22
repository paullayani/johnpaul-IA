export function DemoBanner() {
  return (
    <div className="mx-10 mt-6 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
      <span className="text-lg">⚡</span>
      <div>
        <p className="text-sm font-semibold text-amber-800">Mode démonstration</p>
        <p className="text-xs text-amber-600">
          Les résultats sont des exemples réalistes. Ajoutez votre clé API Claude dans{' '}
          <code className="bg-amber-100 px-1 rounded font-mono">.env.local</code> pour activer la génération IA en temps réel.
        </p>
      </div>
    </div>
  )
}
