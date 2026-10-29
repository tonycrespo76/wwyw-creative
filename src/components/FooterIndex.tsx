"use client";

import { usePathname } from "next/navigation";
import { CatalogueNav } from "./CatalogueNav";

// The home page carries its own index row in the hero, so the footer one is skipped there.
export function FooterIndex() {
  return usePathname() === "/" ? null : <CatalogueNav />;
}
