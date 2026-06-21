import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF5F8] p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_14px_44px_-14px_rgba(28,48,85,0.2)] border border-[#BBD6E1]/40 p-8">
        <h1 className="font-heading font-bold text-2xl text-[#1C3055] mb-1">
          Almacen de Agua
        </h1>
        <p className="font-body text-sm text-[#52647A] mb-6">
          Entra al panel de administracion.
        </p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
