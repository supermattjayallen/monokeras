import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const signIn =
    path === "/hiring/sign-in" || path.startsWith("/hiring/sign-in/");
  const pending: {
    name: string;
    value: string;
    options: Parameters<NextResponse["cookies"]["set"]>[2];
  }[] = [];
  const headerBag: Record<string, string> = {};
  let response = NextResponse.next({ request });

  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    if (signIn) return finish(response);
    return finish(NextResponse.redirect(new URL("/hiring/sign-in", request.url)));
  }

  const apply = (target: NextResponse) => {
    for (const cookie of pending) {
      target.cookies.set(cookie.name, cookie.value, cookie.options);
    }
    for (const [key, value] of Object.entries(headerBag)) {
      target.headers.set(key, value);
    }
    return finish(target);
  };

  const supabase = createServerClient(url, anonKey, {
    cookieOptions: {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        pending.splice(
          0,
          pending.length,
          ...cookiesToSet.map(({ name, value, options }) => ({
            name,
            value,
            options,
          })),
        );
        Object.assign(headerBag, headers);
        response = NextResponse.next({ request });
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const setup = request.nextUrl.searchParams.get("setup");

  if (!user && !signIn) {
    return apply(NextResponse.redirect(new URL("/hiring/sign-in", request.url)));
  }

  if (user && signIn && setup !== "password" && request.method === "GET") {
    return apply(NextResponse.redirect(new URL("/hiring", request.url)));
  }

  return apply(response);
}

function finish(response: NextResponse) {
  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate, max-age=0",
  );
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/hiring", "/hiring/:path*"],
};
