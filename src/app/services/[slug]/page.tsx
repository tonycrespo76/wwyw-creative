import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeStrip } from "@/components/CodeStrip";
import { SERVICES } from "@/lib/catalogue";
import shared from "@/styles/catalogue.module.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  return service ? { title: `WWYW ${service.code}: ${service.name}`, description: service.line } : {};
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main id="main">
      <section className={`${shared.section} ${shared.pageTop}`} aria-labelledby="t" data-edge={`WWYW ${service.code}`}>
        <Link className={shared.crumb} href="/services">
          Back to 100 Services
        </Link>
        <span className={shared.numeral} aria-hidden="true">
          {service.code}
        </span>
        <h1 className={shared.heading} id="t">
          {service.name}
        </h1>
        <div style={{ marginTop: "var(--space-5)" }}>
          <CodeStrip text={service.name} />
        </div>
        <p className={shared.intro}>{service.line}</p>
        <ol className={shared.entries}>
          <li className={`${shared.entry} ${shared.reserved}`}>
            <span className={shared.entryCode}>{service.code}.1</span>
            <span className={shared.entryName}>Scope</span>
            <span className={shared.entryLine}>Placeholder slot. The detailed scope will be catalogued here.</span>
          </li>
        </ol>
        <p className={shared.cta}>
          <Link href="/contact" className={shared.textLink}>
            Start a project
          </Link>
        </p>
      </section>
    </main>
  );
}
