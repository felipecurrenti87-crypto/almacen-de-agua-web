import Link from "next/link";
import { getAllProducts } from "@/lib/db/products";
import { formatPrice } from "@/data/products";
import { deleteProductAction } from "../../actions";
import ConfirmDeleteButton from "../../ConfirmDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl mb-1">Productos</h1>
          <p className="font-body text-sm text-[#52647A]">
            {products.length} producto{products.length === 1 ? "" : "s"} en la tienda.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-[#1C3055] hover:bg-[#16264a] text-white font-heading font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#EEF5F8] text-[#52647A]">
            <tr>
              <th className="text-left px-4 py-3 font-heading font-semibold">Nombre</th>
              <th className="text-left px-4 py-3 font-heading font-semibold hidden md:table-cell">Categoria</th>
              <th className="text-right px-4 py-3 font-heading font-semibold">Tienda</th>
              <th className="text-right px-4 py-3 font-heading font-semibold hidden md:table-cell">Reparto</th>
              <th className="text-right px-4 py-3 font-heading font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-[#EEF5F8]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/productos/${p.id}`}
                    className="font-heading font-semibold text-[#1C3055] hover:text-[#639BB6]"
                  >
                    {p.nombre}
                  </Link>
                  <p className="font-body text-xs text-[#52647A] mt-0.5 md:hidden">
                    {p.categoria}
                  </p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="inline-block bg-[#EEF5F8] text-[#52647A] text-xs font-body px-2 py-0.5 rounded">
                    {p.categoria}
                    {p.conexion ? ` · ${p.conexion}` : ""}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-body font-semibold">
                  {formatPrice(p.precio_tienda)}
                </td>
                <td className="px-4 py-3 text-right font-body text-[#52647A] hidden md:table-cell">
                  {formatPrice(p.precio_reparto)}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/productos/${p.id}`}
                    className="text-[#639BB6] hover:text-[#1C3055] font-heading font-semibold text-sm mr-3"
                  >
                    Editar
                  </Link>
                  <form action={deleteProductAction} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <ConfirmDeleteButton message={`¿Eliminar "${p.nombre}"?`}>
                      Eliminar
                    </ConfirmDeleteButton>
                  </form>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[#52647A]">
                  No hay productos. Cargá el primero con &quot;Nuevo producto&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
