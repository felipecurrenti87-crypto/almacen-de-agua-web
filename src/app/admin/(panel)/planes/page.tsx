import Link from "next/link";
import { getAllPlans } from "@/lib/db/plans";
import { formatPrice } from "@/data/products";
import { deletePlanAction } from "../../actions";
import ConfirmDeleteButton from "../../ConfirmDeleteButton";

export default async function AdminPlanesPage() {
  const plans = await getAllPlans();
  const hogar = plans.filter((p) => p.tipo === "hogar");
  const comercio = plans.filter((p) => p.tipo === "comercio");

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl mb-1">Planes</h1>
          <p className="font-body text-sm text-[#52647A]">
            {plans.length} plan{plans.length === 1 ? "" : "es"} totales.
          </p>
        </div>
        <Link
          href="/admin/planes/nuevo"
          className="bg-[#1C3055] hover:bg-[#16264a] text-white font-heading font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          + Nuevo plan
        </Link>
      </div>

      <PlanTable title="Hogar" plans={hogar} />
      <div className="h-6" />
      <PlanTable title="Comercio" plans={comercio} />
    </div>
  );
}

function PlanTable({
  title,
  plans,
}: {
  title: string;
  plans: Awaited<ReturnType<typeof getAllPlans>>;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm overflow-hidden">
      <h2 className="font-heading font-bold text-lg px-4 py-3 bg-[#EEF5F8] border-b border-[#BBD6E1]/40">
        {title}
      </h2>
      <table className="w-full text-sm">
        <thead className="bg-[#F4F7FA] text-[#52647A]">
          <tr>
            <th className="text-left px-4 py-2.5 font-heading font-semibold">Nombre</th>
            <th className="text-right px-4 py-2.5 font-heading font-semibold">Precio/mes</th>
            <th className="text-left px-4 py-2.5 font-heading font-semibold hidden md:table-cell">Tag</th>
            <th className="text-right px-4 py-2.5 font-heading font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p.id} className="border-t border-[#EEF5F8]">
              <td className="px-4 py-3">
                <Link
                  href={`/admin/planes/${p.id}`}
                  className="font-heading font-semibold text-[#1C3055] hover:text-[#639BB6]"
                >
                  {p.nombre}
                </Link>
                {p.destacado && (
                  <span className="ml-2 text-xs font-body text-[#639BB6]">★ destacado</span>
                )}
              </td>
              <td className="px-4 py-3 text-right font-body font-semibold">
                {formatPrice(p.precio)}
              </td>
              <td className="px-4 py-3 text-[#52647A] hidden md:table-cell">
                {p.tag ?? "—"}
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <Link
                  href={`/admin/planes/${p.id}`}
                  className="text-[#639BB6] hover:text-[#1C3055] font-heading font-semibold text-sm mr-3"
                >
                  Editar
                </Link>
                <form action={deletePlanAction} className="inline">
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmDeleteButton message={`¿Eliminar el plan "${p.nombre}"?`}>
                    Eliminar
                  </ConfirmDeleteButton>
                </form>
              </td>
            </tr>
          ))}
          {plans.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-[#52647A]">
                Sin planes en esta categoria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
