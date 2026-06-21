import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Cliente HTTP de Neon (serverless). No requiere pool y corre en Node o Edge.
 *
 * Es LAZY: solo lee DATABASE_URL la primera vez que se llama a `sql`. Asi
 * `next build` no rompe en CI/Vercel cuando todavia no estan las env vars,
 * y los modulos que importan `sql` no fallan al cargarse.
 *
 * En Vercel + integracion Neon, DATABASE_URL se inyecta al crear la DB
 * desde Storage > Create Database.
 */

let cached: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (cached) return cached;
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    throw new Error(
      "Ninguna URL de Postgres definida (DATABASE_URL / POSTGRES_URL / POSTGRES_URL_NON_POOLING / DATABASE_URL_UNPOOLED). Configurala en .env.local (local) o en Vercel (deploy).",
    );
  }
  cached = neon(url);
  return cached;
}

export const sql: NeonQueryFunction<false, false> = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => {
  // El driver tipa values como ParameterOrFragment[]; nosotros solo pasamos
  // primitivos / null / objetos JSON-serializables — cast explicito y listo.
  return (getSql() as unknown as (
    s: TemplateStringsArray,
    ...v: unknown[]
  ) => Promise<unknown>)(strings, ...values);
}) as NeonQueryFunction<false, false>;
