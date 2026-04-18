/** Currency formatter — USD, 2dp. */
export function formatCurrency(amount: number, opts: { minimal?: boolean } = {}) {
  if (opts.minimal && amount === Math.round(amount)) {
    return `$${amount.toLocaleString()}`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/** Percentage formatter for 0-1 decimals. */
export function formatPercent(v: number, digits = 0): string {
  return `${(v * 100).toFixed(digits)}%`
}

/** Short date formatter (Apr 18, 2026). */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Month-year formatter for chart axes ('2026-04' -> 'Apr 26'). */
export function formatMonthShort(monthKey: string): string {
  const [y, m] = monthKey.split('-').map(Number)
  const d = new Date(y, m - 1, 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}
