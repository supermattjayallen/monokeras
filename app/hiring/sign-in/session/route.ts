import { createClient } from "@supabase/supabase-js";
import { createAuthClient } from "@/lib/supabase/auth";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxTokenLength = 12000;

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "invalid" }, { status: 403 });
  }

  const body = await readBody(request);
  if (!body) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const url = supabaseUrl();
  const anonKey = supabaseAnonKey();
  if (!url || !anonKey) {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  const checker = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const verified = await checker.auth.getUser(body.accessToken);
  if (verified.error || !verified.data.user) {
    return Response.json({ error: "invalid" }, { status: 401 });
  }

  const supabase = await createAuthClient();
  if (!supabase) {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  const session = await supabase.auth.setSession({
    access_token: body.accessToken,
    refresh_token: body.refreshToken,
  });
  if (session.error || !session.data.user) {
    await supabase.auth.signOut();
    return Response.json({ error: "invalid" }, { status: 401 });
  }

  return Response.json({ ok: true });
}

async function readBody(
  request: Request,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return null;
  }
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const accessToken = token(record.accessToken);
  const refreshToken = token(record.refreshToken);
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

function token(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < 20 || trimmed.length > maxTokenLength) return null;
  if (/\s/.test(trimmed)) return null;
  return trimmed;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host.split(",")[0]?.trim();
  } catch {
    return false;
  }
}
