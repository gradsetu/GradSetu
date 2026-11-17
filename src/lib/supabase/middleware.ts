import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const { pathname } = request.nextUrl;

  // Static assets, favicon, Next internals - skip immediately
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return supabaseResponse;
  }

  // 1. Check if user has our reliable session cookie (instant, 0ms)
  const devSessionCookie = request.cookies.get('gradsetu_session')?.value;
  let hasValidSessionCookie = false;
  if (devSessionCookie) {
    try {
      const parsed = JSON.parse(devSessionCookie);
      if (parsed && parsed.email) {
        hasValidSessionCookie = true;
      }
    } catch {
      // Invalid cookie
    }
  }

  // 2. Check Supabase session ONLY if Supabase auth cookies are present (prevents hanging on external fetch)
  let hasSupabaseUser = false;
  const hasSbCookies = request.cookies.getAll().some((c) => c.name.startsWith('sb-'));

  if (hasSbCookies) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
              supabaseResponse = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      // Race with 1.5s timeout so network latency to Supabase never blocks the browser
      const userPromise = supabase.auth.getUser();
      const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
        setTimeout(() => resolve({ data: { user: null } }), 1500)
      );

      const res = await Promise.race([userPromise, timeoutPromise]);
      if (res && 'data' in res && res.data?.user) {
        hasSupabaseUser = true;
      }
    } catch {
      // Fallback cleanly
    }
  }

  const isAuthenticated = hasValidSessionCookie || hasSupabaseUser;

  // Public exploration routes that any visitor can view without logging in
  const isPublicExplorationRoute =
    pathname === '/' ||
    pathname === '/login' ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/aspirant/colleges') ||
    pathname.startsWith('/aspirant/compare') ||
    pathname.startsWith('/mentors') ||
    pathname.startsWith('/api/');

  // Protect designated private routes
  const protectedPrefixes = ['/admin', '/mentor', '/aspirant'];
  const isProtected =
    !isPublicExplorationRoute && protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isAuthenticated && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If already authenticated and visiting /login or /signup, redirect to their role dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    let target = '/aspirant/dashboard';
    if (devSessionCookie) {
      try {
        const parsed = JSON.parse(devSessionCookie);
        if (parsed.role === 'admin') target = '/admin/dashboard';
        else if (parsed.role === 'mentor') target = '/mentor/dashboard';
      } catch {
        // fallback to aspirant
      }
    }
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = target;
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
