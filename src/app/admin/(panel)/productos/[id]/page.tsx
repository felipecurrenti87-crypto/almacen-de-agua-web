import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db/products";
import ProductForm from "../../../ProductForm";
import { updateProductAction } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const action = updateProductAction.bind(null, id);

  return (
    <div className="max-w-3xl">
      <nav className="font-body text-sm text-[#52647A] mb-3">
        <Link href="/admin/productos" className="hover:text-[#1C3055]">
          Productos
        </Link>
        <span className="mx-2">/</span>
        <span>{product.nombre}</span>
      </nav>
      <h1 className="font-heading font-bold text-3xl mb-6">Editar producto</h1>
      <ProductForm product={product} action={action} mode="edit" />
    </div>
  );
}
