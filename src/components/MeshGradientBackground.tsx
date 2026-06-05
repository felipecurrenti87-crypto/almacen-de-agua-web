"use client";

import { useRef, useEffect, useCallback } from "react";

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

  useEffect(() => {
    if (!interactive || !glowRef.current) return;

    let currentX = 0.5;
    let currentY = 0.5;

    const animate = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX * 100 - 50}%, ${currentY * 100 - 50}%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive, handleMouseMove]);

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
      {/* Blob 1 — Navy, largest */}
      <div
        className={`mesh-blob mesh-blob-1 absolute rounded-full ${opacityMap[intensity]}`}
        style={{
          width: "55%",
          height: "65%",
          top: "-10%",
          left: "-10%",
          background: "#16334A",
        }}
      />

      {/* Blob 2 — Mid blue, right */}
      <div
        className={`mesh-blob mesh-blob-2 absolute rounded-full ${opacityMap[intensity]}`}
        style={{
          width: "50%",
          height: "60%",
          top: "15%",
          right: "-15%",
          background: "#3D87A8",
        }}
      />

      {/* Blob 3 — Celeste bright */}
      <div
        className={`mesh-blob mesh-blob-3 absolute rounded-full hidden sm:block`}
        style={{
          width: "45%",
          height: "55%",
          bottom: "-15%",
          left: "15%",
          background: "#5BCBF5",
          opacity: intensity === "intense" ? 0.5 : intensity === "normal" ? 0.4 : 0.3,
        }}
      />

      {/* Blob 4 — Accent, center */}
      <div
        className={`mesh-blob mesh-blob-4 absolute rounded-full hidden sm:block`}
        style={{
          width: "40%",
          height: "50%",
          top: "35%",
          left: "25%",
          background: "#06A4DD",
          opacity: intensity === "intense" ? 0.4 : intensity === "normal" ? 0.3 : 0.2,
        }}
      />

      {/* Interactive mouse glow — only when interactive=true */}
      {interactive && (
        <div
          ref={glowRef}
          className="absolute rounded-full"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: "600px",
            maxHeight: "600px",
            top: "0",
            left: "0",
            background: "radial-gradient(circle, rgba(6,164,221,0.25) 0%, rgba(91,203,245,0.10) 40%, transparent 70%)",
            filter: "blur(40px)",
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
