"use client";

// ─── WaveDivider ───────────────────────────────────────────
// Separador de onda de agua entre secciones, en colores de marca.
// `color`  = relleno de la onda (debe coincidir con el color de la sección
//            destino para que el corte tenga continuidad).
// `double` = onda doble estilo Waiakea (capa trasera translúcida + frontal).
// `backColor` = color de la capa trasera (por defecto, el mismo con opacidad).

interface WaveDividerProps {
  color?: string;
  backColor?: string;
  flip?: boolean;
  double?: boolean;
  className?: string;
}

export default function WaveDivider({
  color = "#FFFFFF",
  backColor,
  flip = false,
  double = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[74px] md:h-[106px]"
      >
        {double && (
          <path
            d="M0,56 C300,118 540,0 780,42 C1020,98 1260,4 1440,38 L1440,120 L0,120 Z"
            fill={backColor || color}
            opacity={0.4}
          />
        )}
        <path
          d="M0,48 C240,120 480,-2 720,56 C960,116 1200,2 1440,50 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
