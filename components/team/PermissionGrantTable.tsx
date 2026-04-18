'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export interface GrantRow {
  key: string
  label: string
  description?: string
}

export interface GrantSubject {
  id: string
  name: string
  context?: string
}

interface PermissionGrantTableProps {
  subject: GrantSubject
  rows: GrantRow[]
  /** Initial grants — key -> boolean */
  initialGrants: Record<string, boolean>
  className?: string
}

/**
 * Binary per-row permission toggle table.
 * Used on /salon/permissions and the edit pane on /school/permissions.
 */
export function PermissionGrantTable({
  subject,
  rows,
  initialGrants,
  className,
}: PermissionGrantTableProps) {
  const [grants, setGrants] = useState(initialGrants)
  const [saved, setSaved] = useState(false)

  function toggle(key: string) {
    setGrants((prev) => ({ ...prev, [key]: !prev[key] }))
    setSaved(false)
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.04]',
        className
      )}
    >
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">
            {subject.context ?? 'Permissions for'}
          </div>
          <div className="font-serif text-xl text-foreground mt-1">
            {subject.name}
          </div>
        </div>
      </div>
      <ul className="divide-y divide-white/[0.04]">
        {rows.map((row) => (
          <li
            key={row.key}
            className="px-6 py-4 flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="text-sm text-foreground">{row.label}</div>
              {row.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {row.description}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => toggle(row.key)}
              className={cn(
                'relative h-6 w-11 shrink-0 rounded-full border transition-colors',
                grants[row.key]
                  ? 'bg-gold/70 border-gold'
                  : 'bg-white/[0.06] border-white/20'
              )}
              aria-pressed={!!grants[row.key]}
              aria-label={`${grants[row.key] ? 'Disable' : 'Enable'} ${row.label}`}
            >
              <span
                className={cn(
                  'absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all',
                  grants[row.key] ? 'left-[22px]' : 'left-0.5'
                )}
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Changes apply immediately once the backend wires it up.
        </span>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-emerald-300 uppercase tracking-[0.2em]">
              Saved
            </span>
          )}
          <Button
            type="button"
            variant="gold-solid"
            size="sm"
            onClick={() => setSaved(true)}
          >
            Save grants
          </Button>
        </div>
      </div>
    </div>
  )
}
