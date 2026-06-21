"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Product } from "@/data/products";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductInput,
} from "@/lib/db/products";
import {
  createPlan,
  updatePlan,
  deletePlan,
  type PlanInput,
} from "@/lib/db/plans";

/* ───────── helpers ───────── */

function s(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function sOrNull(formData: FormData, key: string): string | undefined {
  const v = s(formData, key);
  return v.length > 0 ? v : undefined;
}

function n(formData: FormData, key: string): number {
  const v = s(formData, key);
  const parsed = Number(v);
  return Number.isFinite(parsed) ? parsed : 0;
}

function lines(formData: FormData, key: string): string[] {
  return s(formData, key)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function buildSpecs(formData: FormData): Product["specs"] {
  const voltaje = sOrNull(formData, "specs.voltaje");
  const potenciaCalentamiento = sOrNull(formData, "specs.potenciaCalentamiento");
  const capacidadCaliente = sOrNull(formData, "specs.capacidadCaliente");
  const potenciaEnfriamiento = sOrNull(formData, "specs.potenciaEnfriamiento");
  const capacidadFria = sOrNull(formData, "specs.capacidadFria");
  const dimensiones = sOrNull(formData, "specs.dimensiones");
  const temperaturas = lines(formData, "specs.temperaturas");
  const extras = lines(formData, "specs.extras");

  const out: NonNullable<Product["specs"]> = {};
  if (voltaje) out.voltaje = voltaje;
  if (potenciaCalentamiento) out.potenciaCalentamiento = potenciaCalentamiento;
  if (capacidadCaliente) out.capacidadCaliente = capacidadCaliente;
  if (potenciaEnfriamiento) out.potenciaEnfriamiento = potenciaEnfriamiento;
  if (capacidadFria) out.capacidadFria = capacidadFria;
  if (dimensiones) out.dimensiones = dimensiones;
  if (temperaturas.length) out.temperaturas = temperaturas;
  if (extras.length) out.extras = extras;

  return Object.keys(out).length > 0 ? out : undefined;
}

function buildProductInput(formData: FormData): ProductInput {
  const conexionRaw = s(formData, "conexion");
  const conexion =
    conexionRaw === "bidon" || conexionRaw === "red" || conexionRaw === "natural"
      ? conexionRaw
      : undefined;
  const beneficios = lines(formData, "beneficios");
  return {
    id: s(formData, "id"),
    nombre: s(formData, "nombre"),
    descripcion: s(formData, "descripcion"),
    precio_tienda: n(formData, "precio_tienda"),
    precio_reparto: n(formData, "precio_reparto"),
    imagen: s(formData, "imagen"),
    categoria: s(formData, "categoria"),
    conexion,
    specs: buildSpecs(formData),
    beneficios: beneficios.length ? beneficios : undefined,
    orden: n(formData, "orden"),
  };
}

function buildPlanInput(formData: FormData): PlanInput {
  const tipoRaw = s(formData, "tipo");
  const tipo: "hogar" | "comercio" = tipoRaw === "comercio" ? "comercio" : "hogar";
  const precioTiendaRaw = s(formData, "precioTienda");
  const precioTienda = precioTiendaRaw.length > 0 ? Number(precioTiendaRaw) : undefined;

  return {
    tipo,
    nombre: s(formData, "nombre"),
    precio: n(formData, "precio"),
    precioTienda: Number.isFinite(precioTienda) ? precioTienda : undefined,
    descripcion: s(formData, "descripcion"),
    detalles: lines(formData, "detalles"),
    destacado: s(formData, "destacado") === "on",
    tag: sOrNull(formData, "tag"),
    orden: n(formData, "orden"),
  };
}

function revalidatePublic() {
  // Las paginas publicas que leen de la DB
  revalidatePath("/tienda");
  revalidatePath("/tienda/[id]", "page");
  revalidatePath("/planes");
}

/* ───────── productos ───────── */

export async function createProductAction(formData: FormData) {
  const input = buildProductInput(formData);
  if (!input.id || !input.nombre) {
    throw new Error("Faltan campos requeridos (id y nombre).");
  }
  await createProduct(input);
  revalidatePublic();
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function updateProductAction(id: string, formData: FormData) {
  const input = buildProductInput(formData);
  await updateProduct(id, {
    nombre: input.nombre,
    descripcion: input.descripcion,
    precio_tienda: input.precio_tienda,
    precio_reparto: input.precio_reparto,
    imagen: input.imagen,
    categoria: input.categoria,
    conexion: input.conexion,
    specs: input.specs,
    beneficios: input.beneficios,
    orden: input.orden,
  });
  revalidatePublic();
  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${id}`);
  redirect("/admin/productos");
}

export async function deleteProductAction(formData: FormData) {
  const id = s(formData, "id");
  if (!id) throw new Error("id requerido");
  await deleteProduct(id);
  revalidatePublic();
  revalidatePath("/admin/productos");
}

/* ───────── planes ───────── */

export async function createPlanAction(formData: FormData) {
  const input = buildPlanInput(formData);
  if (!input.nombre) {
    throw new Error("Falta el nombre del plan.");
  }
  await createPlan(input);
  revalidatePublic();
  revalidatePath("/admin/planes");
  redirect("/admin/planes");
}

export async function updatePlanAction(id: number, formData: FormData) {
  const input = buildPlanInput(formData);
  await updatePlan(id, input);
  revalidatePublic();
  revalidatePath("/admin/planes");
  revalidatePath(`/admin/planes/${id}`);
  redirect("/admin/planes");
}

export async function deletePlanAction(formData: FormData) {
  const id = Number(s(formData, "id"));
  if (!Number.isFinite(id)) throw new Error("id invalido");
  await deletePlan(id);
  revalidatePublic();
  revalidatePath("/admin/planes");
}
