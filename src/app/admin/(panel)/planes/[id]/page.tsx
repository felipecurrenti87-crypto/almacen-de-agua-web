import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlanById } from "@/lib/db/plans";
import PlanForm from "../../../PlanForm";
import { updatePlanAction } from "../../../actions";

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const plan = await getPlanById(id);
  if (!plan) notFound();

  const action = updatePlanAction.bind(null, id);

  return (
    <div className="max-w-3xl">
      <nav className="font-body text-sm text-[#52647A] mb-3">
        <Link href="/admin/planes" className="hover:text-[#1C3055]">
          Planes
        </Link>
        <span className="mx-2">/</span>
        <span>{plan.nombre}</span>
      </nav>
      <h1 className="font-heading font-bold text-3xl mb-6">Editar plan</h1>
      <PlanForm plan={plan} action={action} mode="edit" />
    </div>
  );
}
