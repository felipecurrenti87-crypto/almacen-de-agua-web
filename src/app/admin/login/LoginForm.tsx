"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "No se pudo iniciar sesion");
        setBusy(false);
        return;
      }
      const target = next && next.startsWith("/admin") ? next : "/admin";
      router.push(target);
      router.refresh();
    } catch {
      setError("Error de red");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block font-heading text-sm font-semibold text-[#1C3055] mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          className="w-full px-3 py-2.5 rounded-lg border border-[#BBD6E1] bg-white text-[#1C3055] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#639BB6]/40 focus:border-[#639BB6]"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 font-body">{error}</p>
      )}

      <button
        type="submit"
        disabled={busy || !password}
        className="w-full bg-[#1C3055] hover:bg-[#16264a] disabled:bg-[#1C3055]/50 text-white font-heading font-bold py-2.5 rounded-lg transition-colors"
      >
        {busy ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
