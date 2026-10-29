import shared from "@/styles/catalogue.module.css";

export const metadata = { title: "WWYW 300: Work" };

export default function Work() {
  return (
    <main id="main">
      <section className={`${shared.section} ${shared.pageTop}`} aria-labelledby="t" data-edge="WWYW 300">
        <h1 className={shared.heading} id="t">
          Work <span className={shared.headingCode}>300</span>
        </h1>
        <p className={shared.intro}>The catalogue of finished projects.</p>
        <ol className={shared.entries}>
          <li className={`${shared.entry} ${shared.reserved}`}>
            <span className={shared.entryCode}>301</span>
            <span className={shared.entryName}>Reserved</span>
            <span className={shared.entryLine}>Placeholder slot. The first published project will be catalogued here.</span>
          </li>
        </ol>
      </section>
    </main>
  );
}
