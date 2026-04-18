import Link from 'next/link'
import { cn } from '@/lib/cn'
import { RoleBadge } from './RoleBadge'
import { StatusBadge } from './StatusBadge'
import { MiniSparkline } from './MiniSparkline'

interface MemberCardProps {
  name: string
  role: 'owner' | 'manager' | 'stylist' | 'student' | 'instructor' | 'admin'
  status?:
    | 'active'
    | 'pending'
    | 'invited'
    | 'paused'
    | 'graduated'
    | 'at-risk'
    | 'lapsed'
  tier?: string
  scoreAvg?: number
  subLabel?: string
  trend?: number[]
  href?: string
  className?: string
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * Compact member card used on dashboard rosters and scrolling rails.
 * Renders gold-monogram avatar, identity, key stat, optional sparkline.
 */
export function MemberCard({
  name,
  role,
  status,
  tier,
  scoreAvg,
  subLabel,
  trend,
  href,
  className,
}: MemberCardProps) {
  const Wrapper: React.ElementType = href ? Link : 'div'
  const wrapperProps = href ? { href } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'block rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 min-w-[260px]',
        href && 'transition-colors hover:border-white/[0.15] hover:bg-white/[0.06]',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="h-12 w-12 shrink-0 rounded-full border border-gold/40 bg-gold/10 text-gold font-serif text-lg flex items-center justify-center"
        >
          {initials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-medium text-foreground truncate">{name}</div>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <RoleBadge role={role} />
            {status && <StatusBadge status={status} />}
          </div>
          {tier && (
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gold/80">
              {tier}
            </div>
          )}
        </div>
      </div>

      {(scoreAvg !== undefined || subLabel) && (
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            {scoreAvg !== undefined && (
              <div className="font-serif text-2xl text-foreground">
                {scoreAvg.toFixed(1)}
              </div>
            )}
            {subLabel && (
              <div className="text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                {subLabel}
              </div>
            )}
          </div>
          {trend && trend.length > 1 && (
            <MiniSparkline data={trend} width={96} height={28} />
          )}
        </div>
      )}
    </Wrapper>
  )
}
