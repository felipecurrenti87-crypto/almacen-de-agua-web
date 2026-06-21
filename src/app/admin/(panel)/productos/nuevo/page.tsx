import Link from "next/link";
import ProductForm from "../../../ProductForm";
import { createProductAction } from "../../../actions";

export default function NuevoProductoPage() {
  return (
    <div className="max-w-3xl">
      <nav className="font-body text-sm text-[#52647A] mb-3">
        <Link href="/admin/productos" className="hover:text-[#1C3055]">
          Productos
        </Link>
        <span className="mx-2">/</span>
        <span>Nuevo</span>
      </nav>
      <h1 className="font-heading font-bold text-3xl mb-6">Nuevo producto</h1>
      <ProductForm action={createProductAction} mode="create" />
    </div>
  );
}
