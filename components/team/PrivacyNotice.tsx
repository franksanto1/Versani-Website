import { cn } from '@/lib/cn'

interface PrivacyNoticeProps {
  children: React.ReactNode
  variant?: 'info' | 'warning'
  className?: string
}

/**
 * Privacy boundary notice used wherever permission scope matters —
 * client pages, student drill-downs, shared inventory, instructor views.
 */
export function PrivacyNotice({
  children,
  variant = 'info',
  className,
}: PrivacyNoticeProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-4 text-sm',
        variant === 'info'
          ? 'border-gold/20 bg-gold/[0.04] text-foreground/90'
          : 'border-amber-400/30 bg-amber-400/[0.06] text-amber-100',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            'mt-0.5 text-xs uppercase tracking-[0.2em]',
            variant === 'info' ? 'text-gold' : 'text-amber-300'
          )}
        >
          Privacy
        </span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
