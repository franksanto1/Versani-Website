import Link from 'next/link'
import { VersaniWordmark } from '@/components/VersaniWordmark'
import { cn } from '@/lib/cn'

interface TeamTopBarProps {
  /** Label beside wordmark, e.g. "Salon Console" or "Instructor View". */
  consoleLabel: string
  /** Centered contextual label — salon name, school name, etc. */
  contextLabel?: string
  /** User's display name for the "signed in as" dropdown. */
  userName: string
  previewMode?: boolean
}

/**
 * Shared top bar used by all oversight layouts.
 * Includes wordmark, console eyebrow, context chip, and a sign-out form.
 */
export function TeamTopBar({
  consoleLabel,
  contextLabel,
  userName,
  previewMode = false,
}: TeamTopBarProps) {
  return (
    <header className="border-b border-white/[0.08] bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 min-w-0">
          <Link href="/" aria-label="Versani home">
            <VersaniWordmark size="sm" />
          </Link>
          <span className="hidden md:inline text-xs tracking-[0.2em] uppercase text-gold">
            {consoleLabel}
          </span>
        </div>

        {contextLabel && (
          <div className="hidden lg:flex items-center">
            <span
              className={cn(
                'text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border',
                'bg-white/[0.04] border-white/[0.08] text-foreground/80'
              )}
            >
              {contextLabel}
            </span>
          </div>
        )}

        <div className="flex items-center gap-4">
          {previewMode && (
            <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-200">
              Preview mode
            </span>
          )}
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Signed in
            </span>
            <span className="text-xs text-foreground">{userName}</span>
          </div>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
