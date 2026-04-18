'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

export interface SidebarItem {
  href: string
  label: string
  /** Treat this item as active only on an exact match (otherwise prefix). */
  exact?: boolean
}

interface TeamSidebarProps {
  items: SidebarItem[]
  ariaLabel: string
}

/**
 * Sidebar navigation shared across /salon, /school, /instructor shells.
 * Active state is derived from pathname.
 */
export function TeamSidebar({ items, ariaLabel }: TeamSidebarProps) {
  const pathname = usePathname()

  return (
    <nav aria-label={ariaLabel}>
      <ul className="space-y-1 sticky top-24">
        {items.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href ||
              pathname?.startsWith(item.href + '/') ||
              false
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-gold/10 text-gold border border-gold/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent'
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
