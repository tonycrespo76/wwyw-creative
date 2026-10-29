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
        <h1 className={shared.heading} id="t">
          {service.name} <span className={shared.headingCode}>{service.code}</span>
        </h1>
        <p className={shared.intro}>{service.line}</p>
        <div className={shared.body}>
          <p>
            Design and engineering sit in one team, so what is designed is what gets built, with no hand-off
            between the two.
          </p>
          <p>The detailed scope for this service is being written and will be published here.</p>
        </div>
        <Link href="/contact" className={shared.cta} style={{ display: "inline-flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}>
          <CodeStrip text="Start a project" />
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Start a project
          </span>
        </Link>
      </section>
    </main>
  );
}
