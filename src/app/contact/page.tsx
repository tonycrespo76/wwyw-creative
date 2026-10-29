import Link from "next/link";
import styles from "./contact.module.css";

export const metadata = { title: "WWYW 900: Start a project" };

export default function Contact() {
  return (
    <main id="main" className={styles.page}>
      <h1 className={styles.title}>WWYW 900</h1>
      <p className={styles.lead}>The project inquiry form is not live yet.</p>
      <p className={styles.note}>
        It arrives with the forms module, protected by Cloudflare Turnstile. Until then this page accepts no
        submissions.
      </p>
      <Link className={styles.back} href="/">
        Back to the catalogue
      </Link>
    </main>
  );
}
