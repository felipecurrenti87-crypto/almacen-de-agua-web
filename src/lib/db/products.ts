import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { sql } from "./client";
import type { Product, Categoria } from "@/data/products";

export const PRODUCTS_TAG = "products";

/* ───────── Tipos auxiliares ───────── */

export type ProductInput = Omit<Product, "id"> & { id: string; orden?: number };

type ProductRow = {
  id: string;
  nombre: string;
  descripcion: string;
  precio_tienda: number;
  precio_reparto: number;
  imagen: string;
  categoria: string;
  conexion: "bidon" | "red" | "natural" | null;
  specs: Product["specs"] | null;
  beneficios: string[] | null;
  orden: number;
};

function rowToProduct(r: ProductRow): Product {
  return {
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion,
    precio_tienda: r.precio_tienda,
    precio_reparto: r.precio_reparto,
    imagen: r.imagen,
    categoria: r.categoria,
    conexion: r.conexion ?? undefined,
    specs: r.specs ?? undefined,
    beneficios: r.beneficios ?? undefined,
  };
}

/* ───────── Lecturas (cacheadas) ───────── */

export const getAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const rows = (await sql`
      SELECT id, nombre, descripcion, precio_tienda, precio_reparto, imagen,
             categoria, conexion, specs, beneficios, orden
      FROM products
      ORDER BY orden ASC, nombre ASC
    `) as ProductRow[];
    return rows.map(rowToProduct);
  },
  ["products:all"],
  { tags: [PRODUCTS_TAG] },
);

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id) ?? null;
}

export async function getCategorias(): Promise<Categoria[]> {
  const all = await getAllProducts();
  // Orden fijo: Agua y Soda primero, despues Dispensers. Igual que la web antes.
  const aguaProductos = all.filter((p) => p.categoria === "agua");
  const dispProductos = all.filter((p) => p.categoria === "dispensers");
  const otros = all.filter(
    (p) => p.categoria !== "agua" && p.categoria !== "dispensers",
  );

  const out: Categoria[] = [];
  if (aguaProductos.length)
    out.push({ nombre: "Agua y Soda", slug: "agua", productos: aguaProductos });
  if (dispProductos.length)
    out.push({ nombre: "Dispensers", slug: "dispensers", productos: dispProductos });
  // Cualquier categoria libre que el admin haya creado a futuro:
  const slugs = new Set(otros.map((p) => p.categoria));
  for (const slug of slugs) {
    out.push({
      nombre: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug,
      productos: otros.filter((p) => p.categoria === slug),
    });
  }
  return out;
}

/* ───────── Mutaciones (admin) ───────── */

export async function createProduct(input: ProductInput): Promise<void> {
  // orden: si no viene, lo ponemos al final
  const maxRow = (await sql`SELECT COALESCE(MAX(orden), -1) AS max FROM products`) as {
    max: number;
  }[];
  const nextOrden = input.orden ?? (maxRow[0]?.max ?? -1) + 1;

  await sql`
    INSERT INTO products (
      id, nombre, descripcion, precio_tienda, precio_reparto,
      imagen, categoria, conexion, specs, beneficios, orden
    ) VALUES (
      ${input.id}, ${input.nombre}, ${input.descripcion},
      ${input.precio_tienda}, ${input.precio_reparto},
      ${input.imagen}, ${input.categoria}, ${input.conexion ?? null},
      ${input.specs ? JSON.stringify(input.specs) : null},
      ${input.beneficios ? JSON.stringify(input.beneficios) : null},
      ${nextOrden}
    )
  `;
  revalidateTag(PRODUCTS_TAG, "max");
}

export async function updateProduct(
  id: string,
  input: Omit<ProductInput, "id">,
): Promise<void> {
  await sql`
    UPDATE products SET
      nombre = ${input.nombre},
      descripcion = ${input.descripcion},
      precio_tienda = ${input.precio_tienda},
      precio_reparto = ${input.precio_reparto},
      imagen = ${input.imagen},
      categoria = ${input.categoria},
      conexion = ${input.conexion ?? null},
      specs = ${input.specs ? JSON.stringify(input.specs) : null},
      beneficios = ${input.beneficios ? JSON.stringify(input.beneficios) : null},
      orden = ${input.orden ?? 0},
      updated_at = now()
    WHERE id = ${id}
  `;
  revalidateTag(PRODUCTS_TAG, "max");
}

export async function deleteProduct(id: string): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidateTag(PRODUCTS_TAG, "max");
}
