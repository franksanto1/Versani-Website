/**
 * Stripe server-side client + tier → price ID mapping.
 * Used by Stripe checkout and webhook routes.
 *
 * Lazy-instantiates to allow builds with empty env vars.
 */
import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. Add it to .env.local to enable billing.'
    )
  }
  _stripe = new Stripe(key, {
    apiVersion: '2026-03-25.dahlia',
    typescript: true,
  })
  return _stripe
}

/**
 * Proxy so existing `import { stripe }` usage continues to work.
 * Methods are accessed lazily, so build-time evaluation is safe.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const client = getStripe()
    const value = Reflect.get(client, prop)
    return typeof value === 'function' ? value.bind(client) : value
  },
})

export type Tier = 'pro' | 'studio'
export type Billing = 'monthly' | 'yearly'

/**
 * Map tier + billing period to Stripe price ID.
 * Pro and Studio both support monthly and yearly billing (2 months free on yearly).
 */
export function getPriceId(tier: Tier, billing: Billing): string | null {
  const map: Record<string, string | undefined> = {
    'pro-monthly': process.env.STRIPE_PRICE_PRO_MONTHLY,
    'pro-yearly': process.env.STRIPE_PRICE_PRO_YEARLY,
    'studio-monthly': process.env.STRIPE_PRICE_STUDIO_MONTHLY,
    'studio-yearly': process.env.STRIPE_PRICE_STUDIO_YEARLY,
  }
  const key = `${tier}-${billing}`
  return map[key] || null
}

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
