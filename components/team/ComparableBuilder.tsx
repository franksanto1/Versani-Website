'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export interface ComparableMember {
  id: string
  name: string
  tier?: string
  role?: string
  [key: string]: unknown
}

export type ComparableFormat =
  | 'text'
  | 'number'
  | 'decimal1'
  | 'percent'
  | 'currency'

export interface ComparableMetric {
  key: string
  label: string
  /** Client-side format hint. Default is 'text'. */
  format?: ComparableFormat
}

function formatValue(raw: unknown, format: ComparableFormat = 'text'): string {
  if (raw === undefined || raw === null || raw === '') return '—'
  switch (format) {
    case 'decimal1':
      return typeof raw === 'number' ? raw.toFixed(1) : String(raw)
    case 'percent':
      return typeof raw === 'number' ? `${Math.round(raw * 100)}%` : String(raw)
    case 'currency':
      return typeof raw === 'number'
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(raw)
        : String(raw)
    case 'number':
      return typeof raw === 'number' ? raw.toLocaleString() : String(raw)
    case 'text':
    default:
      return String(raw)
  }
}

interface ComparableBuilderProps {
  members: ComparableMember[]
  metrics: ComparableMetric[]
  /** Max members selectable at once. */
  maxSelection?: number
  idPrefix?: string
  className?: string
}

/**
 * Interactive compare builder — pick 2-5 members and 2+ metrics, then
 * renders a side-by-side table. Save / Export PDF are placeholders until
 * the backend ships.
 */
export function ComparableBuilder({
  members,
  metrics,
  maxSelection = 5,
  idPrefix = 'cmp',
  className,
}: ComparableBuilderProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    members.slice(0, 3).map((m) => m.id)
  )
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(
    metrics.slice(0, Math.min(4, metrics.length)).map((m) => m.key)
  )

  function toggleMember(id: string) {
    setSelectedMembers((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id)
      if (prev.length >= maxSelection) return prev
      return [...prev, id]
    })
  }

  function toggleMetric(key: string) {
    setSelectedMetrics((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    )
  }

  const memberObjects = selectedMembers
    .map((id) => members.find((m) => m.id === id))
    .filter((m): m is ComparableMember => !!m)

  const metricObjects = selectedMetrics
    .map((key) => metrics.find((m) => m.key === key))
    .filter((m): m is ComparableMetric => !!m)

  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">
            Members ({selectedMembers.length}/{maxSelection})
          </div>
          <ul className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {members.map((m) => {
              const active = selectedMembers.includes(m.id)
              return (
                <li key={m.id}>
                  <label
                    className={cn(
                      'flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors',
                      active
                        ? 'bg-gold/10 border border-gold/30'
                        : 'border border-white/[0.06] hover:border-white/[0.12]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={active}
                        onChange={() => toggleMember(m.id)}
                        id={`${idPrefix}-m-${m.id}`}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          'h-4 w-4 rounded border flex items-center justify-center text-[10px]',
                          active
                            ? 'bg-gold border-gold text-black'
                            : 'border-white/20'
                        )}
                      >
                        {active ? '\u2713' : ''}
                      </span>
                      <span className="text-sm text-foreground">{m.name}</span>
                    </div>
                    {m.tier && (
                      <span className="text-[10px] uppercase tracking-[0.18em] text-gold/70">
                        {m.tier}
                      </span>
                    )}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">
            Metrics ({selectedMetrics.length})
          </div>
          <ul className="space-y-1.5">
            {metrics.map((m) => {
              const active = selectedMetrics.includes(m.key)
              return (
                <li key={m.key}>
                  <label
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors',
                      active
                        ? 'bg-gold/10 border border-gold/30'
                        : 'border border-white/[0.06] hover:border-white/[0.12]'
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleMetric(m.key)}
                      id={`${idPrefix}-mt-${m.key}`}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'h-4 w-4 rounded border flex items-center justify-center text-[10px]',
                        active ? 'bg-gold border-gold text-black' : 'border-white/20'
                      )}
                    >
                      {active ? '\u2713' : ''}
                    </span>
                    <span className="text-sm text-foreground">{m.label}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-x-auto">
        {memberObjects.length < 2 || metricObjects.length < 1 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Select at least 2 members and 1 metric to generate a comparison.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Metric
                </th>
                {memberObjects.map((m) => (
                  <th
                    key={m.id}
                    className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-gold"
                  >
                    {m.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metricObjects.map((met) => (
                <tr
                  key={met.key}
                  className="border-b border-white/[0.04] last:border-b-0"
                >
                  <td className="px-5 py-3 text-muted-foreground">
                    {met.label}
                  </td>
                  {memberObjects.map((m) => {
                    const raw = m[met.key]
                    const display = formatValue(raw, met.format)
                    return (
                      <td key={m.id} className="px-5 py-3 text-foreground">
                        {display}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button variant="ghost" size="sm">
          Save as report
        </Button>
        <Button variant="gold-outline" size="sm">
          Export PDF
        </Button>
      </div>
    </div>
  )
}
