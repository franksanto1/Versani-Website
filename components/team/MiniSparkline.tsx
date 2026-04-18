import { cn } from '@/lib/cn'

interface MiniSparklineProps {
  data: number[]
  width?: number
  height?: number
  strokeClassName?: string
  fillClassName?: string
  ariaLabel?: string
  className?: string
}

/**
 * Tiny inline SVG sparkline — used inside cards and tables for 30-ish point trends.
 * No axes, no tooltips. Pure decoration with accessible fallback text.
 */
export function MiniSparkline({
  data,
  width = 120,
  height = 32,
  strokeClassName = 'stroke-gold',
  fillClassName = 'fill-gold/10',
  ariaLabel,
  className,
}: MiniSparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return [x, y] as const
  })

  const path = pts
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(' ')

  // Close path to create fill underneath
  const fillPath = `${path} L ${width} ${height} L 0 ${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn('block', className)}
      role="img"
      aria-label={ariaLabel ?? 'Trend sparkline'}
    >
      <path d={fillPath} className={fillClassName} strokeWidth={0} />
      <path
        d={path}
        className={strokeClassName}
        fill="none"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
