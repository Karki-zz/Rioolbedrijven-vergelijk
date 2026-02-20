import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over dit onderzoek | RioolPlatform",
  description:
    "Hoe RioolPlatform.nl rioolbedrijven beoordeelt en wat onze onderzoeksmethode is.",
  alternates: { canonical: "/over" },
};

function SiteLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="9" y="2" width="4" height="10" rx="2" fill="#1B4F8A" />
      <path
        d="M11 12 C11 15 14 15 14 18"
        stroke="#1B4F8A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="14" y="16.5" width="6" height="3" rx="1.5" fill="#1B4F8A" />
      <ellipse cx="21.5" cy="21.5" rx="1.5" ry="2" fill="#1B4F8A" opacity="0.6" />
    </svg>
  );
}

export default function OverPage() {
  return (
    <>
      <header className="border-b border-[#E5E7EB]" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
            style={{
              fontFamily: "var(--font-playfair, Playfair Display, serif)",
              color: "#1B4F8A",
            }}
          >
            <SiteLogo />
            RioolPlatform.nl
          </Link>
          <span className="text-xs hidden sm:block" style={{ color: "#6B7280" }}>
            Onafhankelijk onderzoek · Februari 2026
          </span>
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm mb-10"
          style={{ color: "#1B4F8A" }}
        >
          ← Terug naar het vergelijkingsartikel
        </Link>

        <h1
          className="text-3xl font-bold mb-8"
          style={{
            fontFamily: "var(--font-playfair, Playfair Display, serif)",
            color: "#1A1A1A",
          }}
        >
          Over dit onderzoek
        </h1>

        <div className="article-prose">
          <p>
            RioolPlatform.nl is een onafhankelijk redactioneel platform dat consumenten helpt een
            weloverwogen keuze te maken bij het selecteren van een rioolbedrijf. Wij zijn niet
            gelieerd aan een van de beoordeelde bedrijven en ontvangen geen betaling voor een hogere
            of lagere rangschikking in onze vergelijkingen.
          </p>

          <h2>Hoe wij testen</h2>
          <p>
            Onze beoordelingen zijn gebaseerd op een combinatie van methoden: analyse van
            klantreviews op Google en Trustpilot (gecorrigeerd op manipulatie), anonieme
            offerteaanvragen voor drie scenario&apos;s (standaardverstopping, camerainspectie,
            rioolreiniging), telefonische bereikbaarheidstests op afwijkende tijdstippen (avond,
            weekend, feestdagen) en bestudering van de garantievoorwaarden en algemene
            leveringsvoorwaarden. Elk criterium wordt gescoord op een schaal van 1 tot 5 en
            gewogen naar relevantie in een noodsituatie.
          </p>

          <h2>Onafhankelijkheid en transparantie</h2>
          <p>
            RioolPlatform.nl verdient zijn inkomsten via affiliate-links — als je via onze website
            een bedrijf bezoekt en een dienst afneemt, ontvangen wij mogelijk een vergoeding.
            Dit heeft <strong>geen invloed</strong> op de scores of de rangschikking in ons
            onderzoek. De redactie en de commerciële afdeling zijn strikt gescheiden. Wil je een
            fout melden of een bedrijf aanmelden voor opname in ons onderzoek? Stuur dan een
            e-mail naar{" "}
            <a href="mailto:redactie@rioolplatform.nl" style={{ color: "#1B4F8A" }}>
              redactie@rioolplatform.nl
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
