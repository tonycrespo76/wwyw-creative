import { readEnv } from "./env";

export type TurnstileResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" | "unreachable" };

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string, ip: string | null): Promise<TurnstileResult> {
  const { TURNSTILE_SECRET_KEY } = readEnv();
  if (!TURNSTILE_SECRET_KEY) return { ok: false, reason: "not_configured" };
  if (!token) return { ok: false, reason: "failed" };

  const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return { ok: false, reason: "unreachable" };
    const data = (await res.json()) as { success?: boolean };
    return data.success ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "unreachable" };
  }
}
