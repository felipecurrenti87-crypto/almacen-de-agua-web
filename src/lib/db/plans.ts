import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { sql } from "./client";

export const PLANS_TAG = "plans";

export type PlanTipo = "hogar" | "comercio";

export interface Plan {
  id: number;
  tipo: PlanTipo;
  nombre: string;
  precio: number;
  precioTienda?: number;
  descripcion: string;
  detalles: string[];
  destacado: boolean;
  tag?: string;
  orden: number;
}

export type PlanInput = Omit<Plan, "id">;

type PlanRow = {
  id: number;
  tipo: PlanTipo;
  nombre: string;
  precio: number;
  precio_tienda: number | null;
  descripcion: string;
  detalles: string[];
  destacado: boolean;
  tag: string | null;
  orden: number;
};

function rowToPlan(r: PlanRow): Plan {
  return {
    id: r.id,
    tipo: r.tipo,
    nombre: r.nombre,
    precio: r.precio,
    precioTienda: r.precio_tienda ?? undefined,
    descripcion: r.descripcion,
    detalles: r.detalles ?? [],
    destacado: r.destacado,
    tag: r.tag ?? undefined,
    orden: r.orden,
  };
}

export const getAllPlans = unstable_cache(
  async (): Promise<Plan[]> => {
    const rows = (await sql`
      SELECT id, tipo, nombre, precio, precio_tienda, descripcion,
             detalles, destacado, tag, orden
      FROM plans
      ORDER BY tipo ASC, orden ASC, id ASC
    `) as PlanRow[];
    return rows.map(rowToPlan);
  },
  ["plans:all"],
  { tags: [PLANS_TAG] },
);

export async function getPlansByTipo(tipo: PlanTipo): Promise<Plan[]> {
  const all = await getAllPlans();
  return all.filter((p) => p.tipo === tipo);
}

export async function getPlanById(id: number): Promise<Plan | null> {
  const all = await getAllPlans();
  return all.find((p) => p.id === id) ?? null;
}

export async function createPlan(input: PlanInput): Promise<void> {
  const maxRow = (await sql`
    SELECT COALESCE(MAX(orden), -1) AS max FROM plans WHERE tipo = ${input.tipo}
  `) as { max: number }[];
  const nextOrden = input.orden ?? (maxRow[0]?.max ?? -1) + 1;

  await sql`
    INSERT INTO plans (
      tipo, nombre, precio, precio_tienda, descripcion,
      detalles, destacado, tag, orden
    ) VALUES (
      ${input.tipo}, ${input.nombre}, ${input.precio}, ${input.precioTienda ?? null},
      ${input.descripcion}, ${JSON.stringify(input.detalles)},
      ${input.destacado}, ${input.tag ?? null}, ${nextOrden}
    )
  `;
  revalidateTag(PLANS_TAG, "max");
}

export async function updatePlan(id: number, input: PlanInput): Promise<void> {
  await sql`
    UPDATE plans SET
      tipo = ${input.tipo},
      nombre = ${input.nombre},
      precio = ${input.precio},
      precio_tienda = ${input.precioTienda ?? null},
      descripcion = ${input.descripcion},
      detalles = ${JSON.stringify(input.detalles)},
      destacado = ${input.destacado},
      tag = ${input.tag ?? null},
      orden = ${input.orden},
      updated_at = now()
    WHERE id = ${id}
  `;
  revalidateTag(PLANS_TAG, "max");
}

export async function deletePlan(id: number): Promise<void> {
  await sql`DELETE FROM plans WHERE id = ${id}`;
  revalidateTag(PLANS_TAG, "max");
}
