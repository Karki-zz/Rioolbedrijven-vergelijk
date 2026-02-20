import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import Article from "@/components/Article";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "De beste rioolbedrijven in Nederland vergeleken (2026) | RioolPlatform",
  description:
    "Welk rioolbedrijf in Nederland is de beste keuze? Wij vergeleken 5 aanbieders op klanttevredenheid, prijs, betrouwbaarheid en beschikbaarheid. Onafhankelijk onderzoek 2026.",
  alternates: { canonical: "/" },
};

function getArticle() {
  const filePath = path.join(
    process.cwd(),
    "content/articles/rbnl-vergelijkingsartikel.md"
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  return content;
}

export default function HomePage() {
  const content = getArticle();

  return (
    <>
      <ProgressBar />

      {/* Site header */}
      <header
        className="sticky top-0 z-40 border-b border-[#E5E7EB]"
        style={{ backgroundColor: "#FAFAF8" }}
      >
        <div
          className="max-w-[680px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
        >
          <a
            href="/"
            className="flex items-center gap-2.5 tracking-tight"
            style={{
              fontFamily: "var(--font-playfair, Playfair Display, serif)",
              color: "#1B4F8A",
              fontSize: "1.15rem",
              lineHeight: 1,
            }}
          >
            {/* Water drop icon */}
            <svg
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Pipe stub at top */}
              <rect x="8.5" y="0" width="5" height="6" rx="2.5" fill="#1B4F8A" />
              {/* Drop body */}
              <path
                d="M11 5 C8.5 9 2 15.5 2 19 C2 22.9 6.1 26 11 26 C15.9 26 20 22.9 20 19 C20 15.5 13.5 9 11 5Z"
                fill="#1B4F8A"
              />
              {/* Inner highlight — suggests gloss/depth */}
              <ellipse
                cx="7.5"
                cy="17"
                rx="1.3"
                ry="2.2"
                fill="white"
                opacity="0.28"
                transform="rotate(-18 7.5 17)"
              />
            </svg>
            <span>
              <span style={{ fontWeight: 400 }}>riool</span>
              <span style={{ fontWeight: 700 }}>platform</span>
              <span style={{ opacity: 0.5, fontWeight: 400 }}>.nl</span>
            </span>
          </a>
          <span className="text-xs hidden sm:block" style={{ color: "#6B7280" }}>
            Onafhankelijk onderzoek · Februari 2026
          </span>
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-4 sm:px-6 pb-24">
        {/* Article hero / metadata block */}
        <div className="pt-12 pb-8 border-b border-[#E5E7EB] mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded"
              style={{ backgroundColor: "#F0F4F8", color: "#1B4F8A" }}
            >
              Vergelijkingsonderzoek
            </span>
            <span className="text-xs" style={{ color: "#6B7280" }}>
              20 februari 2026 · 10 minuten leestijd
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair, Playfair Display, serif)",
              color: "#1A1A1A",
            }}
          >
            De beste rioolbedrijven in Nederland vergeleken: wie scoort écht?
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>
            Vijf aanbieders getest op klanttevredenheid, prijs, reactietijd en
            garantie — zodat jij bij een verstopping meteen weet wie je moet bellen.
          </p>

          {/* V3: sticky sidebar / CTA block goes here — HTML structure is ready */}
        </div>

        {/* Article body */}
        <Article content={content} />

        {/* Footer disclaimer */}
        <footer className="mt-16 pt-8 border-t border-[#E5E7EB]">
          <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
            <strong style={{ color: "#6B7280" }}>Disclaimer:</strong> RioolPlatform.nl
            is een onafhankelijk redactioneel platform. De informatie op deze pagina is
            opgesteld op basis van publiek beschikbare reviews, gepubliceerde tarieven en
            website-analyse. Bedrijfsscores kunnen zijn gewijzigd. Externe links openen
            in een nieuw tabblad.{" "}
            <a href="/over" style={{ color: "#1B4F8A" }}>
              Meer over ons onderzoek →
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
