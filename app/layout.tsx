import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "De beste rioolbedrijven in Nederland vergeleken (2026) | RioolVergelijk",
    template: "%s | RioolVergelijk",
  },
  description:
    "Welk rioolbedrijf in Nederland is de beste keuze? Wij vergeleken 5 aanbieders op klanttevredenheid, prijs, betrouwbaarheid en beschikbaarheid. Onafhankelijk onderzoek 2026.",
  metadataBase: new URL("https://rioolvergelijk.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "De beste rioolbedrijven in Nederland vergeleken (2026)",
    description:
      "Welk rioolbedrijf kies je? 5 aanbieders vergeleken op 7 criteria. Onafhankelijk onderzoek.",
    type: "article",
    locale: "nl_NL",
    siteName: "RioolVergelijk",
  },
  twitter: {
    card: "summary_large_image",
    title: "De beste rioolbedrijven in Nederland vergeleken (2026)",
    description: "5 aanbieders vergeleken op 7 criteria. Onafhankelijk onderzoek 2026.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "De beste rioolbedrijven in Nederland vergeleken: wie scoort écht? (2026)",
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  author: {
    "@type": "Organization",
    name: "RioolVergelijk",
    url: "https://rioolvergelijk.nl",
  },
  publisher: {
    "@type": "Organization",
    name: "RioolVergelijk",
    url: "https://rioolvergelijk.nl",
  },
  description:
    "Welk rioolbedrijf in Nederland is de beste keuze? Wij vergeleken 5 aanbieders op klanttevredenheid, prijs, betrouwbaarheid en beschikbaarheid.",
  inLanguage: "nl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen" style={{ fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)" }}>
        {/* V3 placeholder: sticky sidebar wrapper — add grid layout here in V3 */}
        {children}
      </body>
    </html>
  );
}
