"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm" style={{ color: "#6B7280" }}>
          <Link href="/" className="hover:text-[#1B4F8A] transition-colors" style={{ color: "#6B7280" }}>
            Vergelijk
          </Link>
          <Link href="/faq" className="hover:text-[#1B4F8A] transition-colors" style={{ color: "#6B7280" }}>
            FAQ
          </Link>
          <Link href="/over" className="hover:text-[#1B4F8A] transition-colors" style={{ color: "#6B7280" }}>
            Over dit onderzoek
          </Link>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu openen"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#6B7280",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#6B7280",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#6B7280",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="sm:hidden border-t border-[#E5E7EB] px-4 py-3 flex flex-col gap-3 text-sm"
          style={{ backgroundColor: "#FAFAF8", color: "#6B7280" }}
        >
          <Link
            href="/"
            className="hover:text-[#1B4F8A] transition-colors py-1"
            style={{ color: "#6B7280" }}
            onClick={() => setMenuOpen(false)}
          >
            Vergelijk
          </Link>
          <Link
            href="/faq"
            className="hover:text-[#1B4F8A] transition-colors py-1"
            style={{ color: "#6B7280" }}
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/over"
            className="hover:text-[#1B4F8A] transition-colors py-1"
            style={{ color: "#6B7280" }}
            onClick={() => setMenuOpen(false)}
          >
            Over dit onderzoek
          </Link>
        </div>
      )}
    </header>
  );
}
