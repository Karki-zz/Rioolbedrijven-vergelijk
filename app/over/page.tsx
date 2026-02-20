import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over dit onderzoek | RioolVergelijk",
  description:
    "Hoe RioolVergelijk.nl rioolbedrijven beoordeelt en wat onze onderzoeksmethode is.",
  alternates: { canonical: "/over" },
};

export default function OverPage() {
  return (
    <>
      <header className="border-b border-[#E5E7EB]" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-lg tracking-tight"
            style={{
              fontFamily: "var(--font-playfair, Playfair Display, serif)",
              color: "#1B4F8A",
            }}
          >
            RioolVergelijk.nl
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
            RioolVergelijk.nl is een onafhankelijk redactioneel platform dat consumenten helpt een
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
            RioolVergelijk.nl verdient zijn inkomsten via affiliate-links — als je via onze website
            een bedrijf bezoekt en een dienst afneemt, ontvangen wij mogelijk een vergoeding.
            Dit heeft <strong>geen invloed</strong> op de scores of de rangschikking in ons
            onderzoek. De redactie en de commerciële afdeling zijn strikt gescheiden. Wil je een
            fout melden of een bedrijf aanmelden voor opname in ons onderzoek? Stuur dan een
            e-mail naar{" "}
            <a href="mailto:redactie@rioolvergelijk.nl" style={{ color: "#1B4F8A" }}>
              redactie@rioolvergelijk.nl
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
