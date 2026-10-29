import { timingSafeEqual } from "node:crypto";
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { readEnv } from "@/server/env";

export const dynamic = "force-dynamic";

// Hosting capability spike (Phase 1). Remove once the results are recorded
// in docs/architecture/HOSTING_SPIKE.md.

const TARGETS = [
  "https://api.stripe.com/",
  "https://api.smtp2go.com/",
  "https://challenges.cloudflare.com/turnstile/v0/api.js",
  "https://www.googleapis.com/",
];

function authorized(request: Request, secret: string | undefined): boolean {
  if (!secret) return false;
  const given = Buffer.from(request.headers.get("x-spike-secret") ?? "");
  const wanted = Buffer.from(secret);
  return given.length === wanted.length && timingSafeEqual(given, wanted);
}

async function probe(url: string) {
  const started = Date.now();
  try {
    const res = await fetch(url, { method: "GET", signal: AbortSignal.timeout(8000) });
    return { url, ok: true, status: res.status, ms: Date.now() - started };
  } catch (error) {
    return { url, ok: false, error: String(error), ms: Date.now() - started };
  }
}

async function diskCheck(root: string) {
  const file = path.join(root, ".spike", `${Date.now()}.txt`);
  try {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, "spike");
    const back = await readFile(file, "utf8");
    await rm(file);
    return { root, writable: back === "spike" };
  } catch (error) {
    return { root, writable: false, error: String(error) };
  }
}

export async function GET(request: Request) {
  const env = readEnv();
  if (!authorized(request, env.SPIKE_SECRET)) {
    return new Response(null, { status: 404 });
  }
  const mem = process.memoryUsage();
  return Response.json({
    node: process.version,
    platform: process.platform,
    uptimeSeconds: Math.round(process.uptime()),
    memoryMb: { rss: Math.round(mem.rss / 1e6), heapUsed: Math.round(mem.heapUsed / 1e6) },
    cwd: process.cwd(),
    disk: await diskCheck(env.MEDIA_ROOT ?? path.join(process.cwd(), "..", "media")),
    outbound: await Promise.all(TARGETS.map(probe)),
    at: new Date().toISOString(),
  });
}
