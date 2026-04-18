'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

interface InviteFormProps {
  roles: Array<{ value: string; label: string }>
  placeholderEmail?: string
  /** Hint shown under the email input (e.g., billing impact). */
  hint?: string
  /** Allow CSV bulk upload mode alongside single email. */
  allowBulk?: boolean
  defaultMessage?: string
  /** Additional select slot (e.g. default class for school invites). */
  extraField?: React.ReactNode
  className?: string
}

/**
 * Generic invite form used on /salon/team/invite, /school/students/invite, etc.
 * Handles client-side state only — real submission requires OpenServ backend.
 */
export function InviteForm({
  roles,
  placeholderEmail = 'name@example.com',
  hint,
  allowBulk = false,
  defaultMessage = 'Welcome to Versani. Your invitation link expires in 7 days.',
  extraField,
  className,
}: InviteFormProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(roles[0]?.value ?? '')
  const [message, setMessage] = useState(defaultMessage)
  const [mode, setMode] = useState<'single' | 'bulk'>('single')
  const [sent, setSent] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    setSent(trimmed)
    setEmail('')
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 space-y-5',
        className
      )}
    >
      {allowBulk && (
        <div className="flex items-center gap-1 border border-white/[0.08] rounded-full p-1 w-fit">
          <button
            type="button"
            onClick={() => setMode('single')}
            className={cn(
              'px-4 py-1.5 text-xs uppercase tracking-[0.2em] rounded-full transition-colors',
              mode === 'single'
                ? 'bg-gold text-black'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Single
          </button>
          <button
            type="button"
            onClick={() => setMode('bulk')}
            className={cn(
              'px-4 py-1.5 text-xs uppercase tracking-[0.2em] rounded-full transition-colors',
              mode === 'bulk'
                ? 'bg-gold text-black'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            CSV bulk
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === 'single' ? (
          <div>
            <label
              htmlFor="invite-email"
              className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Email
            </label>
            <input
              id="invite-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderEmail}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
            />
            {hint && (
              <p className="text-xs text-muted-foreground mt-2">{hint}</p>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="invite-csv"
              className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Paste emails (one per line) or upload CSV
            </label>
            <textarea
              id="invite-csv"
              rows={6}
              placeholder={'first@example.com\nsecond@example.com'}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 font-mono text-sm"
            />
            {hint && (
              <p className="text-xs text-muted-foreground mt-2">{hint}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="invite-role"
              className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Role
            </label>
            <select
              id="invite-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground focus:outline-none focus:border-gold/50"
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value} className="bg-background">
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {extraField}
        </div>

        <div>
          <label
            htmlFor="invite-message"
            className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
          >
            Welcome message
          </label>
          <textarea
            id="invite-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground focus:outline-none focus:border-gold/50 text-sm"
          />
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-muted-foreground">
            Invitations expire after 7 days. Send again anytime.
          </p>
          <Button type="submit" variant="gold-solid" size="md">
            Send invitation
          </Button>
        </div>
      </form>

      {sent && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.05] p-4 text-sm text-emerald-100">
          Invitation drafted for <span className="font-medium">{sent}</span>.
          Once the backend ships, this will send via email.
        </div>
      )}
    </div>
  )
}
