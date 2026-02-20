import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

interface Section {
  type: "prose" | "company" | "comparison" | "verdict";
  content: string;
}

// Icons to prepend to criteria labels inside table cells.
// Matches both plain <td>Label</td> and <td><strong>Label</strong></td>.
const CRITERIA_ICONS: Array<[RegExp, string]> = [
  [/(<td(?:[^>]*)>)(<strong>)?Klanttevredenheid(<\/strong>)?(<\/td>)/g,       "$1$2⭐ Klanttevredenheid$3$4"],
  [/(<td(?:[^>]*)>)(<strong>)?Responstijd (?:&amp;|&#x26;) beschikbaarheid(<\/strong>)?(<\/td>)/g, "$1$2📞 Responstijd &#x26; beschikbaarheid$3$4"],
  [/(<td(?:[^>]*)>)(<strong>)?Transparantie(<\/strong>)?(<\/td>)/g,           "$1$2💡 Transparantie$3$4"],
  [/(<td(?:[^>]*)>)(<strong>)?Betrouwbaarheid(<\/strong>)?(<\/td>)/g,         "$1$2🛡️ Betrouwbaarheid$3$4"],
  [/(<td(?:[^>]*)>)(<strong>)?Servicebreedte(<\/strong>)?(<\/td>)/g,          "$1$2🔧 Servicebreedte$3$4"],
  [/(<td(?:[^>]*)>)(<strong>)?Communicatie(<\/strong>)?(<\/td>)/g,            "$1$2💬 Communicatie$3$4"],
  [/(<td(?:[^>]*)>)(<strong>)?Naamsbekendheid (?:&amp;|&#x26;) schaal(<\/strong>)?(<\/td>)/g, "$1$2🏆 Naamsbekendheid &#x26; schaal$3$4"],
  [/(<td(?:[^>]*)>)(<strong>)?Totaalscore(<\/strong>)?(<\/td>)/g,             "$1$2🎯 Totaalscore$3$4"],
];

async function mdToHtml(md: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(md);
  let html = result.toString();

  // Wrap all tables in a scrollable container
  html = html
    .replace(/<table>/g, '<div class="table-wrapper"><table>')
    .replace(/<\/table>/g, "</table></div>");

  // Inject icons into criteria cells
  for (const [pattern, replacement] of CRITERIA_ICONS) {
    html = html.replace(pattern, replacement);
  }

  return html;
}

/**
 * Splits the flat markdown article into typed sections.
 *
 * Article structure (separated by \n---\n):
 * - Some chunks start with "### N. CompanyName" → company block
 * - Some chunks have a "## De aanbieders" intro followed by the first company → split them
 * - Chunk starting with "## Overzichtstabel" → comparison block
 * - Chunk starting with "## Eindoordeel" → verdict block
 * - Everything else → prose
 */
function splitSections(markdown: string): Section[] {
  const sections: Section[] = [];
  // Normalise line endings (\r\n → \n) before splitting
  const normalised = markdown.replace(/\r\n/g, "\n");
  const chunks = normalised.split(/\n---\n/);

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;

    // Comparison / overzicht table section
    if (/^## Overzichtstabel/i.test(trimmed)) {
      sections.push({ type: "comparison", content: trimmed });
      continue;
    }

    // Verdict / eindoordeel section
    if (/^## Eindoordeel/i.test(trimmed)) {
      sections.push({ type: "verdict", content: trimmed });
      continue;
    }

    // Pure company section: starts directly with "### N. CompanyName"
    if (/^### \d+[.–—]/.test(trimmed)) {
      sections.push({ type: "company", content: trimmed });
      continue;
    }

    // Mixed chunk: intro heading followed by company section
    // e.g. "## De aanbieders vergeleken\n\n### 1. RRS..."
    const mixedMatch = trimmed.match(/^([\s\S]*?)\n(### \d+[.–—][\s\S]*)$/);
    if (mixedMatch) {
      const before = mixedMatch[1].trim();
      const companyPart = mixedMatch[2].trim();
      if (before) {
        sections.push({ type: "prose", content: before });
      }
      sections.push({ type: "company", content: companyPart });
      continue;
    }

    sections.push({ type: "prose", content: trimmed });
  }

  return sections;
}

export default async function Article({ content }: { content: string }) {
  const sections = splitSections(content);

  const rendered = await Promise.all(
    sections.map(async (section) => {
      let html = await mdToHtml(section.content);

      // Mark comparison table for sticky-column CSS class
      if (section.type === "comparison") {
        html = html.replace(
          /<div class="table-wrapper"><table>/,
          '<div class="table-wrapper"><table class="comparison-table">'
        );
      }

      return { type: section.type, html };
    })
  );

  return (
    <article>
      {rendered.map((section, idx) => {
        if (section.type === "company") {
          return (
            <div
              key={idx}
              className="company-block article-prose"
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
          );
        }

        if (section.type === "comparison") {
          return (
            <div key={idx} className="article-prose comparison-breakout">
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </div>
          );
        }

        if (section.type === "verdict") {
          return (
            <div
              key={idx}
              className="verdict-block article-prose"
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
          );
        }

        return (
          <div
            key={idx}
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        );
      })}
    </article>
  );
}
