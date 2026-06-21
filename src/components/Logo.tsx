"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Reusable logo component with dark/light variants.
 *
 * - variant="light" → for dark backgrounds (hero, footer). Shows logo as-is if it's light,
 *   or applies CSS invert+brightness filter to make a dark logo visible on dark bg.
 * - variant="dark" → for light backgrounds (header scrolled). Shows logo as-is if dark,
 *   or removes filters.
 *
 * Place your logo PNG at: public/images/logo.png
 * Recommended: transparent background, ~400px wide minimum.
 */
export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    // Fallback: text-based logo (same as original Header/Footer)
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            variant === "light"
              ? "bg-celeste-neon/20 border border-celeste-neon/30"
              : "bg-celeste"
          }`}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3C12 3 7 10 7 14a5 5 0 0010 0c0-4-5-11-5-11z"
            />
          </svg>
        </div>
        <div>
          <span
            className={`font-heading font-bold text-lg leading-none block ${
              variant === "light" ? "text-white" : "text-azul"
            }`}
          >
            Almac&eacute;n
          </span>
          <span
            className={`font-heading text-xs font-semibold leading-none ${
              variant === "light" ? "text-celeste-glow" : "text-celeste"
            }`}
          >
            de Agua
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={variant === "dark" ? "/images/logo-navy.png" : "/images/logo.png"}
      alt="Almacén de Agua"
      width={190}
      height={60}
      className={`object-contain transition-all duration-300 ${
        variant === "light" ? "brightness-0 invert" : ""
      } ${className}`}
      onError={() => setError(true)}
      draggable={false}
      priority
    />
  );
}
