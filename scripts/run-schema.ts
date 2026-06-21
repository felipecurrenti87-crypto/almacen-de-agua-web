/**
 * Aplica scripts/schema.sql sobre la DB apuntada por DATABASE_URL.
 * Uso: npm run db:schema
 *
 * Idempotente: las tablas se crean con IF NOT EXISTS.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

// Carga .env.local primero (Next style), luego .env
config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[schema] Falta DATABASE_URL en .env.local");
  process.exit(1);
}

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
