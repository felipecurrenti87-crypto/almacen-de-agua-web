// ─── MeshGradientBackground (light) ────────────────────────
// Fondo claro, estático y liviano (marca Almacén de Agua).
// Reemplaza la versión anterior de blobs oscuros animados.
// Mantiene la firma de props (intensity, className, interactive)
// para no romper los llamados existentes; ya no anima ni escucha mouse.

export default function MeshGradientBackground({
  intensity = "normal",
  className = "",
}: {
  intensity?: "subtle" | "normal" | "intense";
  className?: string;
  interactive?: boolean;
}) {
  const opacityMap = {
    subtle: 0.5,
    normal: 0.7,
    intense: 0.9,
  } as const;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden
      style={{ opacity: opacityMap[intensity] }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 60% at 18% 12%, rgba(187,214,225,0.55) 0%, transparent 60%),
            radial-gradient(55% 55% at 85% 20%, rgba(99,155,182,0.18) 0%, transparent 60%),
            radial-gradient(60% 60% at 75% 88%, rgba(187,214,225,0.45) 0%, transparent 60%),
            linear-gradient(180deg, #FFFFFF 0%, #F4F9FB 100%)
          `,
        }}
      />
    </div>
  );
}
