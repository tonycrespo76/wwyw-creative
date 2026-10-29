import { InquiryForm } from "@/components/InquiryForm";
import { readEnv } from "@/server/env";
import styles from "./contact.module.css";

export const metadata = { title: "WWYW 900: Start a project" };
export const dynamic = "force-dynamic";

export default function Contact() {
  const { NEXT_PUBLIC_TURNSTILE_SITE_KEY } = readEnv();
  return (
    <main id="main" className={styles.page}>
      <h1 className={styles.title}>WWYW 900</h1>
      <p className={styles.lead}>Tell us what you want to make.</p>
      <InquiryForm siteKey={NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
    </main>
  );
}
