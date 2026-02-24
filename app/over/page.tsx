import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over dit onderzoek | RioolPlatform",
  description:
    "Hoe is het vergelijk van rioolbedrijven tot stand gekomen? Lees over de selectiecriteria, bronnen en scoremethodologie.",
  alternates: { canonical: "/over" },
};

async function getContent(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "content/articles/over-dit-onderzoek.md"
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  let html = result.toString();
  html = html
    .replace(/<table>/g, '<div class="table-wrapper"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return html;
}

export default async function OverPage() {
  const html = await getContent();

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-[#E5E7EB]"
        style={{ backgroundColor: "#FAFAF8" }}
      >
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 tracking-tight"
            style={{
              fontFamily: "var(--font-playfair, Playfair Display, serif)",
              color: "#1B4F8A",
              fontSize: "1.15rem",
              lineHeight: 1,
            }}
          >
            <span>
              <span style={{ fontWeight: 400 }}>riool</span>
              <span style={{ fontWeight: 700 }}>platform</span>
              <span style={{ opacity: 0.5, fontWeight: 400 }}>.nl</span>
            </span>
          </Link>
          <span className="text-xs hidden sm:block" style={{ color: "#6B7280" }}>
            Onafhankelijk onderzoek · Februari 2026
          </span>
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-4 sm:px-6 pb-24">
        <div className="pt-10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm"
            style={{ color: "#1B4F8A" }}
          >
            ← Terug naar het vergelijk
          </Link>
        </div>

        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="mt-16 pt-8 border-t border-[#E5E7EB]">
          <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
            <strong style={{ color: "#6B7280" }}>Disclaimer:</strong>{" "}
            RioolPlatform.nl is een onafhankelijk redactioneel platform. De
            informatie op deze pagina is opgesteld op basis van publiek
            beschikbare reviews, gepubliceerde tarieven en website-analyse.
            Bedrijfsscores kunnen zijn gewijzigd.
          </p>
        </footer>
      </main>
    </>
  );
}
