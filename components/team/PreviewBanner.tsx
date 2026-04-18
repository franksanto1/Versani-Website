interface PreviewBannerProps {
  show: boolean
}

/**
 * Banner rendered above oversight dashboards when Supabase is not configured.
 * Confirms to stakeholders that auth is disabled and data is mocked.
 */
export function PreviewBanner({ show }: PreviewBannerProps) {
  if (!show) return null

  return (
    <div className="border-b border-amber-400/30 bg-amber-400/[0.06]">
      <div className="container py-2.5 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-xs text-amber-100">
          <span className="uppercase tracking-[0.2em] mr-2">Preview mode</span>
          Auth is disabled and data is mocked. Connect Supabase to go live.
        </div>
        <a
          href="/MULTI-TENANT-REQUIREMENTS.md"
          className="text-xs uppercase tracking-[0.18em] text-amber-200 hover:text-amber-100"
        >
          Backend requirements →
        </a>
      </div>
    </div>
  )
}
