import Link from "next/link";
import AdminLogoutButton from "../AdminLogoutButton";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F7FA] text-[#1C3055]">
      <div className="flex min-h-screen">
        <aside className="hidden md:flex flex-col w-64 bg-[#1C3055] text-white shrink-0">
          <div className="px-6 py-7 border-b border-white/10">
            <Link href="/admin" className="block">
              <p className="font-heading font-bold text-lg leading-tight">
                Almacen de Agua
              </p>
              <p className="font-body text-xs text-[#BBD6E1] mt-1">
                Panel de administracion
              </p>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            <AdminNavLink href="/admin">Inicio</AdminNavLink>
            <AdminNavLink href="/admin/productos">Productos</AdminNavLink>
            <AdminNavLink href="/admin/planes">Planes</AdminNavLink>
          </nav>

          <div className="p-3 border-t border-white/10 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg text-sm font-body text-[#BBD6E1] hover:bg-white/5 transition-colors"
            >
              ← Volver al sitio
            </Link>
            <AdminLogoutButton />
          </div>
        </aside>

        <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#1C3055] text-white">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/admin" className="font-heading font-bold">
              Admin
            </Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/admin/productos" className="text-[#BBD6E1] hover:text-white">
                Productos
              </Link>
              <Link href="/admin/planes" className="text-[#BBD6E1] hover:text-white">
                Planes
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 md:p-8 p-4 pt-16 md:pt-8 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2.5 rounded-lg font-heading font-semibold text-sm hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  );
}
