export default function TagBadge({ tag, active = false, onClick }: {
  tag: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer
        ${active
          ? 'bg-accent/20 border-accent text-accent ring-2 ring-offset-2 ring-offset-background ring-accent'
          : 'bg-card border-border text-muted opacity-60 hover:opacity-100'
        }`}
      onClick={onClick}
    >
      {tag}
    </button>
  )
}
