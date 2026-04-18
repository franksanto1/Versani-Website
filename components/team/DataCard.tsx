import { cn } from '@/lib/cn'

interface DataCardProps {
  title?: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * Standard container card used to group tables, lists, and editable sections.
 */
export function DataCard({
  title,
  description,
  action,
  children,
  className,
}: DataCardProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.04]',
        className
      )}
    >
      {(title || action) && (
        <header className="px-6 py-4 border-b border-white/[0.06] flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="font-serif text-xl text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className="p-6">{children}</div>
    </section>
  )
}
