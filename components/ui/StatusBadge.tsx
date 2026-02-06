type StatusConfig = {
  color: string
  bgColor: string
  description: string
}

export default function StatusBadge<S extends string>({
  status,
  config,
  interactive = false,
  active = false,
  onClick,
}: {
  status: S
  config: StatusConfig
  interactive?: boolean
  active?: boolean
  onClick?: () => void
}) {
  const baseClasses = `inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.bgColor} ${config.color}`
  const interactiveClasses = interactive
    ? `cursor-pointer transition-all duration-200 ${active ? 'ring-2 ring-offset-2 ring-offset-background ring-current' : 'opacity-60 hover:opacity-100'}`
    : ''

  return (
    <button
      type="button"
      className={`${baseClasses} ${interactiveClasses}`}
      title={config.description}
      onClick={onClick}
      disabled={!interactive}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </button>
  )
}
