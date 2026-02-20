import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <p
        className="text-6xl font-bold mb-4"
        style={{
          fontFamily: "var(--font-playfair, Playfair Display, serif)",
          color: "#1B4F8A",
        }}
      >
        404
      </p>
      <h1
        className="text-2xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-playfair, Playfair Display, serif)",
          color: "#1A1A1A",
        }}
      >
        Pagina niet gevonden
      </h1>
      <p className="text-base mb-8 max-w-md" style={{ color: "#6B7280" }}>
        De pagina die je zoekt bestaat niet of is verplaatst. Ga terug naar het
        vergelijkingsartikel.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm text-white transition-colors"
        style={{ backgroundColor: "#1B4F8A" }}
      >
        ← Naar de homepage
      </Link>
    </div>
  );
}
