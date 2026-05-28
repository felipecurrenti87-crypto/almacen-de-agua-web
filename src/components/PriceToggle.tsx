"use client";

import { useCart, type DeliveryMode } from "@/context/CartContext";

export default function PriceToggle({ className = "" }: { className?: string }) {
  const { deliveryMode, setDeliveryMode } = useCart();

  return (
    <div className={`flex items-center gap-1 bg-celeste-light rounded-full p-1 ${className}`}>
      <ToggleOption
        active={deliveryMode === "tienda"}
        onClick={() => setDeliveryMode("tienda")}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        }
        label="Tienda"
      />
      <ToggleOption
        active={deliveryMode === "reparto"}
        onClick={() => setDeliveryMode("reparto")}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        }
        label="Reparto"
      />
    </div>
  );
}

function ToggleOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold font-heading transition-all duration-300 ${
        active
          ? "bg-white text-azul-accent shadow-sm"
          : "text-gris-suave hover:text-azul"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
