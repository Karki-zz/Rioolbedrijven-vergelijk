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
import ContactForm from "@/components/ContactForm";

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
      <SiteHeader />

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
          className="article-prose no-h2-borders"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Contact form */}
        <section className="mt-10 pt-8 border-t border-[#E5E7EB]">
          <h2
            className="text-xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-playfair, Playfair Display, serif)",
              color: "#1A1A1A",
            }}
          >
            Contactformulier
          </h2>
          <ContactForm />
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
