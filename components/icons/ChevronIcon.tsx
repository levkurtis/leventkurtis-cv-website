export default function ChevronIcon({ isExpanded, className = 'w-5 h-5' }: { isExpanded?: boolean; className?: string }) {
  return (
    <svg
      className={`text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
