import { STANDARDS } from "@/lib/catalogue";
import shared from "@/styles/catalogue.module.css";

export const metadata = { title: "WWYW 200: About" };

export default function About() {
  return (
    <main id="main">
      <section className={`${shared.section} ${shared.pageTop}`} aria-labelledby="t" data-edge="WWYW 200">
        <h1 className={shared.heading} id="t">
          About <span className={shared.headingCode}>200</span>
        </h1>
        <p className={shared.intro}>
          WWYW is a creative studio where design and engineering are one team. The people who shape the idea also
          build the website, the application or the store, so ambitious work ships as a working product.
        </p>
      </section>

      <section className={shared.section} aria-labelledby="s" data-edge="WWYW 210">
        <h2 className={shared.heading} id="s">
          Standards <span className={shared.headingCode}>210</span>
        </h2>
        <p className={shared.intro}>
          The site is the proof, so these are the targets it is built to. They are commitments, not measurements,
          until we publish measured results.
        </p>
        <dl className={shared.spec}>
          {STANDARDS.map((s) => (
            <div key={s.code} className={shared.specRow}>
              <dt>
                <span className={shared.entryCode}>{s.code}</span> {s.name}
              </dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={shared.section} aria-labelledby="p" data-edge="WWYW 220">
        <h2 className={shared.heading} id="p">
          People <span className={shared.headingCode}>220</span>
        </h2>
        <ol className={shared.entries}>
          <li className={`${shared.entry} ${shared.reserved}`}>
            <span className={shared.entryCode}>221</span>
            <span className={shared.entryName}>Reserved</span>
            <span className={shared.entryLine}>Placeholder slot. Team profiles will be catalogued here.</span>
          </li>
        </ol>
      </section>
    </main>
  );
}
