import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource-variable/archivo/wdth.css";
import "@/styles/globals.css";
import { CatalogueNav } from "@/components/CatalogueNav";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "WWYW: design and engineering, one team",
  description: "WWYW is a creative studio where the people who design your product also build it.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className={styles.skip} href="#main">
          Skip to content
        </a>
        <Link className={styles.pill} href="/contact">
          Start a project
        </Link>
        <header className={styles.header}>
          <Link className={styles.wordmark} href="/">
            WWYW
          </Link>
          <nav className={styles.links} aria-label="Main">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>
          <CatalogueNav />
          <p className={styles.legal}>WWYW. wwyw.io</p>
        </footer>
      </body>
    </html>
  );
}
