import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over rioolservice",
  description:
    "Antwoorden op de meest gestelde vragen over rioolontstopping, kosten, cameraonderzoek en het kiezen van een betrouwbaar rioolbedrijf in Nederland.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat kost riool ontstoppen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De prijs voor rioolontstopping varieert tussen €139 en €296 inclusief btw, afhankelijk van het type klus (plaatselijke afvoer of hoofdleiding) en het tijdstip. Spoedtoeslagen 's avonds en in het weekend kunnen het tarief met 50 tot 100 procent verhogen. Vraag altijd een all-in prijs vooraf.",
      },
    },
    {
      "@type": "Question",
      name: "Wat kost een rioolinspectie met cameraonderzoek?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een rioolinspectie met camera kost gemiddeld 150 tot 250 euro inclusief btw. Vraag of u ook een videorapportage ontvangt — dat is nodig voor verzekeraars en aannemers.",
      },
    },
    {
      "@type": "Question",
      name: "Waar moet ik op letten bij het kiezen van een rioolbedrijf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De vijf belangrijkste criteria zijn: een vaste prijs vooraf (inclusief btw en toeslagen), een no-cure-no-pay-beleid, garantie op het uitgevoerde werk, eigen gecertificeerd personeel (geen onderaannemers), en goede beoordelingen op meerdere platforms zoals Trustpilot, Google en Trustoo.",
      },
    },
    {
      "@type": "Question",
      name: "Wie is verantwoordelijk voor het riool: de bewoner of de gemeente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De eigenaar is verantwoordelijk voor het riool op eigen terrein, van de woning tot aan de perceelgrens. De gemeente beheert het openbare riool in de straat. Bij verstopping in de gemeenschappelijke huisaansluiting kan de gemeente aansprakelijk worden gesteld.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is no-cure-no-pay bij rioolservice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No-cure-no-pay betekent dat u alleen betaalt als het probleem daadwerkelijk is opgelost. Wordt de verstopping niet verholpen, dan ontvangt u geen factuur. Controleer altijd de precieze formulering: sommige aanbieders rekenen toch voorrijkosten of materiaalkosten, ook zonder oplossing.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe weet ik of mijn riool verstopt is?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Signalen van een rioolverstopping zijn: water dat langzaam of niet wegloopt, gorgelende geluiden uit de afvoer, terugstromend water bij gebruik van andere afvoerpunten, stankoverlast en een WC die slecht doorspoelt. Als meerdere afvoerpunten tegelijk problemen geven, zit de verstopping waarschijnlijk in de hoofdleiding.",
      },
    },
  ],
};

const categories = [
  { id: "kosten", label: "Kosten" },
  { id: "problemen-herkennen", label: "Problemen herkennen" },
  { id: "een-rioolbedrijf-kiezen", label: "Een rioolbedrijf kiezen" },
  { id: "verantwoordelijkheid-en-praktijk", label: "Verantwoordelijkheid" },
  { id: "noodsituaties", label: "Noodsituaties" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

async function getContent(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "content/articles/veelgestelde-vragen.md"
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  // Skip the intro block (h1 + intro paragraph) — start from the first ## heading
  const firstH2 = content.indexOf("\n## ");
  const body = firstH2 !== -1 ? content.slice(firstH2 + 1) : content;

  // Strip the developer schema section from visible content
  const withoutSchema = body.replace(
    /\n## Schema markup voor ontwikkelaars[\s\S]*$/,
    ""
  );

  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(withoutSchema);

  let html = result.toString();

  // Inject anchor IDs into h2 headings
  html = html.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const id = slugify(text);
    return `<h2 id="${id}">${text}</h2>`;
  });

  return html;
}

export default async function FaqPage() {
  const html = await getContent();

  return (
    <>
      {/* FAQPage JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SiteHeader />

      <main className="max-w-[680px] mx-auto px-4 sm:px-6 pb-24">
        {/* Back link */}
        <div className="pt-10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm"
            style={{ color: "#1B4F8A" }}
          >
            ← Terug naar het vergelijk
          </Link>
        </div>

        {/* Page hero */}
        <div className="pb-8 border-b border-[#E5E7EB] mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded"
              style={{ backgroundColor: "#F0F4F8", color: "#1B4F8A" }}
            >
              Veelgestelde vragen
            </span>
            <span className="text-xs" style={{ color: "#6B7280" }}>
              Bijgewerkt februari 2026
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair, Playfair Display, serif)",
              color: "#1A1A1A",
            }}
          >
            Veelgestelde vragen over rioolservice
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>
            Antwoorden op de meest gezochte vragen over rioolontstopping,
            rioolinspectie, kosten en het kiezen van een betrouwbaar
            rioolbedrijf.
          </p>
        </div>

        {/* Anchor navigation */}
        <nav
          className="mb-10 flex flex-wrap gap-2"
          aria-label="Categorieën"
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-block text-sm px-3 py-1.5 rounded-full border transition-colors"
              style={{
                borderColor: "#D1DCE8",
                color: "#1B4F8A",
                backgroundColor: "#F0F4F8",
                textDecoration: "none",
              }}
            >
              {cat.label}
            </a>
          ))}
        </nav>

        {/* FAQ content */}
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <SiteFooter />
      </main>
    </>
  );
}
