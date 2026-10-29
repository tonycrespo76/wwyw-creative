import Link from "next/link";
import { CatalogueNav } from "@/components/CatalogueNav";
import { CodeStrip } from "@/components/CodeStrip";
import { PulsePlot } from "@/components/PulsePlot";
import { SERVICES, STANDARDS } from "@/lib/catalogue";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.hero} id="top">
        <p className={styles.wordmark}>WWYW</p>
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
        <CatalogueNav />
      </header>

      <main id="main">
        <section className={styles.section} id="services" aria-labelledby="services-title" data-edge="WWYW 100">
          <h2 className={styles.heading} id="services-title">
            Services <span className={styles.headingCode}>100</span>
          </h2>
          <p className={styles.intro}>
            The people who design it also build it. Every entry below is delivered by the same team, start to
            finish.
          </p>
          <ol className={styles.entries}>
            {SERVICES.map((s) => (
              <li key={s.code} className={styles.entry}>
                <span className={styles.entryCode}>{s.code}</span>
                <h3 className={styles.entryName}>{s.name}</h3>
                <p className={styles.entryLine}>{s.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} id="standards" aria-labelledby="standards-title" data-edge="WWYW 200">
          <h2 className={styles.heading} id="standards-title">
            Standards <span className={styles.headingCode}>200</span>
          </h2>
          <p className={styles.intro}>
            The site is the proof, so these are the targets it is built to. They are commitments, not
            measurements, until we publish measured results.
          </p>
          <dl className={styles.spec}>
            {STANDARDS.map((s) => (
              <div key={s.code} className={styles.specRow}>
                <dt>
                  <span className={styles.entryCode}>{s.code}</span> {s.name}
                </dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.section} id="work" aria-labelledby="work-title" data-edge="WWYW 300">
          <h2 className={styles.heading} id="work-title">
            Work <span className={styles.headingCode}>300</span>
          </h2>
          <ol className={styles.entries}>
            <li className={`${styles.entry} ${styles.reserved}`}>
              <span className={styles.entryCode}>301</span>
              <h3 className={styles.entryName}>Reserved</h3>
              <p className={styles.entryLine}>Placeholder slot. The first published project will be catalogued here.</p>
            </li>
          </ol>
        </section>

        <section className={`${styles.section} ${styles.close}`} aria-labelledby="close-title" data-edge="WWYW 900">
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

      <footer className={styles.footer}>
        <p>WWYW. wwyw.io</p>
      </footer>
    </>
  );
}
