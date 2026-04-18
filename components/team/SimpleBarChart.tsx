import { cn } from '@/lib/cn'

interface SimpleBarChartProps {
  data: Array<{ label: string; value: number }>
  /** Max displayed. If omitted, uses max(data). */
  max?: number
  /** Formatter for the trailing value label. */
  formatter?: (v: number) => string
  className?: string
}

/**
 * Horizontal inline SVG bar chart.
 * Used for service mix, upgrade rates, role splits, etc.
 */
export function SimpleBarChart({
  data,
  max,
  formatter = (v) => `${v}`,
  className,
}: SimpleBarChartProps) {
  const maxValue = max ?? Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn('space-y-2', className)}>
      {data.map((d) => {
        const pct = Math.min(100, (d.value / maxValue) * 100)
        return (
          <div key={d.label} className="flex items-center gap-3 text-sm">
            <div className="w-32 shrink-0 text-muted-foreground truncate">
              {d.label}
            </div>
            <div className="flex-1 h-2 rounded-full bg-white/[0.04] border border-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-gold/70"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="w-14 shrink-0 text-right text-xs text-foreground tabular-nums">
              {formatter(d.value)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
