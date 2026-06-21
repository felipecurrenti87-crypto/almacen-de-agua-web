-- Schema para Almacen de Agua
-- Aplicar con: npm run db:schema (o copiar/pegar en el SQL editor de Neon).
-- Idempotente: se puede correr varias veces sin romper nada.

CREATE TABLE IF NOT EXISTS products (
  id              text PRIMARY KEY,
  nombre          text NOT NULL,
  descripcion     text NOT NULL,
  precio_tienda   integer NOT NULL,
  precio_reparto  integer NOT NULL,
  imagen          text NOT NULL,
  categoria       text NOT NULL,
  conexion        text,
  specs           jsonb,
  beneficios      jsonb,
  orden           integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_categoria_idx ON products (categoria);
CREATE INDEX IF NOT EXISTS products_orden_idx     ON products (orden);

CREATE TABLE IF NOT EXISTS plans (
  id              serial PRIMARY KEY,
  tipo            text NOT NULL CHECK (tipo IN ('hogar', 'comercio')),
  nombre          text NOT NULL,
  precio          integer NOT NULL,
  precio_tienda   integer,
  descripcion     text NOT NULL,
  detalles        jsonb NOT NULL DEFAULT '[]'::jsonb,
  destacado       boolean NOT NULL DEFAULT false,
  tag             text,
  orden           integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS plans_tipo_idx  ON plans (tipo);
CREATE INDEX IF NOT EXISTS plans_orden_idx ON plans (orden);
