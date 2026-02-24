import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import Article from "@/components/Article";
import ProgressBar from "@/components/ProgressBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
      <SiteHeader />

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
            De beste rioolbedrijven in Nederland vergeleken: wie scoort écht? (2026)
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>
            Vijf aanbieders getest op klanttevredenheid, prijs, reactietijd en
            garantie, zodat jij bij een verstopping meteen weet wie je moet bellen.
          </p>
        </div>

        {/* Article body */}
        <Article content={content} />

        <SiteFooter />
      </main>
    </>
  );
}
