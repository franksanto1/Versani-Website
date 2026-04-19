'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/cn'

/* ================================================================
   CapReachedModal
   Surfaces when a subscriber has consumed their monthly allotment
   for either consultations or Ask Versani messages. Offers top-up
   packs (no urgency, no "upgrade now" SaaS energy) plus an upgrade
   option. Gold accents, calm factual copy.
   ================================================================ */

export type CapType = 'consultations' | 'ask-versani'

export interface CapReachedModalProps {
  open: boolean
  onClose: () => void
  capType: CapType
  currentPlan: string
  used: number
  total: number
  daysUntilReset: number
  onPurchaseTopUp: (size: number) => void
  onUpgrade: () => void
}

interface Pack {
  size: number
  price: number
  tag?: 'recommended' | 'best'
  label: string
}

const consultationPacks: Pack[] = [
  { size: 5, price: 5.99, label: 'Top-Up 5' },
  { size: 10, price: 9.99, tag: 'recommended', label: 'Top-Up 10' },
  { size: 25, price: 19.99, tag: 'best', label: 'Top-Up 25' },
]

const askVersaniPacks: Pack[] = [
  { size: 25, price: 1.99, tag: 'recommended', label: 'Top-Up 25' },
  { size: 50, price: 2.99, label: 'Top-Up 50' },
  { size: 100, price: 4.99, tag: 'best', label: 'Top-Up 100' },
]

export function CapReachedModal({
  open,
  onClose,
  capType,
  currentPlan,
  used,
  total,
  daysUntilReset,
  onPurchaseTopUp,
  onUpgrade,
}: CapReachedModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const isAsk = capType === 'ask-versani'
  const packs = isAsk ? askVersaniPacks : consultationPacks
  const recommended = packs.find((p) => p.tag === 'recommended') ?? packs[0]

  const unit = isAsk ? 'Ask Versani messages' : 'full consultations'
  const unitShort = isAsk ? 'messages' : 'consultations'
  const capLabel = isAsk ? 'Ask Versani cap' : 'Monthly cap'

  const title = isAsk
    ? `You've used your ${total} Ask Versani messages this month`
    : "You've reached your monthly consultation cap"

  const usageLine = isAsk
    ? `You've used ${used} of ${total} Ask Versani messages this cycle.`
    : `You've used ${used} of ${total} full consultations this cycle.`

  const sideline = isAsk
    ? 'Consultations and client updates keep working.'
    : 'Client updates and Ask Versani keep working.'

  const upgradeCopy = isAsk
    ? {
        title: 'Upgrade to Studio',
        detail: '150 Ask Versani messages · 70 consults · AI client insights',
        price: '$39.99/month — prorated from today',
      }
    : {
        title: 'Upgrade to Studio',
        detail: '70 consultations · AI client insights · CSV export',
        price: '$39.99/month — prorated from today',
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cap-modal-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              'relative z-10 w-full max-w-lg rounded-2xl p-8 bg-[color:var(--background)]',
              'border border-[color:var(--gold)]/[0.25]',
            )}
            style={{
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.7), 0 0 40px oklch(0.76 0.15 85 / 0.08)',
            }}
          >
            {/* Close X */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="text-[10px] font-bold uppercase tracking-[0.24em] mb-3 text-[color:var(--gold)]">
              {currentPlan} · {capLabel}
            </div>
            <h2
              id="cap-modal-title"
              className="font-serif text-2xl md:text-3xl font-light tracking-tight mb-3 text-[color:var(--foreground)]"
            >
              {title}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {usageLine} Your cap resets in{' '}
              <span className="text-white/85">
                {daysUntilReset} {daysUntilReset === 1 ? 'day' : 'days'}
              </span>
              . {sideline}
            </p>

            {/* Recommended pack */}
            <div className="rounded-xl p-5 mb-4 bg-gradient-to-b from-[color:var(--gold)]/[0.1] to-[color:var(--gold)]/[0.02] border border-[color:var(--gold)]/[0.3]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--gold)] mb-1.5">
                    Quick unblock
                  </div>
                  <div className="font-serif text-xl text-[color:var(--foreground)]">
                    Top up {recommended.size} more
                  </div>
                  <div className="text-xs text-white/55 mt-1">
                    Never expires. Rolls over indefinitely.
                  </div>
                </div>
                <div className="font-serif text-2xl text-[color:var(--gold)] whitespace-nowrap">
                  ${recommended.price.toFixed(2)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onPurchaseTopUp(recommended.size)}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ease-luxury w-full bg-[color:var(--gold)] text-black border border-[color:var(--gold-light)] hover:bg-[color:var(--gold-light)]"
              >
                Top up {recommended.size} more — ${recommended.price.toFixed(2)}
              </button>
            </div>

            {/* Other options */}
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3">
              Other options
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {packs
                .filter((p) => p.size !== recommended.size)
                .map((p) => (
                  <button
                    key={p.size}
                    type="button"
                    onClick={() => onPurchaseTopUp(p.size)}
                    className="rounded-xl p-4 bg-white/[0.03] border border-white/[0.08] hover:border-[color:var(--gold)]/[0.35] hover:bg-white/[0.05] transition-colors text-left"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--gold)] mb-1">
                      {p.label}
                      {p.tag === 'best' && (
                        <span className="ml-1.5 text-white/50">
                          · best value
                        </span>
                      )}
                    </div>
                    <div className="font-serif text-lg text-[color:var(--foreground)]">
                      ${p.price.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-white/50 mt-0.5">
                      {p.size} {unitShort}
                    </div>
                  </button>
                ))}
            </div>
            <button
              type="button"
              onClick={onUpgrade}
              className="w-full rounded-xl p-4 bg-white/[0.03] border border-white/[0.08] hover:border-[color:var(--gold)]/[0.35] hover:bg-white/[0.05] transition-colors text-left"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--gold)] mb-1">
                {upgradeCopy.title}
              </div>
              <div className="text-sm text-[color:var(--foreground)]">
                {upgradeCopy.detail}
              </div>
              <div className="text-[11px] text-white/50 mt-0.5">
                {upgradeCopy.price}
              </div>
            </button>

            <p className="mt-6 text-xs text-white/40 text-center">
              Your {unit} cap resets in {daysUntilReset}{' '}
              {daysUntilReset === 1 ? 'day' : 'days'}.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
