"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { encode } from "@/lib/code-strip";
import styles from "./CodeStrip.module.css";

type Props = { text: string };

// A strip of colour blocks that spells `text`. The legend decodes it on hover or focus.
// Purely visual: the real words are always present as text beside it.
export function CodeStrip({ text }: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const cells = encode(text);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blocks = el.querySelectorAll("[data-block]");
    const tween = gsap.fromTo(
      blocks,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.5, ease: "expo.out", stagger: 0.045, delay: 0.3, transformOrigin: "50% 100%" },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <span ref={root} className={styles.strip} aria-hidden="true">
      {cells.map((cell, i) =>
        cell.code ? (
          <span key={i} data-block className={`${styles.block} ${styles[cell.code]}`}>
            <span className={styles.letter}>{cell.char}</span>
          </span>
        ) : (
          <span key={i} className={styles.gap} />
        ),
      )}
    </span>
  );
}
