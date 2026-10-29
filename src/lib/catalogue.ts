// The catalogue index. Numbers are addresses: typing three digits jumps there.
export type CatalogueEntry = { code: string; label: string; href: string };

export const CATALOGUE: readonly CatalogueEntry[] = [
  { code: "001", label: "Studio", href: "/" },
  { code: "100", label: "Services", href: "/#services" },
  { code: "200", label: "Standards", href: "/#standards" },
  { code: "300", label: "Work", href: "/#work" },
  { code: "900", label: "Start a project", href: "/contact" },
] as const;

export type Service = { code: string; name: string; line: string };

// Service names come from the product brief. Lines are plain descriptions, not claims.
export const SERVICES: readonly Service[] = [
  { code: "101", name: "Creative websites", line: "Design and development of brand and marketing sites by one team." },
  { code: "102", name: "Custom web applications", line: "Product interfaces and the systems behind them, built to your workflow." },
  { code: "103", name: "E-commerce", line: "Storefronts and checkout, designed and engineered together." },
  { code: "104", name: "Digital product engineering", line: "From first prototype to a maintained production product." },
  { code: "105", name: "UI and UX design", line: "Interface design, flows and systems that ship as working code." },
  { code: "106", name: "Creative technology", line: "Interactive and motion-led experiences on the web." },
  { code: "107", name: "Website modernization", line: "Rebuilding existing sites for speed, accessibility and editing." },
  { code: "108", name: "Ongoing support", line: "Continued care, changes and improvements after launch." },
] as const;

export const STANDARDS: readonly { code: string; name: string; value: string }[] = [
  { code: "201", name: "Accessibility", value: "WCAG 2.2 AA" },
  { code: "202", name: "Largest Contentful Paint target", value: "2.5 s" },
  { code: "203", name: "Interaction to Next Paint target", value: "200 ms" },
  { code: "204", name: "Cumulative Layout Shift target", value: "0.1" },
  { code: "205", name: "Reduced motion", value: "Honoured" },
] as const;
