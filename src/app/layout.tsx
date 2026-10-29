import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "WWYW",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
