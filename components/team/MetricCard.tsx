import { cn } from '@/lib/cn'

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  trend?: 'up' | 'down' | 'flat'
  trendLabel?: string
  className?: string
  /** Optional inline content rendered under the value (e.g. mini sparkline). */
  children?: React.ReactNode
}

/**
 * Core stat card used across all oversight dashboards.
 * Matches existing admin Metric component visual style (white/[0.04] card, gold label).
 */
export function MetricCard({
  label,
  value,
  sub,
  trend,
  trendLabel,
  className,
  children,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6',
        className
      )}
    >
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
        {label}
      </div>
      <div className="flex items-baseline gap-3">
        <div className="font-serif text-3xl text-foreground">{value}</div>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium',
              trend === 'up' && 'text-emerald-300',
              trend === 'down' && 'text-rose-300',
              trend === 'flat' && 'text-muted-foreground'
            )}
          >
            {trend === 'up' ? '\u25B2' : trend === 'down' ? '\u25BC' : '\u2014'}{' '}
            {trendLabel}
          </span>
        )}
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-2">{sub}</div>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}
