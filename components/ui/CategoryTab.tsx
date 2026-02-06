export default function CategoryTab({ label, active, count, onClick }: {
  label: string
  active: boolean
  count: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${active
          ? 'bg-accent/20 text-accent border border-accent/30'
          : 'text-muted hover:text-foreground hover:bg-card border border-transparent'
        }`}
    >
      {label}
      <span className="ml-2 text-xs opacity-60">({count})</span>
    </button>
  )
}
