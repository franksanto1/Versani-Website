/**
 * Supabase session refresh middleware.
 * Keeps auth session fresh across requests and gates /admin routes.
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase isn't configured (e.g. local preview), admin remains locked
  // but oversight dashboards (/salon, /school, /instructor) render in preview
  // mode with mock data and a banner. This lets stakeholders review the UI
  // before the multi-tenant backend is wired in.
  if (!supabaseUrl || !supabaseKey) {
    const path = request.nextUrl.pathname
    if (path.startsWith('/admin')) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      redirectUrl.searchParams.set('next', path)
      redirectUrl.searchParams.set('error', 'supabase_not_configured')
      return NextResponse.redirect(redirectUrl)
    }
    // /salon, /school, /instructor render with mock data + preview banner.
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Protect /admin/*
  if (path.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      redirectUrl.searchParams.set('next', path)
      redirectUrl.searchParams.set('mode', 'signin')
      return NextResponse.redirect(redirectUrl)
    }

    // Check admin role — requires profiles.is_admin column in Supabase
    // See SCHEMA-REQUIREMENTS.md for details
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (!profile?.is_admin) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/'
        redirectUrl.searchParams.set('error', 'admin_only')
        return NextResponse.redirect(redirectUrl)
      }
    } catch {
      // Schema not yet migrated — fall through and let page handle gracefully
    }
  }

  // Protect /salon, /school, /instructor — organization-scoped role checks.
  // The real role lookup lives in OpenServ's multi-tenant backend (see
  // MULTI-TENANT-REQUIREMENTS.md → organization_members). Until that ships,
  // we only gate on "is this user authenticated at all?" so the prototypes
  // remain reviewable behind a real session.
  const requiresSalon = path.startsWith('/salon')
  const requiresSchool = path.startsWith('/school')
  const requiresInstructor = path.startsWith('/instructor')

  if (requiresSalon || requiresSchool || requiresInstructor) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      redirectUrl.searchParams.set('next', path)
      redirectUrl.searchParams.set('mode', 'signin')
      return NextResponse.redirect(redirectUrl)
    }

    // TODO(openserv): query organization_members for this user and verify role:
    //   /salon/*      → role in ('salon_owner', 'salon_manager')
    //   /school/*     → role in ('school_owner', 'school_admin')
    //   /instructor/* → role === 'instructor' with at least one class grant
    // For now, fall through and let the page render with mocks so we can
    // review the UI before the backend is available.
  }

  return supabaseResponse
}
