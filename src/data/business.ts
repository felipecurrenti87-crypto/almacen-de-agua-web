export const business = {
  nombre: "Almacén de Agua",
  marca: "Puragua",
  direccion: "Beltrán Sur 423, Godoy Cruz, Mendoza",
  telefono: "0261 422-6402",
  whatsapp: "2613312121",
  whatsappLink: "https://wa.me/5492613312121",
  whatsappMensaje: "Hola! Quiero hacer un pedido",
  web: "almacendeagua.com.ar",
  horarios: {
    semana: "Lunes a Viernes 9:00 a 19:00",
    sabado: "Sábados 9:00 a 13:00",
  },
  envio: "A domicilio en toda la provincia de Mendoza, de lunes a sábados",
  rating: 4.1,
  totalResenas: 45,
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4!2d-68.8383!3d-32.9283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBeltr%C3%A1n+Sur+423%2C+Godoy+Cruz%2C+Mendoza!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar",
  redes: {
    instagram: "#",
    facebook: "#",
  },
} as const;

export const resenas = [
  {
    autor: "Jose V.",
    texto:
      "Un verdadero placer comprar el agua ahí. Es totalmente higiénico, muy buen agua. Muy rica y barata. Tienen un excelente servicio y los chicos muy amables.",
    rating: 5,
  },
  {
    autor: "Cliente Google",
    texto: "Excelente atención telefónica, entrega inmediata. ¡Felicitaciones!",
    rating: 5,
  },
  {
    autor: "Cliente Google",
    texto: "Muy buena atención y precios!",
    rating: 5,
  },
] as const;
