import { cn } from '@/lib/cn'

interface SectionHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  right?: React.ReactNode
  className?: string
}

/**
 * Page-top header used across oversight dashboards.
 * Matches existing /admin page hero pattern (gold eyebrow, serif title).
 */
export function SectionHero({
  eyebrow,
  title,
  subtitle,
  right,
  className,
}: SectionHeroProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-6 mb-8 flex-wrap',
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.24em] text-gold mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {right && <div className="shrink-0 flex items-center gap-2">{right}</div>}
    </div>
  )
}
