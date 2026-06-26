# HANDOFF — Almacén de Agua (web)

Guía completa para **continuar editando este proyecto en otra computadora**.
Todo el código está en GitHub; lo único que NO viaja en el repo son las claves
secretas (`.env.local`), que se cargan aparte (ver sección 3).

---

## 0. Qué es este proyecto

Web e-commerce de **Almacén de Agua** (agua purificada, soda y dispensers,
Godoy Cruz, Mendoza). Catálogo + carrito + "checkout" por WhatsApp + panel de
administración. Sin pago online todavía (MercadoPago instalado pero NO conectado).

- **Repo:** https://github.com/felipecurrenti87-crypto/almacen-de-agua-web (rama `main`)
- **Web en vivo:** https://almacen-de-agua-web.vercel.app
- **Panel admin:** https://almacen-de-agua-web.vercel.app/admin
- **Hosting:** Vercel (deploy automático en cada `git push` a `main`)
- **Base de datos:** Postgres en **Neon** (integración de Vercel)

---

## 1. Requisitos en la compu nueva

- **Node.js 20 o superior** (probado en Node 24). Bajar de https://nodejs.org
- **Git** — https://git-scm.com
- **Editor:** VS Code recomendado.
- (Opcional) **GitHub CLI** (`gh`) para login fácil: https://cli.github.com
- (Opcional) **Vercel CLI** — se usa con `npx vercel`, no hace falta instalarlo global.

> En Windows con PowerShell, si al correr `npm`/`npx` aparece un error de
> "ejecución de scripts deshabilitada", correr UNA vez:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` (responder `Y`).

---

## 2. Bajar el proyecto

```bash
git clone https://github.com/felipecurrenti87-crypto/almacen-de-agua-web.git
cd almacen-de-agua-web
npm install
```

> Cloná en una ruta **sin espacios ni tildes** si podés (ej: `C:\dev\almacen-de-agua`),
> evita problemas con algunas herramientas.

---

## 3. Variables de entorno (`.env.local`)

El archivo `.env.local` **no está en el repo** (está en `.gitignore`). Hay que
crearlo a mano en la raíz del proyecto. Contenido:

```env
# Base de datos (Postgres / Neon)
DATABASE_URL=postgres://...   # ver "cómo obtenerla" abajo

# Panel /admin
ADMIN_PASSWORD=...            # la que usás para entrar a /admin
ADMIN_SESSION_SECRET=...      # cadena larga aleatoria para firmar la cookie

# URL del sitio
NEXT_PUBLIC_SITE_URL=https://almacendeagua.com.ar
```

Ver `.env.example` para la lista completa de variables previstas.

### Cómo obtener los valores

- **DATABASE_URL** → es "sensible" y Vercel **no la descarga** con `vercel env pull`.
  Sacarla del dashboard de **Neon**:
  Vercel → proyecto `almacen-de-agua-web` → pestaña **Storage** → base
  `almacen-de-agua-db` → **Open in Neon** → *Connection Details* → copiar la
  connection string (formato `postgres://...@...neon.tech/...?sslmode=require`).
- **ADMIN_PASSWORD** y **ADMIN_SESSION_SECRET** → están en Vercel
  (Settings → Environment Variables) pero como son "sensibles" tampoco se
  descargan. Usá los valores que tenés guardados (password manager). Si los
  perdés, se pueden regenerar y actualizar en Vercel + redeploy.

> El resto de variables (`vercel env pull .env.local`) se pueden bajar logueando
> con `npx vercel login` y `npx vercel link` (elegir `almacen-de-agua-web`),
> pero recordá que las 3 de arriba hay que completarlas a mano.

---

## 4. Correr en local

```bash
npm run dev      # arranca en http://localhost:3000
```

- **Home, nosotros, conoce-el-sistema, sustentabilidad, FAQ** funcionan sin DB.
- **/tienda, /tienda/[id], /planes y /admin** necesitan `DATABASE_URL` válida en
  `.env.local`. Si falta, esas páginas tiran error 500 en local.

Otros comandos:

```bash
npm run build    # build de producción (lo que corre Vercel)
npm run start    # sirve el build
npm run lint     # eslint
npm run db:schema  # crea/actualiza las tablas en la DB (idempotente)
npm run db:seed    # carga productos y planes iniciales desde src/data/seed-data.ts
```

---

## 5. Stack y convenciones (IMPORTANTE)

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**.
- **Tailwind CSS v4** — la config vive en `src/app/globals.css` (`@theme inline`),
  no hay `tailwind.config` tradicional con tokens.
- **Framer Motion 12** (animaciones), **Lenis** (smooth scroll).
- **Modo oscuro: ELIMINADO** — el sitio es siempre claro.

### ⚠️ Next 16 tiene breaking changes vs versiones anteriores

Leer `AGENTS.md` y, ante la duda, la doc local en
`node_modules/next/dist/docs/`. Puntos que ya nos mordieron:

- **`middleware.ts` se llama `proxy.ts`** y exporta una función `proxy()`.
  Está en `src/proxy.ts` (protege `/admin` y `/api/admin/*`).
- **`params` es una Promise** en páginas dinámicas: hay que `await params`
  (ver `src/app/tienda/[id]/page.tsx`).
- **`revalidateTag(tag, "max")`** (la forma de un solo argumento está deprecada).
- Las páginas que leen de la DB tienen `export const dynamic = "force-dynamic"`
  para que el build no falle al pre-renderizar sin DB.

### Paleta y tipografías (identidad de marca)

- Navy `#1C3055` · Azul medio `#639BB6` · Azul claro `#BBD6E1` · Blanco.
- Títulos: **Josefin Sans** (`font-heading`). Cuerpo: **Montserrat** (`font-body`).
- Helpers en `globals.css`: `.gradient-text-glow`, `.brand-eyebrow`,
  `.cta-glass`, `.brand-texture`.

### Sistema de ondas (cortes entre secciones)

- `src/components/WaveDivider.tsx` — la onda estilo Waiakea. `color` = color de la
  sección de DESTINO; `double` = doble capa; `flip` = invertida (arriba).
- `src/components/WaveCTA.tsx` — banda navy de cierre (onda de entrada + salida)
  reutilizable para páginas de una sola superficie.
- **Regla de uso:** las ondas marcan solo los cortes de **contraste**
  (entrada/salida de bandas navy, salida del hero). Las transiciones entre tonos
  claros (blanco ↔ celeste `#EEF5F8`) van como cortes planos limpios, SIN onda.
- **Cuidado con el "hueco":** la onda debe ir pegada al borde inferior de la
  sección (sin `padding-bottom` debajo de ella), si no queda una banda de color
  plano que no coincide y se ve cortado.

---

## 6. Dónde está cada cosa

```
src/
  app/
    page.tsx                 # Home (hero con video, "cómo funciona", reseñas, bloque navy)
    layout.tsx               # fuentes, metadata, providers; PublicChrome oculta header/footer en /admin
    proxy.ts → (en src/)     # auth del panel (Next 16)
    tienda/                  # listado (page.tsx = server, TiendaClient.tsx = UI)
    tienda/[id]/             # detalle (page.tsx server + ProductDetailClient.tsx)
    planes/                  # page.tsx server + PlanesClient.tsx
    nosotros, conoce-el-sistema, sustentabilidad, preguntas-frecuentes,
    quiero-ser-cliente, seguimiento, politica-de-privacidad
    admin/                   # panel (login + (panel)/ con productos y planes)
    api/admin/login|logout/  # endpoints de auth
  components/                # Header, Footer, Cart, WaveDivider, WaveCTA, ProductCard, etc.
  context/CartContext.tsx    # carrito (deliveryMode tienda/reparto, total)
  data/
    products.ts              # tipos Product/Categoria + helper formatPrice + snapshot estático
    seed-data.ts             # datos iniciales para el seed (productos + planes)
    business.ts              # datos del negocio (dirección, horarios, WhatsApp, reseñas)
    reviews.ts               # reseñas por producto
  lib/
    auth.ts                  # firma/verifica cookie HMAC del admin (Web Crypto, corre en Edge)
    db/client.ts             # cliente Neon (lazy: lee DATABASE_URL/POSTGRES_URL)
    db/products.ts           # getAll/getById/getCategorias + create/update/delete (cache + tags)
    db/plans.ts              # idem para planes
scripts/
  schema.sql                 # DDL de las tablas products y plans
  run-schema.ts              # aplica schema.sql (npm run db:schema)
  seed.ts                    # inserta seed-data.ts (npm run db:seed)
public/
  images/products/...        # imágenes de productos (PNG)
  videos/hero-1.mp4, hero-2.mp4   # videos de fondo del home
  images/hero-poster.jpg     # poster = primer frame del video
```

---

## 7. Cómo se editan los datos (productos / planes / precios)

Los productos y planes **viven en la base de datos** (Postgres), NO en los
archivos `.ts`. Hay dos formas de editarlos:

1. **Panel /admin (recomendado para el dueño):** entrar a `/admin`, loguear con
   `ADMIN_PASSWORD`, y editar productos/planes con formularios. Los cambios
   impactan en la web al instante (revalida la cache).
2. **Por código + DB (para cambios masivos):** editar `src/data/seed-data.ts` y
   correr `npm run db:seed` (reemplaza los datos). Ojo: el seed pisa lo que haya
   en la DB.

> El texto de las **páginas** (nosotros, FAQ, sustentabilidad, etc.) SÍ está en el
> código (en los `.tsx`). Para cambiar esos textos se edita el archivo y se hace push.

### Detalle: identificadores que NO se tocan

Los IDs de producto (`bidon-20l`), las rutas de imagen
(`/images/products/...-bidon.png`) y el tipo de conexión (`"bidon"`) son
internos: aunque al cliente le mostramos "Botellón", los identificadores quedaron
como `bidon-*` para no romper links ni imágenes. **No renombrarlos.**

---

## 8. Base de datos — cómo aplicar cambios de esquema o datos

- **Schema (tablas):** editar `scripts/schema.sql`, luego `npm run db:schema`.
- **Seed (datos):** editar `src/data/seed-data.ts`, luego `npm run db:seed`.
- Ambos scripts leen `DATABASE_URL` de `.env.local` (vía `--env-file`).
- **Gotcha conocido:** correr SQL arbitrario contra la DB desde el editor web de
  Neon (dentro de Vercel) pide verificación 2FA (passkey) + apagar el toggle
  "Read-only". Desde la terminal con `DATABASE_URL` no hace falta nada de eso.

---

## 9. Deploy

- Push a `main` → Vercel deploya solo. No hay que hacer nada manual.
- Las variables de entorno de producción están en Vercel
  (Settings → Environment Variables). Si se agrega/cambia una, hay que
  **redeploy** para que tome efecto.
- Guía completa de publicación + dominio en `DEPLOY.md`.

---

## 10. Estado actual / pendientes

- ✅ Web publicada y funcionando en `almacen-de-agua-web.vercel.app`.
- ✅ Base de datos cargada (productos + planes), panel admin operativo.
- ✅ Identidad visual de ondas aplicada en todas las páginas.
- ⏳ **Dominio `almacendeagua.com.ar`**: todavía NO apuntado a la web nueva
  (la vieja sigue ahí). Pasos en `DEPLOY.md` sección 7. **Cuidado: no tocar los
  registros MX** si hay correo del dominio.
- ⏳ **MercadoPago**: instalado en deps pero NO conectado (el "checkout" arma un
  mensaje a WhatsApp `wa.me/5492613312121`).
- 💡 Idea en evaluación: cuentas de usuario (login passwordless por WhatsApp) —
  ver discusión previa; no implementado.

---

## 11. Checklist rápido para arrancar en la compu nueva

1. Instalar Node 20+, Git.
2. `git clone ...` + `cd almacen-de-agua-web` + `npm install`.
3. Crear `.env.local` con `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
4. `npm run dev` → abrir http://localhost:3000.
5. Para editar y publicar: cambiar código → `git add -A` → `git commit -m "..."`
   → `git push`. Vercel deploya solo.
