"use client";

/**
 * MeshGradientBackground — Animated mesh gradient with organic blobs.
 *
 * Props:
 *   intensity?: "subtle" | "normal" | "intense" (default: "normal")
 *   className?: string — extra classes for the container
 *
 * Usage:
 *   <section className="relative">
 *     <MeshGradientBackground />
 *     <div className="relative z-10">...content...</div>
 *   </section>
 *
 * Performance:
 *   - Animations use only transform + opacity (GPU composited)
 *   - will-change applied per blob
 *   - Mobile: fewer blobs, lower blur, reduced opacity
 *   - prefers-reduced-motion: static blobs, no animation
 */

export default function MeshGradientBackground({
  intensity = "normal",
  className = "",
}: {
  intensity?: "subtle" | "normal" | "intense";
  className?: string;
}) {
  const opacityMap = {
    subtle: "opacity-30",
    normal: "opacity-50",
    intense: "opacity-60",
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden
    >
      {/* Blob 1 — Navy, largest, slow drift */}
      <div
        className={`mesh-blob mesh-blob-1 absolute rounded-full ${opacityMap[intensity]}`}
        style={{
          width: "50%",
          height: "60%",
          top: "-10%",
          left: "-10%",
          background: "#16334A",
        }}
      />

      {/* Blob 2 — Mid blue, right side */}
      <div
        className={`mesh-blob mesh-blob-2 absolute rounded-full ${opacityMap[intensity]}`}
        style={{
          width: "45%",
          height: "55%",
          top: "20%",
          right: "-10%",
          background: "#3D87A8",
        }}
      />

      {/* Blob 3 — Celeste bright, bottom (hidden on mobile for perf) */}
      <div
        className={`mesh-blob mesh-blob-3 absolute rounded-full hidden sm:block`}
        style={{
          width: "40%",
          height: "50%",
          bottom: "-15%",
          left: "20%",
          background: "#5BCBF5",
          opacity: intensity === "intense" ? 0.5 : 0.4,
        }}
      />

      {/* Blob 4 — Accent blue, center (hidden on mobile for perf) */}
      <div
        className={`mesh-blob mesh-blob-4 absolute rounded-full hidden sm:block`}
        style={{
          width: "35%",
          height: "45%",
          top: "40%",
          left: "30%",
          background: "#06A4DD",
          opacity: intensity === "intense" ? 0.4 : 0.3,
        }}
      />
    </div>
  );
}
