import Link from "next/link";

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-[#E5E7EB]"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 tracking-tight shrink-0"
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

        <nav className="flex items-center gap-5 text-sm" style={{ color: "#6B7280" }}>
          <Link
            href="/"
            className="hover:text-[#1B4F8A] transition-colors"
            style={{ color: "#6B7280" }}
          >
            Vergelijk
          </Link>
          <Link
            href="/over"
            className="hover:text-[#1B4F8A] transition-colors"
            style={{ color: "#6B7280" }}
          >
            Over dit onderzoek
          </Link>
        </nav>
      </div>
    </header>
  );
}
