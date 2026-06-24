/**
 * Datos iniciales usados UNICAMENTE para el seed de la base.
 * Una vez seedeada la DB, la web publica y el admin leen desde Postgres.
 * Editar productos/planes desde /admin, no desde este archivo.
 */
import type { Product } from "./products";

export type SeedPlan = {
  tipo: "hogar" | "comercio";
  nombre: string;
  precio: number;
  precioTienda?: number;
  descripcion: string;
  detalles: string[];
  destacado?: boolean;
  tag?: string;
};

export const seedProducts: Product[] = [
  // ─── Agua y Soda ───
  {
    id: "bidon-20l",
    nombre: "Bidon de agua 20 litros",
    descripcion:
      "Agua purificada Puragua en botellón de 20 litros. Ideal para dispenser o soporte.",
    precio_tienda: 5500,
    precio_reparto: 7500,
    imagen: "/images/products/bidon-20l.png",
    categoria: "agua",
  },
  {
    id: "bidon-12l",
    nombre: "Bidon de agua 12 litros",
    descripcion:
      "Agua purificada Puragua en botellón de 12 litros. Mas liviano y facil de manejar.",
    precio_tienda: 4000,
    precio_reparto: 5500,
    imagen: "/images/products/bidon-12l.png",
    categoria: "agua",
  },
  {
    id: "soda-sifon",
    nombre: "Soda Puragua 1500cc",
    descripcion:
      "Soda en sifon Puragua de 1500cc. Agua gasificada de calidad premium.",
    precio_tienda: 1000,
    precio_reparto: 1200,
    imagen: "/images/products/soda-puragua.png",
    categoria: "agua",
  },

  // ─── Dispensers ───
  {
    id: "platinum-3temp-bidon",
    nombre: "Platinum 3 Temperaturas - Botellón",
    descripcion:
      "Dispenser frio/calor/natural con iluminacion LED y diseno moderno. Ideal para hogar y oficina.",
    precio_tienda: 340000,
    precio_reparto: 340000,
    imagen: "/images/products/platinum-3temp-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      voltaje: "220V-240V / 50-60Hz",
      potenciaCalentamiento: "500W",
      capacidadCaliente: "8 L/h",
      potenciaEnfriamiento: "85W",
      capacidadFria: "5 L/h",
      temperaturas: ["Fria: hasta 5°C", "Natural: ambiente", "Caliente: hasta 85°C"],
      dimensiones: "90 x 32 x 36 cm",
      extras: ["Iluminacion LED", "Compatible con botellones hasta 20L", "Estructura de acero"],
    },
    beneficios: [
      "3 temperaturas en un solo equipo",
      "Rendimiento ideal para uso diario",
      "Diseno elegante con iluminacion LED",
      "Materiales resistentes y duraderos",
      "Eficiencia energetica optimizada",
    ],
  },
  {
    id: "platinum-3temp-red",
    nombre: "Platinum 3 Temperaturas - Red",
    descripcion:
      "Dispenser frio/calor/natural con LED y conexion directa a red. Sin botellones, flujo continuo.",
    precio_tienda: 385000,
    precio_reparto: 385000,
    imagen: "/images/products/platinum-3temp-red.png",
    categoria: "dispensers",
    conexion: "red",
    specs: {
      voltaje: "220V-240V / 50-60Hz",
      potenciaCalentamiento: "500W",
      capacidadCaliente: "8 L/h",
      potenciaEnfriamiento: "85W",
      capacidadFria: "5 L/h",
      temperaturas: ["Fria: hasta 5°C", "Natural: ambiente", "Caliente: hasta 85°C"],
      dimensiones: "90 x 32 x 36 cm",
      extras: ["Iluminacion LED", "Conexion directa a red", "Estructura de acero"],
    },
    beneficios: [
      "3 temperaturas en un solo equipo",
      "Sin botellones, flujo continuo",
      "Diseno elegante con iluminacion LED",
      "Materiales resistentes y duraderos",
      "Eficiencia energetica optimizada",
    ],
  },
  {
    id: "chopera-friocalor-bidon",
    nombre: "Chopera Frio/Calor - Botellón",
    descripcion:
      "Dispenser 2 temperaturas con canillas choperas. Agua fria y caliente con estilo practico y moderno.",
    precio_tienda: 330000,
    precio_reparto: 330000,
    imagen: "/images/products/chopera-friocalor-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      extras: ["Canillas estilo chopera", "Compatible con botellones hasta 20L"],
    },
    beneficios: [
      "Canillas choperas practicas y elegantes",
      "2 temperaturas: fria y caliente",
      "Instalacion simple con botellón",
    ],
  },
  {
    id: "chopera-friocalor-red",
    nombre: "Chopera Frio/Calor - Red",
    descripcion:
      "Dispenser 2 temperaturas con canillas choperas y conexion a red. Incluye instalacion (solo Gran Mendoza).",
    precio_tienda: 420000,
    precio_reparto: 420000,
    imagen: "/images/products/chopera-friocalor-red.png",
    categoria: "dispensers",
    conexion: "red",
    specs: {
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      extras: ["Canillas estilo chopera", "Conexion directa a red", "Incluye instalacion (solo Gran Mendoza)"],
    },
    beneficios: [
      "Canillas choperas practicas y elegantes",
      "Sin botellones, conexion a red",
      "Incluye instalacion en Gran Mendoza",
    ],
  },
  {
    id: "monocasco-bidon",
    nombre: "Monocasco - Botellón",
    descripcion:
      "Dispenser compacto con botellón. Agua fria y caliente con diseno moderno, practico y eficiente.",
    precio_tienda: 260000,
    precio_reparto: 260000,
    imagen: "/images/products/monocasco-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      extras: ["Diseno monocasco compacto", "Compatible con botellones hasta 20L"],
    },
    beneficios: [
      "Diseno moderno y compacto",
      "Instalacion simple con botellón",
      "Ideal para espacios reducidos",
    ],
  },
  {
    id: "ada-cuyum-bidon",
    nombre: "Ada-Cuyum Frio/Calor - Botellón",
    descripcion:
      "Maquina frio/calor con 2 canillas choperas y proteccion de agua caliente. Diseno moderno en color blanco.",
    precio_tienda: 360000,
    precio_reparto: 360000,
    imagen: "/images/products/ada-cuyum-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      extras: ["2 canillas choperas", "Proteccion de seguridad agua caliente", "Compatible con botellones hasta 20L", "Color blanco"],
    },
    beneficios: [
      "Canillas choperas con proteccion de agua caliente",
      "Diseno moderno y elegante en blanco",
      "Instalacion simple con botellón",
      "Ideal para hogar y oficina",
    ],
  },
  {
    id: "ada-lamo-bidon",
    nombre: "Ada-Lamo Frio/Calor con Heladera - Botellón",
    descripcion:
      "Maquina frio/calor con heladerita integrada y botellón. Diseno moderno en color gris oscuro.",
    precio_tienda: 360000,
    precio_reparto: 360000,
    imagen: "/images/products/ada-lamo-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      extras: ["Heladerita inferior integrada", "Compatible con botellones hasta 20L", "Color gris oscuro"],
    },
    beneficios: [
      "Heladerita integrada para bebidas o snacks",
      "Agua fria y caliente al instante",
      "Diseno moderno y elegante",
      "Ideal para hogar y oficina",
    ],
  },
  {
    id: "platinum-refrigerador-red",
    nombre: "Platinum con Refrigerador - Red",
    descripcion:
      "Dispenser premium con display digital y heladerita integrada. Conexion directa a red, sin botellones.",
    precio_tienda: 480000,
    precio_reparto: 480000,
    imagen: "/images/products/platinum-refrigerador-red.png",
    categoria: "dispensers",
    conexion: "red",
    specs: {
      potenciaCalentamiento: "500W",
      capacidadCaliente: "8 L/h",
      potenciaEnfriamiento: "85W",
      capacidadFria: "5 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      dimensiones: "80 x 32 x 36 cm",
      extras: ["Display digital", "Heladerita inferior", "Conexion directa a red", "Estructura de acero"],
    },
    beneficios: [
      "Display digital intuitivo",
      "Heladerita integrada para bebidas",
      "Sin botellones, flujo continuo",
      "Funcionamiento silencioso",
      "Diseno moderno y elegante",
    ],
  },
  {
    id: "platinum-refrigerador-bidon",
    nombre: "Platinum con Refrigerador - Botellón",
    descripcion:
      "Dispenser premium con display digital y heladerita integrada. Instalacion simple con botellón.",
    precio_tienda: 450000,
    precio_reparto: 450000,
    imagen: "/images/products/platinum-refrigerador-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      potenciaCalentamiento: "500W",
      capacidadCaliente: "8 L/h",
      potenciaEnfriamiento: "85W",
      capacidadFria: "5 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      dimensiones: "80 x 32 x 36 cm",
      extras: ["Display digital", "Heladerita inferior", "Compatible con botellones hasta 20L", "Estructura de acero"],
    },
    beneficios: [
      "Display digital intuitivo",
      "Heladerita integrada para bebidas",
      "Instalacion simple y versatil",
      "Funcionamiento silencioso",
      "Diseno moderno y elegante",
    ],
  },
  {
    id: "zafiro-led-bidon",
    nombre: "Zafiro con LED - Botellón",
    descripcion:
      "Dispenser elegante con iluminacion LED. 10 L/h fria y 8 L/h caliente. Diseno premium para cualquier espacio.",
    precio_tienda: 290000,
    precio_reparto: 290000,
    imagen: "/images/products/zafiro-led-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      capacidadCaliente: "8 L/h",
      capacidadFria: "10 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      dimensiones: "93 x 31 x 29 cm",
      extras: ["Iluminacion LED", "Compatible con botellones hasta 20L"],
    },
    beneficios: [
      "Diseno impresionante con LED",
      "Alto rendimiento: 10 L/h fria",
      "Pieza destacada en cualquier ambiente",
      "Rendimiento excepcional",
    ],
  },
  {
    id: "zafiro-led-red",
    nombre: "Zafiro con LED - Red",
    descripcion:
      "Dispenser elegante con LED y conexion a red. 10 L/h fria y 8 L/h caliente. Incluye instalacion (solo Gran Mendoza).",
    precio_tienda: 380000,
    precio_reparto: 380000,
    imagen: "/images/products/zafiro-led-red.png",
    categoria: "dispensers",
    conexion: "red",
    specs: {
      capacidadCaliente: "8 L/h",
      capacidadFria: "10 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      dimensiones: "93 x 31 x 29 cm",
      extras: ["Iluminacion LED", "Conexion directa a red", "Incluye instalacion (solo Gran Mendoza)"],
    },
    beneficios: [
      "Diseno impresionante con LED",
      "Sin botellones, flujo continuo",
      "Incluye instalacion en Gran Mendoza",
      "Rendimiento excepcional",
    ],
  },
  {
    id: "mini-zafiro-red",
    nombre: "Mini Zafiro - Red",
    descripcion:
      "Dispenser compacto de red. 10 L/h fria y 8 L/h caliente en un formato reducido. Ideal para espacios pequenos.",
    precio_tienda: 280000,
    precio_reparto: 280000,
    imagen: "/images/products/mini-zafiro-red.png",
    categoria: "dispensers",
    conexion: "red",
    specs: {
      capacidadCaliente: "8 L/h",
      capacidadFria: "10 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      dimensiones: "49 x 31 x 29 cm",
      extras: ["Formato compacto", "Conexion directa a red"],
    },
    beneficios: [
      "Tamano compacto, gran rendimiento",
      "Ideal para escritorios y espacios reducidos",
      "Diseno elegante y moderno",
    ],
  },
  {
    id: "mini-zafiro-bidon",
    nombre: "Mini Zafiro - Botellón",
    descripcion:
      "Dispenser compacto con botellón. 10 L/h fria y 8 L/h caliente. Perfecto para cualquier espacio.",
    precio_tienda: 260000,
    precio_reparto: 260000,
    imagen: "/images/products/mini-zafiro-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      capacidadCaliente: "8 L/h",
      capacidadFria: "10 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      dimensiones: "49 x 31 x 29 cm",
      extras: ["Formato compacto", "Compatible con botellones"],
    },
    beneficios: [
      "Tamano compacto, gran rendimiento",
      "Instalacion simple con botellón",
      "Diseno elegante y moderno",
    ],
  },
  {
    id: "zafiro-sinled-bidon",
    nombre: "Zafiro Frio/Calor - Botellón",
    descripcion:
      "Dispenser funcional y confiable. 10 L/h fria y 8 L/h caliente. Simplicidad sin sacrificar rendimiento.",
    precio_tienda: 330000,
    precio_reparto: 330000,
    imagen: "/images/products/zafiro-sinled-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      capacidadCaliente: "8 L/h",
      capacidadFria: "10 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      extras: ["Diseno funcional", "Compatible con botellones"],
    },
    beneficios: [
      "Funcionalidad sin complicaciones",
      "Alto rendimiento frio y caliente",
      "Opcion practica y confiable",
    ],
  },
  {
    id: "zafiro-sinled-red",
    nombre: "Zafiro Frio/Calor - Red",
    descripcion:
      "Dispenser funcional con conexion a red. 10 L/h fria y 8 L/h caliente. Practico y confiable.",
    precio_tienda: 360000,
    precio_reparto: 360000,
    imagen: "/images/products/zafiro-sinled-red.png",
    categoria: "dispensers",
    conexion: "red",
    specs: {
      capacidadCaliente: "8 L/h",
      capacidadFria: "10 L/h",
      temperaturas: ["Fria: hasta 5°C", "Caliente: hasta 85°C"],
      extras: ["Diseno funcional", "Conexion directa a red"],
    },
    beneficios: [
      "Sin botellones, flujo continuo",
      "Alto rendimiento frio y caliente",
      "Opcion practica y confiable",
    ],
  },
  {
    id: "platinum-digital-hielo-bidon",
    nombre: "Platinum Digital con Hielo - Botellón",
    descripcion:
      "Dispenser premium con fabricadora de hielo integrada, panel tactil digital y 3 temperaturas. Hasta 13 kg de hielo/dia.",
    precio_tienda: 550000,
    precio_reparto: 550000,
    imagen: "/images/products/platinum-digital-hielo-bidon.png",
    categoria: "dispensers",
    conexion: "bidon",
    specs: {
      capacidadCaliente: "5 L/h",
      temperaturas: ["Fria: al instante", "Natural: ambiente", "Caliente: hasta 85°C"],
      extras: [
        "Fabricadora de hielo: hasta 13 kg/dia",
        "Panel tactil digital",
        "Bloqueo de seguridad agua caliente",
        "Compatible con botellones",
      ],
    },
    beneficios: [
      "Hielo al instante sin depender del freezer",
      "3 temperaturas de agua",
      "Panel tactil moderno e intuitivo",
      "Sistema de seguridad para ninos",
      "Ideal para hogar, oficina y eventos",
    ],
  },
  {
    id: "platinum-digital-hielo-red",
    nombre: "Platinum Digital con Hielo - Red",
    descripcion:
      "Dispenser premium con fabricadora de hielo, panel tactil y conexion a red. Hasta 13 kg de hielo/dia. Lo ultimo en tecnologia.",
    precio_tienda: 580000,
    precio_reparto: 580000,
    imagen: "/images/products/platinum-digital-hielo-red.png",
    categoria: "dispensers",
    conexion: "red",
    specs: {
      capacidadCaliente: "5 L/h",
      temperaturas: ["Fria: al instante", "Natural: ambiente", "Caliente: hasta 85°C"],
      extras: [
        "Fabricadora de hielo: hasta 13 kg/dia",
        "Panel tactil digital",
        "Bloqueo de seguridad agua caliente",
        "Conexion directa a red",
      ],
    },
    beneficios: [
      "Hielo al instante sin depender del freezer",
      "3 temperaturas + conexion a red",
      "Panel tactil moderno e intuitivo",
      "Sistema de seguridad para ninos",
      "Ideal para hogar, oficina y eventos",
    ],
  },
  {
    id: "natural-blanco",
    nombre: "Dispenser Natural - Blanco",
    descripcion: "Dispenser para agua a temperatura ambiente. Compatible con botellones de 10, 12 y 20L. Sin conexion electrica.",
    precio_tienda: 10000,
    precio_reparto: 10000,
    imagen: "/images/products/natural-blanco.png",
    categoria: "dispensers",
    conexion: "natural",
    specs: {
      dimensiones: "30cm x 25cm x 25cm",
      extras: ["Peso: 600g", "Material: Plastico de alta resistencia", "Compatible: Botellones de 10, 12 y 20L"],
    },
    beneficios: [
      "No requiere conexion electrica",
      "Compatible con botellones de 10, 12 y 20 litros",
      "Diseno ergonomico para llenado facil",
      "Material resistente y duradero",
      "Ideal para hogares, oficinas y comercios",
    ],
  },
  {
    id: "natural-gris",
    nombre: "Dispenser Natural - Gris",
    descripcion: "Dispenser para agua a temperatura ambiente. Compatible con botellones de 10, 12 y 20L. Sin conexion electrica.",
    precio_tienda: 10000,
    precio_reparto: 10000,
    imagen: "/images/products/natural-gris.png",
    categoria: "dispensers",
    conexion: "natural",
    specs: {
      dimensiones: "30cm x 25cm x 25cm",
      extras: ["Peso: 600g", "Material: Plastico de alta resistencia", "Compatible: Botellones de 10, 12 y 20L"],
    },
    beneficios: [
      "No requiere conexion electrica",
      "Compatible con botellones de 10, 12 y 20 litros",
      "Diseno ergonomico para llenado facil",
      "Material resistente y duradero",
      "Ideal para hogares, oficinas y comercios",
    ],
  },
  {
    id: "natural-negro",
    nombre: "Dispenser Natural - Negro",
    descripcion: "Dispenser para agua a temperatura ambiente. Compatible con botellones de 10, 12 y 20L. Sin conexion electrica.",
    precio_tienda: 10000,
    precio_reparto: 10000,
    imagen: "/images/products/natural-negro.png",
    categoria: "dispensers",
    conexion: "natural",
    specs: {
      dimensiones: "30cm x 25cm x 25cm",
      extras: ["Peso: 600g", "Material: Plastico de alta resistencia", "Compatible: Botellones de 10, 12 y 20L"],
    },
    beneficios: [
      "No requiere conexion electrica",
      "Compatible con botellones de 10, 12 y 20 litros",
      "Diseno ergonomico para llenado facil",
      "Material resistente y duradero",
      "Ideal para hogares, oficinas y comercios",
    ],
  },
];

export const seedPlans: SeedPlan[] = [
  // ─── Hogar ───
  {
    tipo: "hogar",
    nombre: "Basico",
    precio: 15000,
    precioTienda: 11000,
    descripcion: "Ideal para personas solas o parejas con consumo moderado.",
    detalles: [
      "2 Botellones Retornables de 20L/mes",
      "Envio programado sin cargo en Gran Mendoza",
      "Ahorra un 27% retirando en tienda ($5.500 c/u)",
      "Ideal con dispenser propio o bomba USB",
    ],
  },
  {
    tipo: "hogar",
    nombre: "Clasico",
    precio: 30000,
    precioTienda: 22000,
    descripcion:
      "El plan preferido de las familias mendocinas. Agua pura ideal para cocinar e hidratacion diaria.",
    destacado: true,
    tag: "Popular",
    detalles: [
      "4 Botellones Retornables de 20L/mes",
      "Reparto semanal directo a tu puerta",
      "Ahorra un 27% retirando en tienda ($5.500 c/u)",
      "Compatible con dispensers de pie",
    ],
  },
  {
    tipo: "hogar",
    nombre: "Familiar",
    precio: 45000,
    precioTienda: 33000,
    descripcion: "Para familias numerosas o deportistas que priorizan hidratacion constante.",
    detalles: [
      "6 Botellones Retornables de 20L/mes",
      "Entrega semanal con prioridad de reparto",
      "Ahorra un 27% retirando en tienda ($5.500 c/u)",
      "Excelente para dispenser de pie clasico",
    ],
  },

  // ─── Comercio ───
  {
    tipo: "comercio",
    nombre: "Oficina Clasico",
    precio: 45000,
    descripcion: "Ideal para estudios profesionales, oficinas chicas o consultorios medicos.",
    detalles: [
      "Dispenser Frio/Calor Bacope en comodato",
      "4 Botellones de 20L/mes incluidos",
      "Higienizacion y mantenimiento tecnico incluido",
      "Reparto corporativo semanal sin cargo",
      "Factura corporativa A o B",
    ],
  },
  {
    tipo: "comercio",
    nombre: "Oficina Alto Consumo",
    precio: 240000,
    descripcion: "Para empresas medianas con equipos y consumo escalable.",
    destacado: true,
    tag: "Empresas",
    detalles: [
      "Dispenser Frio/Calor Bacope en comodato",
      "30 Botellones de 20L/mes incluidos",
      "Entrega semanal prioritaria en Mendoza",
      "Higienizacion semestral bonificada 100%",
      "Factura A o B con precios congelados",
    ],
  },
  {
    tipo: "comercio",
    nombre: "Red Ilimitada",
    precio: 45000,
    tag: "Ilimitado",
    descripcion: "Dispenser conectado a tu red de agua con filtros purificadores premium.",
    detalles: [
      "Dispenser Red Frio/Calor en comodato",
      "Agua fria y caliente ILIMITADA",
      "Instalacion profesional bonificada",
      "Cambio anual de filtros sin cargo",
      "Factura corporativa A o B",
    ],
  },
];
