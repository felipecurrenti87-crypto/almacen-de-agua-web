import Link from "next/link";
import type { Plan } from "@/lib/db/plans";

export type PlanFormProps = {
  plan?: Plan;
  action: (formData: FormData) => void | Promise<void>;
  mode: "create" | "edit";
};

export default function PlanForm({ plan, action, mode }: PlanFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo">
            <select name="tipo" defaultValue={plan?.tipo ?? "hogar"} required className={inputCls}>
              <option value="hogar">hogar</option>
              <option value="comercio">comercio</option>
            </select>
          </Field>
          <Field label="Orden" hint="Menor = aparece antes.">
            <input type="number" name="orden" defaultValue={plan?.orden ?? 0} className={inputCls} />
          </Field>
        </div>

        <Field label="Nombre">
          <input type="text" name="nombre" required defaultValue={plan?.nombre ?? ""} className={inputCls} />
        </Field>

        <Field label="Descripcion">
          <textarea
            name="descripcion"
            required
            rows={3}
            defaultValue={plan?.descripcion ?? ""}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Precio mensual">
            <input type="number" name="precio" required min={0} defaultValue={plan?.precio ?? 0} className={inputCls} />
          </Field>
          <Field label="Precio en tienda (opcional)">
            <input
              type="number"
              name="precioTienda"
              min={0}
              defaultValue={plan?.precioTienda ?? ""}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Tag (opcional)" hint='Ej: "Popular", "Empresas", "Ilimitado".'>
          <input type="text" name="tag" defaultValue={plan?.tag ?? ""} className={inputCls} />
        </Field>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="destacado"
            defaultChecked={plan?.destacado ?? false}
            className="w-4 h-4 accent-[#1C3055]"
          />
          <span className="font-heading text-sm font-semibold text-[#1C3055]">
            Destacar este plan
          </span>
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm p-6 space-y-4">
        <h2 className="font-heading font-bold text-lg">Beneficios del plan</h2>
        <Field label="Detalles (uno por linea)">
          <textarea
            name="detalles"
            rows={6}
            required
            defaultValue={(plan?.detalles ?? []).join("\n")}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-[#1C3055] hover:bg-[#16264a] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          {mode === "create" ? "Crear plan" : "Guardar cambios"}
        </button>
        <Link
          href="/admin/planes"
          className="text-[#52647A] hover:text-[#1C3055] font-heading font-semibold text-sm"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-[#BBD6E1] bg-white text-[#1C3055] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#639BB6]/40 focus:border-[#639BB6]";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-heading text-sm font-semibold text-[#1C3055] mb-1">
        {label}
      </span>
      {children}
      {hint && (
        <span className="block font-body text-xs text-[#52647A] mt-1">{hint}</span>
      )}
    </label>
  );
}
