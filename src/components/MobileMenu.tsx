"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CATALOGUE } from "@/lib/catalogue";
import styles from "./MobileMenu.module.css";

const DRAWER_ID = "mobile-menu";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close when the layout switches back to desktop.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 40.0625rem)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Scroll lock, Escape, focus trap while open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const focusable = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>("a[href]") ?? []).concat(toggleRef.current ?? []);
    focusable()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className={styles.root} data-open={open}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={DRAWER_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <path className={styles.barTop} d="M4 7h16" />
          <path className={styles.barMid} d="M4 12h16" />
          <path className={styles.barBottom} d="M4 17h16" />
        </svg>
      </button>

      <div className={styles.backdrop} onClick={() => close(true)} aria-hidden="true" />

      <div
        ref={drawerRef}
        id={DRAWER_ID}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ul className={styles.list}>
            {CATALOGUE.map((entry) => (
              <li key={entry.code}>
                <Link href={entry.href} className={styles.link}>
                  <span className={styles.code}>{entry.code}</span>
                  <span className={styles.label}>{entry.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
