import Link from "next/link";
import { SERVICES } from "@/lib/catalogue";
import shared from "@/styles/catalogue.module.css";

export const metadata = { title: "WWYW 100: Services" };

export default function Services() {
  return (
    <main id="main">
      <section className={`${shared.section} ${shared.pageTop}`} aria-labelledby="t" data-edge="WWYW 100">
        <h1 className={shared.heading} id="t">
          Services <span className={shared.headingCode}>100</span>
        </h1>
        <p className={shared.intro}>
          The people who design it also build it. Every entry is delivered by the same team, start to finish.
        </p>
        <ol className={shared.entries}>
          {SERVICES.map((s) => (
            <li key={s.code}>
              <Link href={`/services/${s.slug}`} className={shared.entry}>
                <span className={shared.entryCode}>{s.code}</span>
                <span className={shared.entryName}>{s.name}</span>
                <span className={shared.entryLine}>{s.line}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
