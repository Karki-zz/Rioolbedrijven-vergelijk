import { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "text" | "button";
  label?: string;
}

export default function ExternalLink({
  href,
  children,
  className = "",
  variant = "text",
  label,
}: ExternalLinkProps) {
  const baseClasses =
    variant === "button"
      ? "inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm transition-colors duration-200 bg-[#1B4F8A] text-white hover:bg-[#163f70] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2"
      : "text-[#1B4F8A] underline underline-offset-2 hover:text-[#163f70]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${className}`}
      aria-label={label}
    >
      {children}
      {variant === "button" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </a>
  );
}
