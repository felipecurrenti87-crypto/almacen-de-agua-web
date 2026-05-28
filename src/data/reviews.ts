export interface Review {
  autor: string;
  texto: string;
  rating: number;
  fecha: string;
  productId: string;
}

export const productReviews: Review[] = [
  // Bidon 20L
  {
    productId: "bidon-20l",
    autor: "Jose V.",
    texto: "Excelente agua, se nota la diferencia con el agua de la canilla. Mis hijos la prefieren.",
    rating: 5,
    fecha: "Hace 2 semanas",
  },
  {
    productId: "bidon-20l",
    autor: "Maria L.",
    texto: "Pedimos todas las semanas, el reparto es puntual y el agua es de calidad. Muy recomendable.",
    rating: 5,
    fecha: "Hace 1 mes",
  },
  {
    productId: "bidon-20l",
    autor: "Carlos R.",
    texto: "Buen producto y buen precio. El bidon viene siempre sellado y limpio.",
    rating: 4,
    fecha: "Hace 3 semanas",
  },

  // Bidon 12L
  {
    productId: "bidon-12l",
    autor: "Ana P.",
    texto: "Perfecto para mi que vivo sola. Mas liviano que el de 20L y mas facil de manejar.",
    rating: 5,
    fecha: "Hace 1 semana",
  },
  {
    productId: "bidon-12l",
    autor: "Luis M.",
    texto: "Lo uso en la oficina con una bomba USB. Muy practico y el agua es rica.",
    rating: 4,
    fecha: "Hace 2 meses",
  },

  // Soda
  {
    productId: "soda-sifon",
    autor: "Patricia G.",
    texto: "La soda Puragua es la mejor de Mendoza. Tiene la gasificacion justa.",
    rating: 5,
    fecha: "Hace 3 semanas",
  },
  {
    productId: "soda-sifon",
    autor: "Roberto D.",
    texto: "Siempre pido soda junto con los bidones. Muy buena calidad.",
    rating: 5,
    fecha: "Hace 1 mes",
  },

  // Platinum 3 Temp Bidon
  {
    productId: "platinum-3temp-bidon",
    autor: "Familia Gonzalez",
    texto: "El mejor dispenser que tuvimos. Las 3 temperaturas son un lujo, sobre todo el agua natural para los chicos.",
    rating: 5,
    fecha: "Hace 2 meses",
  },
  {
    productId: "platinum-3temp-bidon",
    autor: "Claudia S.",
    texto: "El LED le da un toque moderno. Lo tengo en el living y queda espectacular.",
    rating: 5,
    fecha: "Hace 3 meses",
  },

  // Platinum 3 Temp Red
  {
    productId: "platinum-3temp-red",
    autor: "Estudio Contable MZ",
    texto: "Excelente para la oficina. Sin botellones es mucho mas practico. La instalacion fue rapida y profesional.",
    rating: 5,
    fecha: "Hace 1 mes",
  },

  // Monocasco Red
  {
    productId: "monocasco-red",
    autor: "Valeria T.",
    texto: "Compacto y funcional. Lo tengo en un departamento chico y ocupa muy poco espacio.",
    rating: 4,
    fecha: "Hace 2 meses",
  },
  {
    productId: "monocasco-red",
    autor: "Martin K.",
    texto: "Muy buen dispenser para el precio. El agua fria sale helada como me gusta.",
    rating: 5,
    fecha: "Hace 1 mes",
  },

  // Monocasco Bidon
  {
    productId: "monocasco-bidon",
    autor: "Laura F.",
    texto: "Sencillo pero cumple perfecto. Lo recomiendo para quien busca algo basico y confiable.",
    rating: 4,
    fecha: "Hace 6 semanas",
  },

  // Platinum Refrigerador Red
  {
    productId: "platinum-refrigerador-red",
    autor: "Consultora ABC",
    texto: "La heladerita es genial para guardar agua saborizada del equipo. Un golazo para la oficina.",
    rating: 5,
    fecha: "Hace 3 semanas",
  },

  // Zafiro LED Bidon
  {
    productId: "zafiro-led-bidon",
    autor: "Diego A.",
    texto: "El diseño con LED es impresionante. Todos mis invitados preguntan donde lo compre.",
    rating: 5,
    fecha: "Hace 2 meses",
  },

  // Platinum Digital con Hielo
  {
    productId: "platinum-digital-hielo-bidon",
    autor: "Familia Ruiz",
    texto: "Increible. Hace hielo perfecto y el panel tactil funciona de 10. Vale cada peso.",
    rating: 5,
    fecha: "Hace 1 mes",
  },
  {
    productId: "platinum-digital-hielo-red",
    autor: "Bar & Lounge MZ",
    texto: "Lo usamos en el bar para los tragos. 13kg de hielo por dia nos salva la noche. Excelente inversion.",
    rating: 5,
    fecha: "Hace 2 semanas",
  },

  // Natural
  {
    productId: "natural-blanco",
    autor: "Marta J.",
    texto: "Simple y practico. Lo uso en la cocina para tener siempre agua a mano sin enchufar nada.",
    rating: 4,
    fecha: "Hace 1 mes",
  },
  {
    productId: "natural-negro",
    autor: "Federico N.",
    texto: "El color negro queda elegante. Funcional y barato, no necesitas mas.",
    rating: 4,
    fecha: "Hace 3 semanas",
  },
];

export function getReviewsByProduct(productId: string): Review[] {
  return productReviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const reviews = getReviewsByProduct(productId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
