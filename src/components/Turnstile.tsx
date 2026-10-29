"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Props = { siteKey: string; resetKey: unknown };

// Renders the Cloudflare Turnstile widget. The widget adds a hidden `cf-turnstile-response`
// field to the surrounding form; the server verifies it before anything is processed.
export function Turnstile({ siteKey, resetKey }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const firstKey = useRef(resetKey);

  const mount = useCallback(() => {
    if (!box.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(box.current, { sitekey: siteKey, theme: "dark" });
  }, [siteKey]);

  // Covers the script already being loaded (client-side navigation back to this page).
  useEffect(() => {
    mount();
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [mount]);

  // Tokens are single use: refresh the widget after every submission result.
  useEffect(() => {
    if (resetKey === firstKey.current) return;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={mount}
      />
      <div ref={box} />
    </>
  );
}
