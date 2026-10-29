import Link from "next/link";
import { CodeStrip } from "@/components/CodeStrip";
import { PulsePlot } from "@/components/PulsePlot";
import shared from "@/styles/catalogue.module.css";
import styles from "./page.module.css";

const ENTRIES = [
  { code: "100", name: "Services", line: "Eight ways we design and build, all by the same team.", href: "/services" },
  { code: "200", name: "About", line: "How the studio works and the standards it builds to.", href: "/about" },
  { code: "300", name: "Work", line: "The catalogue of finished projects, opening with the first.", href: "/work" },
] as const;

export default function Home() {
  return (
    <>
      <div className={styles.hero} id="top">
        <div className={styles.plotField}>
          <PulsePlot />
        </div>
        <div className={styles.heroBody}>
          <h1 className={styles.title}>
            <span className={styles.titleMark}>WWYW</span> 001
          </h1>
          <p className={styles.statement}>Design and engineering, one team.</p>
          <Link className={styles.action} href="/contact">
            <CodeStrip text="Start a project" />
            <span className={styles.actionLabel}>Start a project</span>
          </Link>
          <p className={styles.figure}>Plot: generative artwork, not data.</p>
        </div>
      </div>

      <main id="main">
        <section className={shared.section} aria-label="Catalogue" data-edge="WWYW 001">
          <ol className={shared.entries} style={{ marginTop: 0 }}>
            {ENTRIES.map((e) => (
              <li key={e.code}>
                <Link href={e.href} className={shared.entry}>
                  <span className={shared.entryCode}>{e.code}</span>
                  <span className={shared.entryName}>{e.name}</span>
                  <span className={shared.entryLine}>{e.line}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${shared.section} ${styles.close}`} aria-labelledby="close-title" data-edge="WWYW 900">
          <h2 className={styles.closeTitle} id="close-title">
            <span className={styles.titleMark}>WWYW</span> 900
          </h2>
          <p className={styles.statement}>Tell us what you want to make.</p>
          <Link className={styles.action} href="/contact">
            <CodeStrip text="Start a project" />
            <span className={styles.actionLabel}>Start a project</span>
          </Link>
        </section>
      </main>
    </>
  );
}
