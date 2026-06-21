# Guia de deploy — Almacen de Agua

Esta guia te lleva paso a paso desde "tengo el codigo en la compu" hasta "la web nueva esta en mi dominio y el panel /admin funciona".

> Se asume que ya tenes una cuenta de **GitHub** y una de **Vercel** (ambas son gratis). Si no, createlas en github.com y vercel.com antes de arrancar.

Orden recomendado:

1. [Subir el codigo a GitHub](#1-subir-el-codigo-a-github)
2. [Crear el proyecto en Vercel](#2-crear-el-proyecto-en-vercel)
3. [Crear la base de datos Postgres (Neon)](#3-crear-la-base-de-datos-postgres-neon)
4. [Configurar variables de entorno](#4-configurar-variables-de-entorno)
5. [Aplicar el schema y sembrar datos](#5-aplicar-el-schema-y-sembrar-datos)
6. [Probar en el subdominio temporal](#6-probar-en-el-subdominio-temporal)
7. [Apuntar el dominio almacendeagua.com.ar (al final)](#7-apuntar-el-dominio-almacendeaguacomar-al-final)

---

## 1. Subir el codigo a GitHub

Si todavia no esta en GitHub o queres empujar los ultimos cambios:

```bash
git add .
git commit -m "feat: panel admin + DB Postgres"
git push
```

Si nunca lo subiste, primero crea el repo en github.com y despues:

```bash
git remote add origin https://github.com/<tu-usuario>/almacen-de-agua-web.git
git push -u origin main
```

---

## 2. Crear el proyecto en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new) e inicia sesion con GitHub.
2. **Import Git Repository** → buscas `almacen-de-agua-web` → click en **Import**.
3. Framework Preset: Vercel detecta **Next.js** automaticamente. Dejalo asi.
4. Root directory: dejar en blanco (raiz del repo).
5. **NO toques nada mas todavia.** En la seccion *Environment Variables* dejalo vacio por ahora — las cargamos despues.
6. Click en **Deploy**.

El primer deploy va a **fallar** (esperable: falta DATABASE_URL). Lo arreglamos en los pasos 3-5.

Cuando termine, Vercel te da una URL parecida a `almacen-de-agua-web.vercel.app`. Esa es tu **URL temporal** mientras configuramos lo demas.

---

## 3. Crear la base de datos Postgres (Neon)

En el dashboard del proyecto en Vercel:

1. Click en la pestania **Storage** (arriba).
2. Click en **Create Database**.
3. Elegi **Neon** (Serverless Postgres). Es gratis hasta 0.5 GB.
4. Region: la mas cercana — **AWS sa-east-1 (Sao Paulo)** es la mejor para Argentina.
5. Nombre: `almacen-de-agua-db` (o el que prefieras).
6. Click en **Create**.

Vercel automaticamente:
- Crea la base.
- Inyecta las variables de entorno (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, etc.) en tu proyecto.
- Las marca como disponibles en **Production**, **Preview** y **Development**.

No tenes que copiar/pegar nada. Esta hecho.

---

## 4. Configurar variables de entorno

En **Settings → Environment Variables** agrega estas dos (Vercel ya cargo las de la DB):

| Variable | Valor | Donde aplica |
|---|---|---|
| `ADMIN_PASSWORD` | una password larga y unica que solo vos sepas (10+ caracteres) | Production, Preview, Development |
| `ADMIN_SESSION_SECRET` | una cadena aleatoria de 32+ caracteres ([generador online](https://generate-secret.vercel.app/32) o `openssl rand -hex 32`) | Production, Preview, Development |

Despues de guardar, **vas a tener que volver a hacer deploy** para que se apliquen. Click en **Deployments → ⋯ → Redeploy**.

---

## 5. Aplicar el schema y sembrar datos

Ahora hay que crear las tablas y cargar los productos/planes iniciales **una sola vez**.

### Opcion A — Desde tu compu (recomendado)

1. En Vercel: **Settings → Environment Variables**, copia el valor de `DATABASE_URL`.
2. En tu repo local, crea un archivo `.env.local` (esta gitignored, no lo subas):

   ```env
   DATABASE_URL=postgres://...el-valor-que-copiaste...
   ```

3. Aplica el schema y corre el seed:

   ```bash
   npm run db:schema
   npm run db:seed
   ```

Si ves `[schema] OK` y `[seed] LISTO`, esta todo.

### Opcion B — Desde el SQL editor de Neon (sin tocar la compu)

1. En el dashboard de Neon (Vercel → Storage → tu base → **Open in Neon**).
2. **SQL Editor** → pega el contenido de `scripts/schema.sql` y ejecuta.
3. Para el seed no hay forma desde la web — usa la Opcion A o pedile al desarrollador que lo corra.

---

## 6. Probar en el subdominio temporal

Abri `https://almacen-de-agua-web.vercel.app` (la URL que te dio Vercel).

Verifica:

- [ ] **Home** abre y los videos cargan.
- [ ] **/tienda** muestra los 22 productos.
- [ ] **/tienda/bidon-20l** abre la ficha.
- [ ] **/planes** muestra los 3 planes de hogar y los 3 de comercio.
- [ ] **/admin/login** te pide password → entra con `ADMIN_PASSWORD`.
- [ ] Una vez adentro: editas un precio, guardas, refrescas /tienda y se ve el cambio.

Si algo falla, revisa **Vercel → Deployments → tu deploy → Function Logs**.

---

## 7. Apuntar el dominio almacendeagua.com.ar (al final)

> **Antes de tocar DNS:** asegurate de que la web vieja tiene backup y de que el panel funciona en el subdominio (paso 6 verificado). Si tenes correo `@almacendeagua.com.ar`, **NO toques los registros MX**.

### 7.1. Configurar el dominio en Vercel

1. Vercel → tu proyecto → **Settings → Domains**.
2. Agregar `almacendeagua.com.ar` y `www.almacendeagua.com.ar`.
3. Vercel te muestra los registros DNS que necesitas:
   - Apex (almacendeagua.com.ar): **A** → `76.76.21.21`
   - www: **CNAME** → `cname.vercel-dns.com`

### 7.2. Actualizar los DNS donde tengas registrado el dominio

Tu dominio `.com.ar` puede estar registrado en **NIC.ar** (NIC Argentina) o en un proveedor tipo GoDaddy, Cloudflare, etc.

- **NIC.ar**: entra a [nic.ar](https://nic.ar) → mis datos → mis dominios → almacendeagua.com.ar → **Editar DNS**. NIC usa el sistema de Delegacion: en general te conviene **delegar el dominio a un proveedor con DNS editable**, por ejemplo a los nameservers de Cloudflare o de Vercel.
  - **Opcion mas simple**: usar los nameservers de Vercel (te los muestra el panel cuando agregas el dominio). Apuntar NIC a esos NS y listo.
- **Cloudflare / GoDaddy / Otro**: entrar al panel de DNS y crear los registros de arriba.

### 7.3. Trampa importante: los registros MX (correo)

Si en `almacendeagua.com.ar` tenes correo (gmail workspace, Zoho, lo que sea), hay registros `MX` que apuntan a tu proveedor de mail. **No los toques.** Solo cambia/agrega los `A` y `CNAME` indicados arriba. Los MX siguen donde estaban.

### 7.4. Esperar propagacion

Tarda entre 5 minutos y 24 horas dependiendo del registrar. En general con NIC.ar son 1-2 horas. Mientras tanto, la URL `almacen-de-agua-web.vercel.app` sigue funcionando.

Cuando ya funcione `https://almacendeagua.com.ar`, Vercel te emite el certificado SSL automaticamente.

---

## Manteniendo el sitio

- **Editar productos / planes / precios**: vas a `/admin`, logueas con `ADMIN_PASSWORD`, editas y guardas. La web publica refleja el cambio al instante.
- **Cambiar la password del admin**: Vercel → Settings → Environment Variables → editar `ADMIN_PASSWORD` → redeploy.
- **Backup de la DB**: Neon tiene point-in-time recovery automatico en el plan gratis (7 dias). Para backups manuales: Neon dashboard → **Backups**.
- **Subir imagenes nuevas de productos**: por ahora se hace pusheando al repo (ver `public/images/products/`). El admin solo edita la ruta. Si en el futuro queres subir imagenes desde el panel, hay que integrar Vercel Blob.

## Problemas comunes

- **"DATABASE_URL no esta definida"** al entrar a /tienda o /admin → falta env var o no se redeployo despues de cargarla. Vercel → Deployments → Redeploy.
- **"No autorizado"** al hacer cualquier accion en /admin → la cookie expiro (30 dias) o cambiaste `ADMIN_SESSION_SECRET`. Refresca y volve a loguear.
- **/admin/login no carga (loop de redirect)** → el proxy esta protegiendo /admin/login por error. Verifica que `src/proxy.ts` siga con `PUBLIC_PATHS` incluyendo `/admin/login` y `/api/admin/login`.
- **La pagina publica no refleja un cambio del admin** → la cache es por tags y se invalida al guardar. Si pasa, abre la pagina en incognito o esperá 30s. Si persiste, redeploy manual.
