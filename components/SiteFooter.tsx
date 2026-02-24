import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-[#E5E7EB]">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
          <strong style={{ color: "#6B7280" }}>Disclaimer:</strong>{" "}
          RioolPlatform.nl is een onafhankelijk redactioneel platform. De
          informatie is opgesteld op basis van publiek beschikbare reviews,
          gepubliceerde tarieven en website-analyse. Bedrijfsscores kunnen zijn
          gewijzigd. Externe links openen in een nieuw tabblad.
        </p>
        <nav className="flex gap-4 text-xs shrink-0" style={{ color: "#6B7280" }}>
          <Link href="/" style={{ color: "#1B4F8A" }}>
            Vergelijk
          </Link>
          <Link href="/over" style={{ color: "#1B4F8A" }}>
            Over dit onderzoek
          </Link>
        </nav>
      </div>
    </footer>
  );
}
