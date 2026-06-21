import { getCategorias } from "@/lib/db/products";
import TiendaClient from "./TiendaClient";

export default async function TiendaPage() {
  const categorias = await getCategorias();
  return <TiendaClient categorias={categorias} />;
}
