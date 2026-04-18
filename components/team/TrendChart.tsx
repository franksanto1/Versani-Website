import { cn } from '@/lib/cn'

interface TrendChartProps {
  data: Array<{ label: string; value: number }>
  height?: number
  className?: string
  ariaLabel?: string
  /** Fixed axis boundaries. If omitted, auto-derived from data. */
  yMin?: number
  yMax?: number
  yFormatter?: (v: number) => string
}

/**
 * Larger inline SVG line chart with axes + grid.
 * Used on drill-down pages for 12-month MRR, 90-day score trend, etc.
 */
export function TrendChart({
  data,
  height = 220,
  className,
  ariaLabel,
  yMin,
  yMax,
  yFormatter = (v) => `${v}`,
}: TrendChartProps) {
  if (data.length < 2) return null

  const width = 640 // viewBox width; scales via CSS
  const padding = { top: 16, right: 16, bottom: 32, left: 44 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const values = data.map((d) => d.value)
  const minY = yMin ?? Math.min(...values)
  const maxY = yMax ?? Math.max(...values)
  const range = maxY - minY || 1

  const pts = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * plotWidth
    const y = padding.top + plotHeight - ((d.value - minY) / range) * plotHeight
    return { x, y, ...d }
  })

  const path = pts
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ')

  const fillPath = `${path} L ${pts[pts.length - 1].x} ${padding.top + plotHeight} L ${pts[0].x} ${padding.top + plotHeight} Z`

  // Horizontal grid lines — 4 divisions
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => {
    const y = padding.top + plotHeight * t
    const v = maxY - range * t
    return { y, v }
  })

  // Tick labels on X — show first, middle, last
  const tickIdx = [0, Math.floor(pts.length / 2), pts.length - 1]

  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={ariaLabel ?? 'Trend chart'}
      >
        {/* Grid */}
        {gridLines.map((g, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={g.y}
              y2={g.y}
              className="stroke-white/[0.06]"
              strokeWidth={1}
            />
            <text
              x={padding.left - 8}
              y={g.y + 4}
              textAnchor="end"
              className="fill-muted-foreground text-[10px]"
            >
              {yFormatter(g.v)}
            </text>
          </g>
        ))}

        {/* Fill */}
        <path d={fillPath} className="fill-gold/10" strokeWidth={0} />

        {/* Line */}
        <path
          d={path}
          className="stroke-gold"
          fill="none"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Points */}
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.5}
            className="fill-gold"
          />
        ))}

        {/* X-axis ticks */}
        {tickIdx.map((i) => (
          <text
            key={i}
            x={pts[i].x}
            y={height - 10}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            {pts[i].label}
          </text>
        ))}
      </svg>
    </div>
  )
}
