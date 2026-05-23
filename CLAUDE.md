# CLAUDE.md — Zapateria la 21
> Guía completa del proyecto para sesiones de trabajo con Claude Code.  
> Última actualización: 2026-05-23

---

## 🏪 Descripción del Proyecto

**Zapateria la 21** es un e-commerce de zapatillas (sneakers) ubicado en Venezuela.  
Vende marcas como Nike, Adidas, Jordan, Converse, Vans, Puma, Reebok, New Balance.  
El sitio está **en producción** en Hostinger Node.js hosting.

- **URL producción:** `https://mediumturquoise-snake-736611.hostingersite.com`
- **Repositorio GitHub:** `https://github.com/juanmjd914/zapateria-la-21`
- **Rama principal:** `master`
- **Auto-deploy:** activado — cada push a `master` dispara un nuevo deploy en Hostinger

---

## 🏗️ Arquitectura General

```
zapateria-la-21/
├── src/                    # Frontend React+Vite+TypeScript
│   ├── components/         # Componentes reutilizables + secciones de Home
│   ├── pages/              # Páginas completas (Catálogo, Checkout, Admin...)
│   ├── store/              # Zustand (carrito)
│   ├── lib/                # Cliente Supabase (frontend)
│   ├── hooks/              # useSEO
│   ├── App.tsx             # Router raíz + layout global
│   ├── main.tsx            # Entry point React
│   └── index.css           # Tailwind v4 + tokens de diseño + animaciones
├── server/
│   ├── index.js            # Servidor Express 5 (API + static files en prod)
│   └── supabase.js         # Cliente Supabase server-side (service_role)
├── supabase/
│   └── schema.sql          # DDL completo — ejecutar en Supabase SQL Editor
├── dist/                   # Build de producción (COMMITEADO en git)
├── index.html              # HTML raíz con SEO completo
├── vite.config.ts          # Config Vite (proxy /api → localhost:3001 en dev)
├── package.json
├── tsconfig.json
└── .env                    # ⚠️ NO commiteado — ver sección de Variables de Entorno
```

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | ^19.2.6 | UI framework |
| Vite | ^8.0.12 | Build tool + dev server (puerto 5174) |
| TypeScript | ~6.0.2 | Tipado estático |
| Tailwind CSS | ^4.0.0 | Estilos (config en `index.css` con `@theme`) |
| motion/react | ^12.40.0 | Animaciones (Framer Motion v12) |
| React Router | ^7.15.1 | Navegación SPA |
| Zustand | ^5.0.13 | Estado global del carrito (con `persist`) |
| Lucide React | ^1.16.0 | Iconos |
| @supabase/supabase-js | ^2.106.1 | Cliente Supabase |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 22.x | Runtime (configurado en Hostinger) |
| Express | ^5.2.1 | Servidor HTTP |
| MercadoPago SDK | ^3.0.0 | Pagos (`MercadoPagoConfig`, `Preference`, `Payment`) |
| dotenv | ^17.4.2 | Variables de entorno |
| cors | ^2.8.6 | CORS (solo dev; en prod mismo origen) |

### Infraestructura
| Servicio | Uso |
|---|---|
| **Supabase** | Base de datos PostgreSQL + Storage de imágenes/videos |
| **Hostinger Node.js** | Hosting del servidor Express + frontend estático |
| **MercadoPago** | Pasarela de pagos (actualmente en modo sandbox/TEST) |

---

## ⚙️ Variables de Entorno

### Archivo `.env` local (NO commiteado)
```env
# MercadoPago
MP_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx

# Supabase (backend — service_role bypasea RLS)
SUPABASE_URL=https://<proyecto>.supabase.co
SUPABASE_ANON_KEY=<anon-key-del-proyecto>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-del-proyecto>

# Supabase (frontend — leídas por Vite en build, prefijo VITE_ obligatorio)
VITE_SUPABASE_URL=https://<proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key-del-proyecto>

# Servidor
PORT=3001
PUBLIC_URL=http://localhost:3001   # En prod: URL del dominio real (para webhooks MP)

# Admin
ADMIN_PIN=<tu-pin-secreto>
```

### Variables configuradas en Hostinger
Las mismas excepto `PORT` (Hostinger inyecta su propio puerto automáticamente):
`NODE_ENV`, `MP_ACCESS_TOKEN`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`ADMIN_PIN`, `PORT=3000`

---

## 🗄️ Base de Datos Supabase

### Proyecto Supabase
- **URL:** `https://bismrhwimuntpawgrdsa.supabase.co`
- **Bucket Storage:** `VIDEOS WEB` (imágenes y video del hero)
- **Bucket Storage:** `Productos zapateria` (imágenes de productos reales)

### Tabla `productos`
```sql
id          SERIAL PRIMARY KEY
brand       TEXT NOT NULL           -- Nike, Adidas, Jordan...
name        TEXT NOT NULL           -- Nombre del modelo
price       NUMERIC(10,2)           -- Precio en USD
old_price   NUMERIC(10,2)           -- Precio tachado (opcional)
category    TEXT                    -- Running, Casual, Clásico, Deportivo, Urbano
img         TEXT                    -- URL de la imagen (Supabase Storage)
tag         TEXT                    -- NUEVO, OFERTA, PREMIUM, MÁS VENDIDO...
tag_color   TEXT                    -- Clases Tailwind: 'bg-shoe-yellow text-black'
rating      INTEGER (1-5)
active      BOOLEAN DEFAULT true    -- false = oculto del catálogo
created_at  TIMESTAMPTZ
```

**RLS:** Solo lectura pública para productos activos (`active = true`).

### Tabla `pedidos`
```sql
id                  SERIAL PRIMARY KEY
preference_id       TEXT                    -- ID de MercadoPago
payment_id          TEXT UNIQUE             -- ID del pago
external_reference  TEXT                    -- ORDER-{timestamp}
status              TEXT                    -- pending|approved|rejected|in_process
nombre, email, telefono, direccion, ciudad  TEXT  -- Datos del comprador
items               JSONB                   -- Array de CartItem
total               NUMERIC(10,2)
created_at, updated_at  TIMESTAMPTZ
```

**RLS:** Bloqueado para anon. Solo el server (service_role) puede leer/escribir.

---

## 🌐 API Endpoints (Express)

Base URL en dev: `http://localhost:3001`  
Base URL en prod: `https://mediumturquoise-snake-736611.hostingersite.com`

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/crear-preferencia` | Crea preferencia MercadoPago + guarda pedido en Supabase |
| `POST` | `/api/webhook` | Recibe notificaciones de pago de MercadoPago |
| `GET` | `/api/admin/pedidos?status=X` | Lista pedidos (requiere header `x-admin-pin`) |
| `GET` | `/api/admin/stats` | Stats de ventas (requiere header `x-admin-pin`) |
| `GET` | `/api/productos` | Lista productos activos desde Supabase |
| `GET` | `/api/salud` | Health check |

### Autenticación Admin
Header: `x-admin-pin: {ADMIN_PIN}` o query param `?pin={ADMIN_PIN}`

### Body de `/api/crear-preferencia`
```json
{
  "items": [{ "product": { "id", "brand", "name", "price", "img" }, "size": "42", "quantity": 1 }],
  "comprador": { "nombre", "email", "telefono", "direccion", "ciudad" },
  "back_urls": { "success": "...", "failure": "...", "pending": "..." }
}
```

---

## 🖥️ Rutas del Frontend

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Landing page con scroll snap (8 secciones) |
| `/catalogo` | `Catalogo` | Grid de productos con filtros |
| `/marcas` | `Marcas` | Página de marcas |
| `/nosotros` | `Nosotros` | Sobre nosotros |
| `/contacto` | `Contacto` | Formulario de contacto |
| `/checkout` | `Checkout` | Formulario + resumen + botón MercadoPago |
| `/checkout/exito` | `CheckoutExito` | Pago exitoso |
| `/checkout/fallo` | `CheckoutFallo` | Pago fallido |
| `/checkout/pendiente` | `CheckoutPendiente` | Pago pendiente |
| `/admin` | `Admin` | Panel de administración (PIN protegido) |
| `*` | `NotFound` | Página 404 |

### Layout de la Home (`/`)
Scroll snap vertical. Secciones en orden:
1. `HeroSection` — video de fondo + título animado "DESCANSO A TUS PIES"
2. `MarcasSection` — logos de marcas
3. `ConfortSection` — parallax con movimiento de mouse
4. `NuevosModelos` — productos destacados
5. `CalidadSection` — parallax
6. `TripleEstiloSection` — 3 columnas de estilo
7. `CasheaSection` — sección de cashea/oferta
8. `FooterSection` — footer

### Componentes globales (siempre visibles)
- `Navbar` — transparente en home, dark en scroll/páginas internas
- `CartDrawer` — drawer lateral del carrito
- `WhatsAppButton` — botón flotante (esquina inferior derecha)
- `ScrollToTop` — resetea scroll al cambiar de ruta

---

## 🎨 Sistema de Diseño

### Paleta de colores (tokens Tailwind en `index.css`)
```css
--color-shoe-yellow: #ffc222   /* Color principal, CTAs, precios */
--color-shoe-orange: #f27d26   /* Marcas, acentos */
--color-shoe-purple: #420264   /* Tags exclusivos */
/* Base siempre negra: bg-black */
```

### Tipografías (Google Fonts)
- **Poppins** — títulos, nombres de productos, botones CTA (`font-black`)
- **Inter** — cuerpo, etiquetas, precios, formularios
- **Dancing Script** — detalles decorativos (poco uso)

### Efecto especial: `.ondas-textured`
Texto con degradado volcánico animado (amarillo→naranja→rojo) + textura grunge.
Usado en los títulos gigantes de la Home.
```html
<h1 className="ondas-textured text-[120px] font-black">TEXTO</h1>
```
Requiere el filtro SVG global definido en `App.tsx`:
```html
<filter id="rough-edges">...</filter>
```

### Convenciones de animación (motion/react)
```tsx
// Entrada estándar de página:
initial={{ y: 30, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.7 }}

// Cards con hover:
whileHover={{ y: -6 }}

// Botones:
whileHover={{ scale: 1.04 }}
whileTap={{ scale: 0.96 }}
```

---

## 🛒 Estado Global — Carrito (Zustand)

```tsx
import { useCartStore } from '../store/cartStore'

const { items, isOpen, addItem, removeItem, updateQuantity,
        clearCart, openCart, closeCart, toggleCart,
        totalItems, totalPrice } = useCartStore()
```

- Persistido en `localStorage` con key `zapateria-la-21-cart`
- Solo persiste `items` (no `isOpen`)
- Talla se almacena como string (ej: `"42"`)

### Flujo de compra
1. Usuario ve producto en Catálogo → click "Comprar"
2. `SizePickerModal` se abre → selecciona talla EU (35-46) → `addItem()`
3. `CartDrawer` se abre automáticamente
4. Usuario va a `/checkout` → llena datos → click "Pagar con MercadoPago"
5. Frontend llama `POST /api/crear-preferencia`
6. Servidor crea preferencia MP + guarda pedido en Supabase (status: pending)
7. Frontend redirige a `urlPago` (sandbox_init_point o init_point)
8. MP redirige a `/checkout/exito|fallo|pendiente`
9. Webhook MP llama `POST /api/webhook` → actualiza status en Supabase

---

## 🚀 Despliegue en Hostinger

### Configuración actual
- **Framework preset:** Express
- **Branch:** master
- **Node version:** 22.x
- **Entry file:** `server/index.js`
- **Build command (custom):** `npm install --include=dev && tsc -b && vite build`

### Cómo funciona en producción
1. Hostinger hace clone del repo
2. Ejecuta `npm install` (solo `dependencies`)
3. Ejecuta el build command → instala devDeps → compila TS → Vite build → genera `dist/`
4. Inicia `node server/index.js`
5. Express sirve `dist/` como archivos estáticos
6. Todas las rutas no-API devuelven `dist/index.html` (SPA fallback)

### Para reimplementar manualmente
En Hostinger → Despliegues → "Ajustes y reimplementación"

### Servidor en producción (`isProd = true`)
```js
// Sirve archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'dist')))

// SPA fallback — Express 5 requiere /{*path} NO simplemente *
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})
```

---

## ⚠️ Errores Conocidos y Fixes Aplicados

### 1. Express 5 — Wildcard Route
**Error:** `TypeError: Falta el nombre del parámetro en el índice 1: *`  
**Causa:** Express 5 usa `path-to-regexp` v8 que NO acepta `app.get('*', ...)`  
**Fix:** Usar `app.get('/{*path}', ...)` ← **OBLIGATORIO en Express 5**

### 2. Build en Hostinger — `tsc: comando no encontrado`
**Causa:** TypeScript/Vite son devDependencies y Hostinger solo instala dependencies en prod  
**Fix:** Build script en package.json = `npm install --include=dev && tsc -b && vite build`

### 3. Catálogo cargaba datos hardcodeados
**Causa:** El frontend llamaba a `/api/productos` (Express) que no estaba corriendo  
**Fix:** El catálogo ahora lee directo de Supabase con el cliente JS (sin pasar por Express)

### 4. TypeScript errors bloqueando build
- `MessageCircle` sin usar en `WhatsAppButton.tsx` → eliminado del import
- `.finally()` en PromiseLike en `Catalogo.tsx` → movido `setLoading(false)` dentro de `.then()`

---

## 🔧 Comandos de Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo (frontend en :5174 + backend en :3001 simultáneo)
npm run start
# equivale a: concurrently "vite --port 5174" "node server/index.js"

# Solo frontend
npm run dev

# Solo backend
npm run server

# Build de producción
npm run build
# equivale a: npm install --include=dev && tsc -b && vite build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## 📁 Archivos Clave y su Propósito

| Archivo | Propósito |
|---|---|
| `src/App.tsx` | Router, layout global, filtro SVG, componentes globales |
| `src/index.css` | Tailwind v4 + tokens de color + fuentes + `.ondas-textured` |
| `src/store/cartStore.ts` | Zustand store del carrito (persistido en localStorage) |
| `src/lib/supabase.ts` | Cliente Supabase frontend + tipos `Producto` y `Pedido` |
| `src/hooks/useSEO.ts` | Hook para title y meta description por página |
| `src/components/SizePickerModal.tsx` | Modal de selección de talla (EU 35-46) |
| `src/components/CartDrawer.tsx` | Drawer lateral del carrito |
| `src/components/Navbar.tsx` | Navbar con transparencia en home, dark en scroll |
| `src/components/ProductSkeleton.tsx` | Skeleton de carga del catálogo |
| `src/components/ScrollToTop.tsx` | Reset de scroll en cambio de ruta |
| `src/components/WhatsAppButton.tsx` | Botón flotante WhatsApp con tooltip |
| `src/pages/Catalogo.tsx` | Grid de productos + filtros + búsqueda |
| `src/pages/Checkout.tsx` | Formulario + integración MercadoPago |
| `src/pages/Admin.tsx` | Panel admin con PIN (sessionStorage) |
| `server/index.js` | Express 5 — API + static + SPA fallback |
| `server/supabase.js` | Cliente Supabase server (service_role key) |
| `supabase/schema.sql` | DDL de tablas + RLS + datos iniciales |
| `index.html` | HTML con SEO completo (OG, Twitter Card, etc.) |

---

## 🔮 Próximas Mejoras Sugeridas

1. **Dominio propio** — conectar `zapateriala21.com` en Hostinger → Dominios
2. **MercadoPago producción** — cambiar `MP_ACCESS_TOKEN` de `TEST-` a token real
3. **Webhook URL real** — agregar `PUBLIC_URL=https://tu-dominio.com` para notificaciones de pago
4. **ADMIN_PIN seguro** — cambiar el PIN `1234` por uno más robusto
5. **Imágenes de productos reales** — subir al bucket `Productos zapateria` en Supabase y actualizar las URLs en la tabla `productos`
6. **Paginación del catálogo** — cuando haya muchos productos
7. **Notificaciones por email** — al recibir un pedido aprobado (Resend o similar)
8. **Gestión de stock** — agregar campo `stock` a la tabla `productos`
9. **Página de producto individual** — `/catalogo/:id` con detalles expandidos
10. **Optimización de bundle** — el JS pesa ~694 kB; usar code splitting dinámico

---

## 📞 Datos de Contacto del Negocio

- **WhatsApp:** `+58 412 3650 6` (definido en `WhatsAppButton.tsx`)
- **País:** Venezuela
- **Moneda:** USD (precios en dólares)
- **Tallas:** Sistema europeo EU 35-46

---

## 🔑 Notas Importantes para Sesiones Futuras

1. **Express 5 es diferente a Express 4** — wildcard routes requieren `/{*path}` no `*`
2. **El catálogo Lee DIRECTO de Supabase** (frontend), NO pasa por Express
3. **Los pedidos solo se guardan desde el servidor** (service_role key), nunca desde el cliente
4. **`dist/` está commiteado** en git para que Hostinger pueda servir archivos aunque el build falle
5. **Auto-deploy activo** — cualquier push a `master` dispara un redeploy automático
6. **MercadoPago en TEST** — las transacciones son simuladas; tarjetas de prueba en docs de MP
7. **Supabase URL del storage:** `https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/`
8. **PIN de admin** se guarda en `sessionStorage` con key `admin_pin` (se borra al cerrar pestaña)
9. **Las variables `VITE_*`** se embeben en el JS de frontend durante el build — deben estar disponibles en tiempo de build (están en las Variables de Entorno de Hostinger)
