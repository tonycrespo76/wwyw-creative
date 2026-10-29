import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource-variable/archivo/wdth.css";
import "@/styles/globals.css";
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
        {children}
      </body>
    </html>
  );
}
