import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tianlong-foundry.example.com"),
  title: {
    default: "TIANLONG | Automated Foundry Machinery",
    template: "%s | TIANLONG"
  },
  description:
    "Qingdao Tianlong Heavy Industry builds automated foundry machinery, horizontal molding machines, static pressure molding machines, rotor sand mixers, and complete foundry line systems.",
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/favicon.png"
  },
  openGraph: {
    title: "TIANLONG Automated Foundry Machinery",
    description:
      "Bright, capable manufacturing for molding machines, sand mixers, and foundry line automation.",
    images: ["/assets/horizontal-molding-machine.png"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label="TIANLONG Home">
      <Image src="/assets/logo.png" alt="TIANLONG" width={190} height={50} className="h-10 w-auto" priority />
    </Link>
  );
}
