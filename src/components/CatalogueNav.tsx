"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CATALOGUE } from "@/lib/catalogue";
import styles from "./CatalogueNav.module.css";

// The index row. Typing a three-digit address anywhere on the page jumps to it.
export function CatalogueNav() {
  const router = useRouter();
  const [buffer, setBuffer] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      if (!/^[0-9]$/.test(event.key)) return;

      const next = (buffer + event.key).slice(-3);
      setBuffer(next);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setBuffer(""), 1500);

      if (next.length === 3) {
        const entry = CATALOGUE.find((e) => e.code === next);
        if (entry) {
          router.push(entry.href);
          setBuffer("");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [buffer, router]);

  return (
    <nav className={styles.nav} aria-label="Catalogue index">
      <ul className={styles.row}>
        {CATALOGUE.map((entry) => (
          <li key={entry.code} className={styles.item}>
            <Link href={entry.href} className={styles.link}>
              <span className={styles.code}>{entry.code}</span>
              <span className={styles.label}>{entry.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className={styles.hint} aria-live="polite">
        {buffer ? `Address ${buffer.padEnd(3, "_")}` : "Type a three-digit address to jump"}
      </p>
    </nav>
  );
}
