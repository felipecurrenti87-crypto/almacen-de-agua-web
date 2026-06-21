import { getCategorias } from "@/lib/db/products";
import TiendaClient from "./TiendaClient";

export const dynamic = "force-dynamic";

export default async function TiendaPage() {
  const categorias = await getCategorias();
  return <TiendaClient categorias={categorias} />;
}
