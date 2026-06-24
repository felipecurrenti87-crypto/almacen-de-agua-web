import WaveDivider from "./WaveDivider";

/**
 * Banda navy de cierre con identidad de marca: onda de entrada (desde el fondo
 * claro de la pagina) arriba, y onda de salida hacia el footer abajo.
 * Pensado para cerrar paginas de una sola superficie (planes, formularios, etc.)
 * con el sello de las ondas sin ensuciar el cuerpo.
 *
 * `topColor` debe coincidir con el fondo de lo que esta JUSTO ARRIBA (por
 * defecto el celeste claro #EEF5F8 de esas paginas).
 */
export default function WaveCTA({
  topColor = "#EEF5F8",
  children,
}: {
  topColor?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative bg-[#1C3055] overflow-hidden">
      {/* Onda de entrada (color del fondo de arriba, cae hacia el navy) */}
      <div className="absolute top-0 left-0 right-0 z-0 leading-[0]">
        <WaveDivider color={topColor} flip />
      </div>

      <div className="absolute inset-0 brand-texture opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center pt-[110px] pb-36 sm:pt-[150px] sm:pb-44">
        {children}
      </div>

      {/* Onda de salida hacia el footer */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <WaveDivider color="#FFFFFF" />
      </div>
    </section>
  );
}
