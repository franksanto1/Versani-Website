/**
 * Preview-mode detection.
 * True when Supabase env vars are missing — the oversight dashboards
 * still render with mock data so stakeholders can review the UI.
 */
export function isPreviewMode(): boolean {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL
}
