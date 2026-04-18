import { cn } from '@/lib/cn'

type StatusKey =
  | 'active'
  | 'pending'
  | 'invited'
  | 'paused'
  | 'graduated'
  | 'at-risk'
  | 'lapsed'
  | 'low'

const styles: Record<StatusKey, string> = {
  active: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-200',
  pending: 'bg-amber-400/10 border-amber-400/30 text-amber-200',
  invited: 'bg-sky-400/10 border-sky-400/30 text-sky-200',
  paused: 'bg-white/[0.04] border-white/10 text-muted-foreground',
  graduated: 'bg-gold/10 border-gold/40 text-gold',
  'at-risk': 'bg-rose-400/10 border-rose-400/30 text-rose-200',
  lapsed: 'bg-white/[0.04] border-white/10 text-muted-foreground',
  low: 'bg-amber-400/10 border-amber-400/30 text-amber-200',
}

const labels: Record<StatusKey, string> = {
  active: 'Active',
  pending: 'Pending',
  invited: 'Invited',
  paused: 'Paused',
  graduated: 'Graduated',
  'at-risk': 'At risk',
  lapsed: 'Lapsed',
  low: 'Low stock',
}

export function StatusBadge({
  status,
  className,
}: {
  status: StatusKey
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.18em] border',
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  )
}
