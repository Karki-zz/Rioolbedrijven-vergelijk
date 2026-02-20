interface Company {
  id: string;
  name: string;
  rank: number;
  scores: Array<{ label: string; score: number }>;
  overall: number;
}

interface ComparisonTableProps {
  companies: Company[];
}

function MiniStars({ score }: { score: number }) {
  return (
    <span className="flex items-center gap-0.5 justify-center" aria-label={`${score} sterren`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = score >= i + 1;
        const half = !filled && score >= i + 0.5;
        return (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`hg-${i}`}>
                    <stop offset="50%" stopColor="#F5A623" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#hg-${i})`}
                />
              </>
            ) : (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={filled ? "#F5A623" : "#D1D5DB"}
              />
            )}
          </svg>
        );
      })}
    </span>
  );
}

export default function ComparisonTable({ companies }: ComparisonTableProps) {
  const criteria = companies[0]?.scores.map((s) => s.label) ?? [];
  const sorted = [...companies].sort((a, b) => a.rank - b.rank);

  return (
    <div className="my-8">
      <div className="overflow-x-auto table-scroll rounded-lg border border-[#E5E7EB]">
        <table className="min-w-[600px] w-full text-sm border-collapse">
          <thead>
            <tr style={{ backgroundColor: "#F0F4F8" }}>
              <th
                className="text-left px-4 py-3 font-semibold text-[#1A1A1A] whitespace-nowrap sticky left-0 z-10 border-r border-[#E5E7EB]"
                style={{ backgroundColor: "#F0F4F8" }}
              >
                Criterium
              </th>
              {sorted.map((company) => (
                <th
                  key={company.id}
                  className="text-center px-4 py-3 font-semibold text-[#1A1A1A] whitespace-nowrap min-w-[120px]"
                >
                  <span className="block text-xs font-medium text-[#6B7280] mb-0.5">
                    #{company.rank}
                  </span>
                  {company.name.split(" — ")[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((label, rowIdx) => (
              <tr
                key={label}
                className="border-t border-[#E5E7EB]"
                style={{ backgroundColor: rowIdx % 2 === 0 ? "#ffffff" : "#FAFAF8" }}
              >
                <td
                  className="px-4 py-3 text-[#1A1A1A] whitespace-nowrap font-medium sticky left-0 z-10 border-r border-[#E5E7EB]"
                  style={{ backgroundColor: rowIdx % 2 === 0 ? "#ffffff" : "#FAFAF8" }}
                >
                  {label}
                </td>
                {sorted.map((company) => {
                  const scoreRow = company.scores.find((s) => s.label === label);
                  const score = scoreRow?.score ?? 0;
                  return (
                    <td key={company.id} className="px-4 py-3 text-center">
                      <span
                        className="block font-semibold text-sm mb-1"
                        style={{ color: "#1B4F8A" }}
                      >
                        {score.toFixed(1)}
                      </span>
                      <MiniStars score={score} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[#1B4F8A]" style={{ backgroundColor: "#F0F4F8" }}>
              <td
                className="px-4 py-3 font-bold text-[#1A1A1A] sticky left-0 z-10 border-r border-[#E5E7EB]"
                style={{ backgroundColor: "#F0F4F8" }}
              >
                Eindscore
              </td>
              {sorted.map((company) => (
                <td key={company.id} className="px-4 py-3 text-center">
                  <span
                    className="block font-bold text-base"
                    style={{ color: "#1B4F8A" }}
                  >
                    {company.overall.toFixed(1)}/5
                  </span>
                  <MiniStars score={company.overall} />
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="text-xs text-[#6B7280] mt-2 text-center">
        Scroll horizontaal voor alle scores · Gesorteerd op eindoordeel
      </p>
    </div>
  );
}
