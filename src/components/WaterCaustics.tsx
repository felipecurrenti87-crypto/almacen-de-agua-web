// ─── WaterCaustics ─────────────────────────────────────────
// Reflejos de agua tipo cáusticas: dos capas de turbulencia SVG tintadas en
// azul de marca, que derivan lento. El patrón se calcula una sola vez (filtro
// estático); solo se anima la transformación CSS (GPU), así que es liviano.
// Se desactiva solo con prefers-reduced-motion (regla global en globals.css).

export default function WaterCaustics({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Capa 1 — cáusticas azul-medio */}
      <svg
        className="caustics-drift-a absolute -inset-[30%] w-[160%] h-[160%]"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="caustic-a" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.019" numOctaves="2" seed="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.39
                    0 0 0 0 0.61
                    0 0 0 0 0.71
                    0 0 0 5 -2.7"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#caustic-a)" />
      </svg>

      {/* Capa 2 — cáusticas azul-claro, más finas y a otra velocidad */}
      <svg
        className="caustics-drift-b absolute -inset-[35%] w-[170%] h-[170%]"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="caustic-b" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.026 0.03" numOctaves="2" seed="11" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.73
                    0 0 0 0 0.84
                    0 0 0 0 0.92
                    0 0 0 4.2 -2.3"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#caustic-b)" />
      </svg>
    </div>
  );
}
