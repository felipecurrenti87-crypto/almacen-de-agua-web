export interface ShippingZone {
  nombre: string;
  departamentos: string[];
  costoAgua: number;
  costoDispenser: string;
  tiempoAgua: string;
  tiempoDispenser: string;
}

export const shippingZones: ShippingZone[] = [
  {
    nombre: "Zona Centro",
    departamentos: [
      "Capital",
      "Godoy Cruz",
      "Guaymallen",
      "Las Heras",
      "Maipu",
    ],
    costoAgua: 0,
    costoDispenser: "Gratis",
    tiempoAgua: "24-48 hs habiles",
    tiempoDispenser: "15 dias habiles",
  },
  {
    nombre: "Zona Extendida",
    departamentos: [
      "Lujan de Cuyo",
      "San Martin",
      "Junin",
      "Rivadavia",
      "San Rafael",
    ],
    costoAgua: 0,
    costoDispenser: "Gratis",
    tiempoAgua: "48-72 hs habiles",
    tiempoDispenser: "15 dias habiles",
  },
  {
    nombre: "Zona Provincial",
    departamentos: [
      "Tunuyan",
      "Tupungato",
      "San Carlos",
      "Lavalle",
      "Santa Rosa",
      "La Paz",
      "General Alvear",
      "Malargue",
    ],
    costoAgua: 0,
    costoDispenser: "Gratis",
    tiempoAgua: "Consultar disponibilidad",
    tiempoDispenser: "15 dias habiles",
  },
];

export function findZone(departamento: string): ShippingZone | undefined {
  const q = departamento.toLowerCase().trim();
  return shippingZones.find((z) =>
    z.departamentos.some((d) => d.toLowerCase().includes(q) || q.includes(d.toLowerCase()))
  );
}
