# Almacen de Agua - Tienda Online

Tienda online para **Almacen de Agua**, negocio de venta de agua purificada, soda y dispensers en Mendoza, Argentina.

Built with Next.js 16, TypeScript, Tailwind CSS.

## Requisitos

- Node.js 20+
- npm

## Instalacion y desarrollo local

```bash
npm install
npm run dev
```

El sitio corre en `http://localhost:3000`.

## Configurar Mercado Pago

1. Crear una cuenta en [Mercado Pago Developers](https://www.mercadopago.com.ar/developers/panel)
2. Crear una aplicacion nueva
3. Copiar `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Pegar las credenciales (Public Key y Access Token) en `.env.local`
5. Para testing usar las credenciales de **sandbox**; para produccion, las de **produccion**

## Cambiar productos y precios

Editar el archivo `src/data/products.ts`. Cada producto tiene:

- `id`: identificador unico (no cambiar si ya hay pedidos)
- `nombre`: nombre que se muestra
- `descripcion`: texto descriptivo
- `precio_tienda`: precio para retiro en tienda (en pesos, sin centavos)
- `precio_reparto`: precio con envio a domicilio
- `imagen`: ruta de la imagen en `/public/images/products/`

Los datos del negocio (direccion, telefono, horarios) estan en `src/data/business.ts`.

## Subir imagenes de productos

1. Sacar fotos de los productos con fondo blanco o claro
2. Guardarlas en formato `.webp` para mejor rendimiento (se puede convertir con herramientas online)
3. Copiar las imagenes a `public/images/products/` con los nombres exactos que figuran en `products.ts`:
   - `bidon-20l.webp`
   - `bidon-12l.webp`
   - `soda-puragua.webp`
   - `dispenser-chopera-bidon.webp`
   - `dispenser-chopera-red.webp`
   - `dispenser-tres-botones-bidon.webp`
   - `dispenser-tres-botones-red.webp`
4. Tamano recomendado: 600x600px

El logo va en `public/images/logo.png`.

## Deploy a produccion

### Opcion 1: Vercel (recomendado)

1. Subir el repo a GitHub
2. Conectar con [Vercel](https://vercel.com)
3. Configurar las variables de entorno en Vercel
4. Deploy automatico

### Opcion 2: Servidor con Node.js

```bash
npm run build
npm start
```

El servidor corre en el puerto 3000. Usar un reverse proxy (nginx) para el dominio.

### Opcion 3: Export estatico

Agregar `output: 'export'` en `next.config.ts` y ejecutar:

```bash
npm run build
```

Los archivos estaticos quedan en la carpeta `out/`. Subir a cualquier hosting estatico.

## Estructura del proyecto

```
src/
  app/              -> Paginas (Home, Tienda, Checkout, Nosotros, Contacto)
  components/       -> Componentes reutilizables
  context/          -> Estado global (carrito)
  data/             -> Productos, datos del negocio
  lib/              -> Utilidades
public/
  images/products/  -> Fotos de productos
```
