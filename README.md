# 🍛 Zaira Masala — Web Restaurante Indio

Página web profesional para restaurante indio. Diseño oscuro y elegante, 100% estática (sin servidor ni base de datos). Lista para subir a **GitHub Pages** gratis.

---

## 🚀 Cómo subir a GitHub Pages

### Paso 1 — Crear el repositorio
1. Ve a [github.com](https://github.com) e inicia sesión
2. Pulsa **"New repository"**
3. Nómbralo: `zaira-masala` (o el nombre del restaurante)
4. Marca **"Public"**
5. Pulsa **"Create repository"**

### Paso 2 — Subir los archivos
Desde tu terminal (o desde la interfaz web de GitHub arrastrando archivos):

```bash
git init
git add .
git commit -m "Primera versión Zaira Masala"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/zaira-masala.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages
1. Ve a tu repositorio → **Settings** → **Pages**
2. En "Source" selecciona **"Deploy from a branch"**
3. Rama: **main** | Carpeta: **/ (root)**
4. Pulsa **Save**
5. En 2–3 minutos tu web estará en: `https://TU_USUARIO.github.io/zaira-masala`

---

## 📁 Estructura del proyecto

```
zaira-masala/
│
├── index.html          ← HTML semántico con ARIA (no tocar la estructura)
├── menu.json           ← ⭐ AQUÍ SE EDITA EL MENÚ (platos y precios)
│
├── css/
│   ├── styles.css      ← Estilos principales
│   └── additional.css  ← Estilos de carrito, delivery, reseñas y pago
│
├── js/
│   ├── main.js         ← Lógica principal (lee menu.json automáticamente)
│   └── payment.js      ← Integración con Stripe
│
└── images/
    ├── logo.png        ← Logo del restaurante
    ├── favicon.png     ← Icono del navegador
    └── about-chef.png  ← Foto sección "Nosotros"
```

---

## ✏️ Cómo personalizar para otro restaurante

### 1. Cambiar el menú (platos y precios)
Edita solo `menu.json`. Estructura de cada plato:

```json
{
  "name": "Nombre del plato",
  "price": 12.95,
  "description": "Descripción breve",
  "vegan": true,
  "vegetarian": true,
  "spicy": 1
}
```

- `vegan` y `vegetarian`: `true` o eliminar la línea si no aplica
- `spicy`: `0` = no picante | `1` = picante | `2` = muy picante | `3` = extra picante

### 2. Cambiar datos del restaurante
Busca en `index.html` estas cadenas y sustitúyelas:

| Buscar | Reemplazar por |
|--------|----------------|
| `Zaira Masala` | Nombre del restaurante |
| `Arganda del Rey` | Ciudad |
| `+34 XXX XXX XXX` | Teléfono real |
| `Tu Calle, Número` | Dirección real |
| `https://zairamasala.com` | Dominio real |
| `12:00 - 23:00` | Horario real |

### 3. Cambiar GloriaFood (si el cliente tiene su propia cuenta)
En `index.html` busca `data-glf-cuid` y `data-glf-ruid` y reemplaza los valores:

```html
data-glf-cuid="NUEVO_CUID_DEL_CLIENTE"
data-glf-ruid="NUEVO_RUID_DEL_CLIENTE"
```

### 4. Cambiar colores
En `css/styles.css` edita las variables CSS al inicio del archivo:

```css
:root {
  --saffron: #FF9933;   /* naranja principal */
  --gold:    #D4A437;   /* dorado */
  --crimson: #DC143C;   /* rojo detalles */
}
```

---

## 🔒 Configurar Stripe (pagos reales)
1. Crea una cuenta en [stripe.com](https://stripe.com)
2. Ve a Dashboard → Developers → API Keys
3. Copia tu **Publishable key** (empieza por `pk_live_...`)
4. En `js/payment.js` línea 8, reemplaza:
```javascript
const STRIPE_PUBLIC_KEY = 'pk_live_TU_CLAVE_REAL';
```

> ⚠️ Para cobros reales necesitas también un backend. Stripe no permite procesar pagos solo desde el frontend por seguridad. Opciones: Netlify Functions, Vercel Functions, o un servidor Node/PHP.

---

## ✅ Cumplimiento WCAG y accesibilidad (Ley española)

Este código cumple con los criterios de accesibilidad exigidos por el **Real Decreto 1112/2018** para sitios web públicos en España:

- ✅ Etiquetas semánticas HTML5: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<aside>`, `<address>`, `<figure>`
- ✅ Atributos `aria-label` en todos los elementos interactivos
- ✅ `aria-live` para contenido dinámico (carrito, filtros)
- ✅ `aria-expanded` en menús desplegables
- ✅ `aria-hidden="true"` en elementos decorativos
- ✅ `role="dialog"` y `aria-modal` en el carrito
- ✅ Navegación por teclado (Tab, Enter, Escape)
- ✅ Atributo `lang="es"` en el HTML
- ✅ `alt` descriptivo en todas las imágenes
- ✅ Contraste de colores adecuado
- ✅ `<time>` para fechas y horarios

---

## 🧠 Por qué JSON en lugar de PHP

| | PHP + MySQL (antes) | JSON (ahora) |
|---|---|---|
| ¿Necesita servidor? | ✅ Sí | ❌ No |
| ¿Funciona en GitHub Pages? | ❌ No | ✅ Sí |
| ¿Coste de hosting? | 💰 De pago | 🆓 Gratis |
| ¿Editar el menú? | SQL o panel admin | Editar un archivo de texto |
| ¿Velocidad de carga? | Consulta BD → respuesta | Archivo directo |

---

## 📞 Soporte GloriaFood

Si el cliente pierde acceso a su cuenta GloriaFood:
- Web de soporte: `orders.co/support`
- Email: `support@orders.co`
- Los IDs de la web (`data-glf-cuid` y `data-glf-ruid`) les ayudan a localizar la cuenta rápido

---

Hecho con 🧡 por **Luxia**
