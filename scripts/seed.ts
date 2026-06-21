/**
 * Pobla products y plans con los datos iniciales de src/data/seed-data.ts.
 * Uso: npm run db:seed
 *
 * Idempotente: usa ON CONFLICT DO UPDATE para products (por id) y
 * borra/reinserta planes (tabla chica, mas simple).
 */
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { seedProducts, seedPlans } from "../src/data/seed-data";

config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[seed] Falta DATABASE_URL en .env.local");
  process.exit(1);
}

const sql = neon(url);

async function seedProductsTable() {
  console.log(`[seed] products: insertando ${seedProducts.length} filas...`);
  let i = 0;
  for (const p of seedProducts) {
    await sql`
      INSERT INTO products (
        id, nombre, descripcion, precio_tienda, precio_reparto,
        imagen, categoria, conexion, specs, beneficios, orden
      ) VALUES (
        ${p.id}, ${p.nombre}, ${p.descripcion}, ${p.precio_tienda}, ${p.precio_reparto},
        ${p.imagen}, ${p.categoria}, ${p.conexion ?? null},
        ${p.specs ? JSON.stringify(p.specs) : null},
        ${p.beneficios ? JSON.stringify(p.beneficios) : null},
        ${i}
      )
      ON CONFLICT (id) DO UPDATE SET
        nombre = EXCLUDED.nombre,
        descripcion = EXCLUDED.descripcion,
        precio_tienda = EXCLUDED.precio_tienda,
        precio_reparto = EXCLUDED.precio_reparto,
        imagen = EXCLUDED.imagen,
        categoria = EXCLUDED.categoria,
        conexion = EXCLUDED.conexion,
        specs = EXCLUDED.specs,
        beneficios = EXCLUDED.beneficios,
        orden = EXCLUDED.orden,
        updated_at = now()
    `;
    i++;
  }
  console.log("[seed] products: OK");
}

async function seedPlansTable() {
  console.log(`[seed] plans: reemplazando con ${seedPlans.length} filas...`);
  await sql`DELETE FROM plans`;
  let i = 0;
  for (const p of seedPlans) {
    await sql`
      INSERT INTO plans (
        tipo, nombre, precio, precio_tienda, descripcion,
        detalles, destacado, tag, orden
      ) VALUES (
        ${p.tipo}, ${p.nombre}, ${p.precio}, ${p.precioTienda ?? null}, ${p.descripcion},
        ${JSON.stringify(p.detalles)}, ${p.destacado ?? false}, ${p.tag ?? null}, ${i}
      )
    `;
    i++;
  }
  console.log("[seed] plans: OK");
}

async function main() {
  await seedProductsTable();
  await seedPlansTable();
  console.log("[seed] LISTO");
}

main().catch((err) => {
  console.error("[seed] Error:", err);
  process.exit(1);
});
