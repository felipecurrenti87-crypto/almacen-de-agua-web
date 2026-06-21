import Link from "next/link";
import { getAllProducts } from "@/lib/db/products";
import { getAllPlans } from "@/lib/db/plans";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [products, plans] = await Promise.all([getAllProducts(), getAllPlans()]);
  const planesHogar = plans.filter((p) => p.tipo === "hogar").length;
  const planesComercio = plans.filter((p) => p.tipo === "comercio").length;

  return (
    <div className="max-w-4xl">
      <h1 className="font-heading font-bold text-3xl mb-2">Inicio</h1>
      <p className="font-body text-[#52647A] mb-8">
        Editar productos, precios y planes desde aca. Los cambios impactan en la web publica al instante.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard
          href="/admin/productos"
          title="Productos"
          count={products.length}
          label={products.length === 1 ? "producto" : "productos"}
        />
        <DashboardCard
          href="/admin/planes"
          title="Planes"
          count={plans.length}
          label={`${planesHogar} hogar / ${planesComercio} comercio`}
        />
      </div>
    </div>
  );
}

function DashboardCard({
  href,
  title,
  count,
  label,
}: {
  href: string;
  title: string;
  count: number;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm p-6 hover:border-[#639BB6] hover:shadow-md transition-all"
    >
      <p className="font-body text-sm text-[#52647A]">{title}</p>
      <p className="font-heading font-bold text-4xl text-[#1C3055] mt-2 mb-1">
        {count}
      </p>
      <p className="font-body text-xs text-[#639BB6]">{label}</p>
    </Link>
  );
}
