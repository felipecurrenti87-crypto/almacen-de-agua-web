import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // Layout vacio: el sidebar del panel vive en (panel)/layout.tsx,
  // asi la pagina /admin/login queda limpia.
  return <>{children}</>;
}
