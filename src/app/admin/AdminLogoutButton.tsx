"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="w-full text-left px-3 py-2 rounded-lg text-sm font-heading font-semibold text-white/90 hover:bg-white/10 transition-colors disabled:opacity-50"
    >
      {busy ? "Saliendo..." : "Cerrar sesion"}
    </button>
  );
}
