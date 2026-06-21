"use client";

import { usePathname } from "next/navigation";

/**
 * Oculta sus children cuando estamos en /admin/*. Sirve para no mostrar
 * Header, Footer, Cart, WhatsApp ni Chat en el panel de administracion.
 */
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
