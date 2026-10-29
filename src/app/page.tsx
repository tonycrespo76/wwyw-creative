import Link from "next/link";
import { CatalogueNav } from "@/components/CatalogueNav";
import { CodeStrip } from "@/components/CodeStrip";
import { PulsePlot } from "@/components/PulsePlot";
import { SERVICES } from "@/lib/catalogue";
import shared from "@/styles/catalogue.module.css";
import styles from "./page.module.css";

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
        <CatalogueNav />
      </div>

      <main id="main">
        <section className={shared.section} aria-labelledby="index-title" data-edge="WWYW 100">
          <h2 className={shared.heading} id="index-title">
            One team, eight ways <span className={shared.headingCode}>100</span>
          </h2>
          <ol className={styles.index}>
            {SERVICES.map((s, i) => (
              <li key={s.code}>
                <Link href={`/services/${s.slug}`} className={styles.indexRow} data-tone={i % 3}>
                  <span className={styles.indexCode}>{s.code}</span>
                  <span className={styles.indexName}>{s.name}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
