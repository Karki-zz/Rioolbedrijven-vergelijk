interface RankBadgeProps {
  rank: number;
  size?: "sm" | "md" | "lg";
}

const rankConfig: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: "#F5A623", text: "#fff", label: "Beste keuze" },
  2: { bg: "#6B7280", text: "#fff", label: "Goede keuze" },
  3: { bg: "#9CA3AF", text: "#fff", label: "Redelijke keuze" },
};

const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5",
};

export default function RankBadge({ rank, size = "md" }: RankBadgeProps) {
  const config = rankConfig[rank] ?? { bg: "#D1D5DB", text: "#374151", label: "" };
  const ordinal = `#${rank}`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold tracking-wide ${sizeClasses[size]}`}
      style={{ backgroundColor: config.bg, color: config.text }}
      aria-label={`Rang ${rank}${config.label ? ` — ${config.label}` : ""}`}
    >
      <span>{ordinal}</span>
      {config.label && (
        <>
          <span style={{ opacity: 0.7 }}>·</span>
          <span className="font-medium">{config.label}</span>
        </>
      )}
    </span>
  );
}
