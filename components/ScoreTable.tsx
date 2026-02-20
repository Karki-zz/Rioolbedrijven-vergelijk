interface ScoreRow {
  label: string;
  score: number;
}

interface ScoreTableProps {
  scores: ScoreRow[];
  overall: number;
}

function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 >= 0.25 && score % 1 < 0.75;
  const fullForDisplay = hasHalf ? fullStars : score % 1 >= 0.75 ? fullStars + 1 : fullStars;
  const emptyStars = 5 - fullForDisplay - (hasHalf ? 1 : 0);

  return (
    <span className="flex items-center gap-0.5" aria-label={`${score} van 5 sterren`}>
      {Array.from({ length: fullForDisplay }).map((_, i) => (
        <StarFull key={`full-${i}`} />
      ))}
      {hasHalf && <StarHalf />}
      {Array.from({ length: Math.max(0, emptyStars) }).map((_, i) => (
        <StarEmpty key={`empty-${i}`} />
      ))}
    </span>
  );
}

function StarFull() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function StarHalf() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="halfGrad">
          <stop offset="50%" stopColor="#F5A623" />
          <stop offset="50%" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="url(#halfGrad)"
      />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#D1D5DB" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function ScoreTable({ scores, overall }: ScoreTableProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[#E5E7EB]">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "#F0F4F8" }}>
            <th className="text-left px-4 py-2.5 font-semibold text-[#1A1A1A]">Criterium</th>
            <th className="text-left px-4 py-2.5 font-semibold text-[#1A1A1A]">Score</th>
            <th className="text-left px-4 py-2.5 font-semibold text-[#1A1A1A] hidden sm:table-cell">Beoordeling</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((row, idx) => (
            <tr
              key={row.label}
              className="border-t border-[#E5E7EB] transition-colors"
              style={{ backgroundColor: idx % 2 === 0 ? "#ffffff" : "#FAFAF8" }}
            >
              <td className="px-4 py-3 text-[#1A1A1A]">{row.label}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: "#1B4F8A" }}>
                {row.score.toFixed(1)}/5
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <StarRating score={row.score} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-[#1B4F8A]" style={{ backgroundColor: "#F0F4F8" }}>
            <td className="px-4 py-3 font-bold text-[#1A1A1A]">Eindscore</td>
            <td className="px-4 py-3 font-bold text-lg" style={{ color: "#1B4F8A" }}>
              {overall.toFixed(1)}/5
            </td>
            <td className="px-4 py-3 hidden sm:table-cell">
              <StarRating score={overall} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
