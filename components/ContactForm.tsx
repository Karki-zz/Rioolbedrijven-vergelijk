"use client";

import { useState } from "react";

// Create a free account at https://formspree.io and set your form ID:
// NEXT_PUBLIC_FORMSPREE_ID=your_form_id in .env.local
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "xbdaqorp";

type Status = "idle" | "sending" | "success" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  fontSize: "0.9375rem",
  color: "#1A1A1A",
  backgroundColor: "#fff",
  outline: "none",
  fontFamily: "inherit",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORM_ID) {
      // Fallback: open mailto if Formspree is not configured
      const form = e.currentTarget;
      const data = new FormData(form);
      const name = data.get("name") as string;
      const email = data.get("email") as string;
      const message = data.get("message") as string;
      window.location.href = `mailto:redactie@rioolplatform.nl?subject=Bericht van ${encodeURIComponent(name)}&body=${encodeURIComponent(`Van: ${name} (${email})\n\n${message}`)}`;
      return;
    }

    setStatus("sending");
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-lg p-6 text-sm"
        style={{ backgroundColor: "#F0F7EE", border: "1px solid #86C38A", color: "#1A1A1A" }}
      >
        <strong>Bericht ontvangen.</strong> We reageren binnen vijf werkdagen.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="cf-name" className="text-sm font-medium" style={{ color: "#374151" }}>
            Naam
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            placeholder="Jan Jansen"
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="cf-email" className="text-sm font-medium" style={{ color: "#374151" }}>
            E-mailadres <span style={{ color: "#9CA3AF" }}>(verplicht)</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="jansen@voorbeeld.nl"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-sm font-medium" style={{ color: "#374151" }}>
          Bericht <span style={{ color: "#9CA3AF" }}>(verplicht)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Stel een vraag, meld een fout of stuur aanvullende informatie..."
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ color: "#B91C1C" }}>
          Er ging iets mis. Probeer het opnieuw of mail naar{" "}
          <a href="mailto:redactie@rioolplatform.nl" style={{ color: "#1B4F8A" }}>
            redactie@rioolplatform.nl
          </a>
          .
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 rounded-md text-sm font-semibold transition-opacity"
          style={{
            backgroundColor: "#1B4F8A",
            color: "#fff",
            opacity: status === "sending" ? 0.6 : 1,
            cursor: status === "sending" ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {status === "sending" ? "Versturen..." : "Verstuur bericht"}
        </button>
      </div>
    </form>
  );
}
