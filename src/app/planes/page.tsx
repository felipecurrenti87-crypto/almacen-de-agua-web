import { getPlansByTipo } from "@/lib/db/plans";
import PlanesClient from "./PlanesClient";

export const dynamic = "force-dynamic";

export default async function PlanesPage() {
  const [planesHogar, planesComercio] = await Promise.all([
    getPlansByTipo("hogar"),
    getPlansByTipo("comercio"),
  ]);
  return (
    <PlanesClient planesHogar={planesHogar} planesComercio={planesComercio} />
  );
}
