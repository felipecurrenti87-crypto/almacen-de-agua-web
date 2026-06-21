import Link from "next/link";
import { getProductById, getAllProducts } from "@/lib/db/products";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-white text-center">
        <h1 className="font-heading font-bold text-2xl text-azul mb-4">
          Producto no encontrado
        </h1>
        <Link
          href="/tienda"
          className="text-celeste-neon hover:underline font-heading font-semibold"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  // Relacionados: misma categoria, excluyendo el actual, hasta 3.
  const all = await getAllProducts();
  const related = all
    .filter((p) => p.categoria === product.categoria && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
