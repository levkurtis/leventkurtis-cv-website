import Link from 'next/link'
import { ArrowLeftIcon } from '@/components/icons'

export default function BackLink({ href, label, className = 'text-muted hover:text-foreground' }: {
  href: string
  label: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm transition-colors ${className}`}
    >
      <ArrowLeftIcon className="w-4 h-4" />
      {label}
    </Link>
  )
}
