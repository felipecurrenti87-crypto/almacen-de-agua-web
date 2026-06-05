"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealLine } from "@/components/TextReveal";
import MeshGradientBackground from "@/components/MeshGradientBackground";

export default function PoliticaPrivacidadPage() {
  return (
    <div>
      {/* Hero — DARK */}
      <section className="relative bg-[#050E14] py-28 md:py-36 overflow-hidden">
        <MeshGradientBackground intensity="subtle" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <TextRevealLine>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">
              Politica de Privacidad
            </h1>
          </TextRevealLine>
          <AnimatedSection delay={150}>
            <p className="text-gris-dark text-lg max-w-lg mx-auto">
              Protegemos tu informacion personal con los mas altos estandares de seguridad.
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Content */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Wave pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="waves-privacy" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q50 20, 100 40 Q150 60, 200 40" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
                <path d="M0 60 Q50 40, 100 60 Q150 80, 200 60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <path d="M0 20 Q50 0, 100 20 Q150 40, 200 20" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-privacy)" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">
            <AnimatedSection>
              <PolicySection title="1. Responsable del Tratamiento">
                <p>
                  El sitio web y los servicios de reparto de bidones y dispensers son operados bajo la denominacion comercial de <strong>Almacen de Agua</strong>, con domicilio de operaciones y distribucion en Mendoza, Argentina.
                </p>
                <p>
                  Nos comprometemos a garantizar la proteccion, confidencialidad y seguridad de los datos personales de nuestros usuarios y clientes, en total conformidad con la <strong>Ley N° 25.326 de Proteccion de Datos Personales</strong> de la Republica Argentina.
                </p>
              </PolicySection>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <PolicySection title="2. Datos que Recolectamos">
                <p>
                  Para poder procesar tus pedidos en linea, gestionar tus contratos de comodato (prestamo de envases/dispensers) y realizar entregas a domicilio sin cargo, solicitamos unicamente la informacion necesaria:
                </p>
                <ul>
                  <li><strong>Datos de Identificacion:</strong> Nombre y Apellido (o Razon Social en el caso de Empresas).</li>
                  <li><strong>Datos de Envio y Ruta:</strong> Direccion exacta de entrega, departamento (Mendoza), coordenadas de geolocalizacion (opcional para facilitar el reparto) y notas o indicaciones especificas para el repartidor.</li>
                  <li><strong>Datos de Contacto:</strong> Numero de telefono / celular (para coordinacion por WhatsApp y llamadas operativas).</li>
                  <li><strong>Datos de Consumo y Preferencia:</strong> Tipo de cliente (Hogar o Empresa), abono o productos seleccionados en tu pedido y franja horaria preferida de entrega.</li>
                </ul>
                <div className="bg-celeste-light/30 rounded-2xl p-4 border border-celeste-medium/20 not-prose">
                  <p className="text-sm text-azul flex items-start gap-2">
                    <svg className="w-5 h-5 text-celeste-neon flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Este sitio web <strong>no</strong> solicita ni almacena datos de tarjetas de credito o debito, ya que todos los pagos se efectuan contra entrega en efectivo, transferencia o por los medios coordinados directamente al momento del reparto.</span>
                  </p>
                </div>
              </PolicySection>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <PolicySection title="3. Finalidad del Tratamiento">
                <p>Tus datos personales son recolectados con las siguientes finalidades legitimas y exclusivas:</p>
                <ul>
                  <li>Planificar y optimizar las rutas de distribucion de agua y dispensers en los departamentos del Gran Mendoza.</li>
                  <li>Coordinar detalles de logistica, horarios e imprevistos de entrega mediante mensajes de WhatsApp o llamadas directas.</li>
                  <li>Gestionar los comodatos vigentes de envases retornables y dispensers frio-calor asociados a tu nombre.</li>
                  <li>Resolver dudas tecnicas o reclamos a traves del soporte de atencion al cliente.</li>
                  <li>Enviar informacion relevante sobre el servicio, dias feriados o cambios en el cronograma de reparto.</li>
                </ul>
                <div className="bg-celeste-light/30 rounded-2xl p-4 border border-celeste-medium/20 not-prose">
                  <p className="text-sm text-azul">
                    Tus datos personales <strong>NUNCA</strong> seran vendidos, alquilados ni transferidos a terceras empresas bajo ningun concepto comercial.
                  </p>
                </div>
              </PolicySection>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <PolicySection title="4. Almacenamiento Seguro y Conservacion">
                <p>
                  Los datos ingresados en el formulario de registro y en el cotizador son almacenados de forma segura utilizando proveedores de infraestructura en la nube con altos estandares de encriptacion.
                </p>
                <p>
                  Conservaremos tus datos personales unicamente mientras se mantenga activa la relacion comercial (servicios de reparto periodicos o comodatos activos) o hasta que solicites expresamente la eliminacion o rectificacion de los mismos.
                </p>
              </PolicySection>
            </AnimatedSection>

            <AnimatedSection delay={250}>
              <PolicySection title="5. Tus Derechos (Acceso, Rectificacion y Supresion)">
                <p>
                  De acuerdo con la legislacion argentina, tenes pleno derecho a controlar tu informacion. Podes ejercer tus derechos de:
                </p>
                <ul>
                  <li><strong>Acceso:</strong> Solicitar informacion sobre que datos personales tuyos poseemos.</li>
                  <li><strong>Rectificacion:</strong> Corregir o actualizar cualquier dato inexacto o incompleto (por ejemplo, si cambiaste de celular o de domicilio).</li>
                  <li><strong>Supresion:</strong> Solicitar que eliminemos de manera definitiva tus datos de nuestros registros y bases de datos.</li>
                </ul>
                <p>
                  Para hacer valer cualquiera de estos derechos, simplemente podes enviarnos un correo electronico detallando tu solicitud a: <a href="mailto:contacto@almacendeagua.com.ar" className="text-celeste-neon hover:underline">contacto@almacendeagua.com.ar</a> o a <a href="mailto:mporollan@gmail.com" className="text-celeste-neon hover:underline">mporollan@gmail.com</a>.
                </p>
              </PolicySection>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="font-heading font-bold text-xl sm:text-2xl text-azul mb-4 flex items-center gap-3">
        <span className="w-6 sm:w-8 h-0.5 bg-celeste-neon rounded-full" />
        {title}
      </h2>
      <div className="space-y-4 text-gris-suave leading-relaxed text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-azul">
        {children}
      </div>
    </div>
  );
}
