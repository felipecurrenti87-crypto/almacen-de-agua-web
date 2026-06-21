import Link from "next/link";
import type { Product } from "@/data/products";

export type ProductFormProps = {
  product?: Product;
  action: (formData: FormData) => void | Promise<void>;
  mode: "create" | "edit";
};

export default function ProductForm({ product, action, mode }: ProductFormProps) {
  const p = product;
  const specs = p?.specs ?? {};

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm p-6 space-y-4">
        <h2 className="font-heading font-bold text-lg">Datos basicos</h2>

        <Field label="ID (slug, sin espacios)" hint="Una vez creado no lo cambies: rompe links viejos.">
          <input
            type="text"
            name="id"
            required
            defaultValue={p?.id ?? ""}
            readOnly={mode === "edit"}
            pattern="[a-z0-9\-]+"
            className={inputCls + (mode === "edit" ? " bg-[#EEF5F8] text-[#52647A]" : "")}
          />
        </Field>

        <Field label="Nombre">
          <input type="text" name="nombre" required defaultValue={p?.nombre ?? ""} className={inputCls} />
        </Field>

        <Field label="Descripcion">
          <textarea
            name="descripcion"
            required
            rows={3}
            defaultValue={p?.descripcion ?? ""}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Precio en tienda (sin puntos, en pesos)">
            <input
              type="number"
              name="precio_tienda"
              required
              min={0}
              defaultValue={p?.precio_tienda ?? 0}
              className={inputCls}
            />
          </Field>
          <Field label="Precio con reparto">
            <input
              type="number"
              name="precio_reparto"
              required
              min={0}
              defaultValue={p?.precio_reparto ?? 0}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Ruta de la imagen" hint="Ej: /images/products/bidon-20l.png. Subi el archivo al repo en /public/images/products/.">
          <input
            type="text"
            name="imagen"
            required
            defaultValue={p?.imagen ?? "/images/products/"}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Categoria">
            <select name="categoria" required defaultValue={p?.categoria ?? "agua"} className={inputCls}>
              <option value="agua">agua</option>
              <option value="dispensers">dispensers</option>
            </select>
          </Field>
          <Field label="Conexion (solo dispensers)">
            <select name="conexion" defaultValue={p?.conexion ?? ""} className={inputCls}>
              <option value="">— sin conexion —</option>
              <option value="bidon">bidon</option>
              <option value="red">red</option>
              <option value="natural">natural</option>
            </select>
          </Field>
        </div>

        <Field label="Orden de aparicion" hint="Numero entero. Menor = aparece antes.">
          <input
            type="number"
            name="orden"
            defaultValue={0}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm p-6 space-y-4">
        <h2 className="font-heading font-bold text-lg">Especificaciones (opcional)</h2>
        <p className="font-body text-xs text-[#52647A] -mt-2">
          Se usan en la pagina de detalle de dispensers. Dejar en blanco lo que no aplica.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Voltaje">
            <input type="text" name="specs.voltaje" defaultValue={specs.voltaje ?? ""} className={inputCls} />
          </Field>
          <Field label="Dimensiones">
            <input type="text" name="specs.dimensiones" defaultValue={specs.dimensiones ?? ""} className={inputCls} />
          </Field>
          <Field label="Potencia calentamiento">
            <input type="text" name="specs.potenciaCalentamiento" defaultValue={specs.potenciaCalentamiento ?? ""} className={inputCls} />
          </Field>
          <Field label="Capacidad caliente">
            <input type="text" name="specs.capacidadCaliente" defaultValue={specs.capacidadCaliente ?? ""} className={inputCls} />
          </Field>
          <Field label="Potencia enfriamiento">
            <input type="text" name="specs.potenciaEnfriamiento" defaultValue={specs.potenciaEnfriamiento ?? ""} className={inputCls} />
          </Field>
          <Field label="Capacidad fria">
            <input type="text" name="specs.capacidadFria" defaultValue={specs.capacidadFria ?? ""} className={inputCls} />
          </Field>
        </div>

        <Field label="Temperaturas (una por linea)">
          <textarea
            name="specs.temperaturas"
            rows={3}
            defaultValue={(specs.temperaturas ?? []).join("\n")}
            className={inputCls}
          />
        </Field>
        <Field label="Extras (uno por linea)">
          <textarea
            name="specs.extras"
            rows={3}
            defaultValue={(specs.extras ?? []).join("\n")}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="bg-white rounded-2xl border border-[#BBD6E1]/40 shadow-sm p-6 space-y-4">
        <h2 className="font-heading font-bold text-lg">Beneficios (opcional)</h2>
        <Field label="Uno por linea">
          <textarea
            name="beneficios"
            rows={5}
            defaultValue={(p?.beneficios ?? []).join("\n")}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-[#1C3055] hover:bg-[#16264a] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          {mode === "create" ? "Crear producto" : "Guardar cambios"}
        </button>
        <Link
          href="/admin/productos"
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
