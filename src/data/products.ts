/**
 * Tipos, helpers y SNAPSHOT estatico de productos.
 *
 * Los datos en vivo viven en Postgres (tabla `products`) y se editan desde /admin.
 * Server Components: usar `@/lib/db/products` para leer/escribir.
 *
 * El array `allProducts` exportado aca refleja el ULTIMO seed (src/data/seed-data.ts)
 * y se usa solo en client components que no pueden tocar la DB en render
 * (ej: ChatWidget). Puede estar desactualizado respecto del admin.
 */
import { seedProducts } from "./seed-data";

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio_tienda: number;
  precio_reparto: number;
  imagen: string;
  categoria: string;
  /** Specs extendidas para ficha de detalle (dispensers). */
  specs?: {
    voltaje?: string;
    potenciaCalentamiento?: string;
    capacidadCaliente?: string;
    potenciaEnfriamiento?: string;
    capacidadFria?: string;
    temperaturas?: string[];
    dimensiones?: string;
    extras?: string[];
  };
  beneficios?: string[];
  conexion?: "bidon" | "red" | "natural";
}

export interface Categoria {
  nombre: string;
  slug: string;
  productos: Product[];
}

export const allProducts: Product[] = seedProducts;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
