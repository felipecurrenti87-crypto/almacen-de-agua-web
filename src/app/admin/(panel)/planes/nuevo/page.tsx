import Link from "next/link";
import PlanForm from "../../../PlanForm";
import { createPlanAction } from "../../../actions";

export default function NuevoPlanPage() {
  return (
    <div className="max-w-3xl">
      <nav className="font-body text-sm text-[#52647A] mb-3">
        <Link href="/admin/planes" className="hover:text-[#1C3055]">
          Planes
        </Link>
        <span className="mx-2">/</span>
        <span>Nuevo</span>
      </nav>
      <h1 className="font-heading font-bold text-3xl mb-6">Nuevo plan</h1>
      <PlanForm action={createPlanAction} mode="create" />
    </div>
  );
}
