import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Inquiry } from "@/lib/inquiry";
import { readEnv } from "./env";

export type InquiryMeta = { ipHash: string | null; userAgent: string | null; receivedAt: string };

export type StoreResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

// Development store: one JSON line per inquiry under .data/ (git-ignored).
// Production persistence arrives with the database module; until then production reports
// "not_configured" instead of pretending to save.
export async function saveInquiry(data: Inquiry, meta: InquiryMeta): Promise<StoreResult> {
  const { NODE_ENV } = readEnv();
  if (NODE_ENV === "production") return { ok: false, reason: "not_configured" };

  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "inquiries.jsonl"), JSON.stringify({ ...data, ...meta }) + "\n", "utf8");
    return { ok: true };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
