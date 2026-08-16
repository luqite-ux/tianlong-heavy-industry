import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/site-data";
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tianlong-heavy-industry.vercel.app";
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.brand,
    url: siteUrl,
    logo: `${siteUrl}/assets/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tongli Road 9, Tianzhuang Industrial Park",
      addressLocality: "Pingdu, Qingdao",
      addressRegion: "Shandong",
      addressCountry: "CN"
    },
    contactPoint: company.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "sales"
    }))
  };

  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
