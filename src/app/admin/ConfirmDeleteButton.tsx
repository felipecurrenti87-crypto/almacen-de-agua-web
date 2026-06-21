"use client";

export default function ConfirmDeleteButton({
  message,
  children,
}: {
  message: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className="text-red-600 hover:text-red-800 font-heading font-semibold text-sm"
    >
      {children}
    </button>
  );
}
