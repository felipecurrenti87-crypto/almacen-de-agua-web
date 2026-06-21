/**
 * Aplica scripts/schema.sql sobre la DB apuntada por DATABASE_URL.
 * Uso: npm run db:schema
 *
 * Idempotente: las tablas se crean con IF NOT EXISTS.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

// Node carga .env.local via --env-file=.env.local (ver package.json:db:schema).

const url =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED;
if (!url) {
  console.error(
    "[schema] Falta DATABASE_URL (o POSTGRES_URL) en .env.local.\n" +
      "  Corre: npx vercel env pull .env.local --environment=production",
  );
  process.exit(1);
}
console.log(`[schema] Usando ${url.split("@")[1]?.split("/")[0] || "?"} como host`);

const sql = neon(url);
const ddl = readFileSync(join(process.cwd(), "scripts", "schema.sql"), "utf8");

// Neon HTTP no soporta multi-statement en una sola llamada; lo partimos por ;
const statements = ddl
  .split(/;\s*\n/)
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith("--"));

async function main() {
  console.log(`[schema] Aplicando ${statements.length} sentencias...`);
  for (const stmt of statements) {
    try {
      await sql.query(stmt);
    } catch (err) {
      console.error(`[schema] Error en sentencia:\n${stmt}\n`, err);
      process.exit(1);
    }
  }
  console.log("[schema] OK");
}

main();
