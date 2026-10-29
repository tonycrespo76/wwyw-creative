"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { readFormValues, validateInquiry, type InquiryState } from "@/lib/inquiry";
import { saveInquiry } from "@/server/inquiry-store";
import { allow } from "@/server/rate-limit";
import { verifyTurnstile } from "@/server/turnstile";

const GENERIC = "Something went wrong and your inquiry was not sent. Please try again in a moment.";

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const values = readFormValues(formData);

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", message: "Thank you. Your inquiry has been received." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;

  if (!allow(`inquiry:${ip ?? "unknown"}`, 5, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many attempts. Please wait a few minutes and try again.", values };
  }

  const parsed = validateInquiry(values);
  if (!parsed.ok) {
    return { status: "error", message: "Please fix the highlighted fields.", errors: parsed.errors, values };
  }

  const token = String(formData.get("cf-turnstile-response") ?? "");
  const check = await verifyTurnstile(token, ip);
  if (!check.ok) {
    const message =
      check.reason === "not_configured"
        ? "Inquiries are not being accepted yet."
        : check.reason === "failed"
          ? "The spam check did not pass. Complete it and send again."
          : "We could not reach the spam check. Please try again.";
    return { status: "error", message, values };
  }

  const saved = await saveInquiry(parsed.data, {
    ipHash: ip ? createHash("sha256").update(ip).digest("hex") : null,
    userAgent: h.get("user-agent"),
    receivedAt: new Date().toISOString(),
  });
  if (!saved.ok) {
    return {
      status: "error",
      message: saved.reason === "not_configured" ? "Inquiries are not being accepted yet." : GENERIC,
      values,
    };
  }

  return { status: "success", message: "Thank you. Your inquiry has been received." };
}
