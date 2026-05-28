"use client";

import { useState } from "react";

const placeholders: Record<string, { emoji: string; bg: string }> = {
  agua: { emoji: "💧", bg: "from-blue-100 to-cyan-50" },
  dispensers: { emoji: "🚰", bg: "from-sky-100 to-blue-50" },
};

export default function ProductImage({
  src,
  alt,
  categoria,
}: {
  src: string;
  alt: string;
  categoria: string;
}) {
  const [error, setError] = useState(false);
  const placeholder = placeholders[categoria] || placeholders.agua;

  if (error || !src) {
    return (
      <div
        className={`w-full h-full rounded-2xl bg-gradient-to-br ${placeholder.bg} flex flex-col items-center justify-center gap-2`}
      >
        <span className="text-5xl">{placeholder.emoji}</span>
        <span className="text-xs text-gris-suave font-heading">
          Imagen próximamente
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain drop-shadow-lg"
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
