"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function MeshGradientBackground({
  intensity = "normal",
  className = "",
  interactive = false,
}: {
  intensity?: "subtle" | "normal" | "intense";
  className?: string;
  interactive?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    },
    [interactive]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const id = ++rippleId.current;
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1600);
    },
    [interactive]
  );

  useEffect(() => {
    if (!interactive || !glowRef.current || !containerRef.current) return;

    let currentX = 0.5;
    let currentY = 0.5;

    const animate = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current && containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;
        const glowSize = Math.min(w * 0.4, 600);
        const px = currentX * w - glowSize / 2;
        const py = currentY * h - glowSize / 2;
        glowRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
    };
  }, [interactive, handleMouseMove, handleClick]);

  const opacityMap = {
    subtle: "opacity-40",
    normal: "opacity-60",
    intense: "opacity-70",
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={interactive ? { pointerEvents: "auto" } : undefined}
      aria-hidden
    >
      {/* Blob 1 */}
      <div
        className={`mesh-blob mesh-blob-1 absolute rounded-full ${opacityMap[intensity]}`}
        style={{ width: "55%", height: "65%", top: "-10%", left: "-10%", background: "#16334A" }}
      />
      {/* Blob 2 */}
      <div
        className={`mesh-blob mesh-blob-2 absolute rounded-full ${opacityMap[intensity]}`}
        style={{ width: "50%", height: "60%", top: "15%", right: "-15%", background: "#3D87A8" }}
      />
      {/* Blob 3 */}
      <div
        className="mesh-blob mesh-blob-3 absolute rounded-full hidden sm:block"
        style={{
          width: "45%", height: "55%", bottom: "-15%", left: "15%", background: "#5BCBF5",
          opacity: intensity === "intense" ? 0.5 : intensity === "normal" ? 0.4 : 0.3,
        }}
      />
      {/* Blob 4 */}
      <div
        className="mesh-blob mesh-blob-4 absolute rounded-full hidden sm:block"
        style={{
          width: "40%", height: "50%", top: "35%", left: "25%", background: "#06A4DD",
          opacity: intensity === "intense" ? 0.4 : intensity === "normal" ? 0.3 : 0.2,
        }}
      />

      {/* Mouse glow — positioned with px, not % */}
      {interactive && (
        <div
          ref={glowRef}
          className="absolute top-0 left-0 rounded-full"
          style={{
            width: "min(40vw, 600px)",
            height: "min(40vw, 600px)",
            background: "radial-gradient(circle, rgba(6,164,221,0.3) 0%, rgba(91,203,245,0.12) 35%, transparent 70%)",
            filter: "blur(30px)",
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Water ripples on click */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute pointer-events-none"
          style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="water-ripple water-ripple-1" />
          <div className="water-ripple water-ripple-2" />
          <div className="water-ripple water-ripple-3" />
        </div>
      ))}
    </div>
  );
}
