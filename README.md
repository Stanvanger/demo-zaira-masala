# Zaira Masala — Web para Restaurante Indio

> Proyecto real para un restaurante de cocina india en Arganda del Rey, Madrid.
> El reto principal fue reemplazar un sistema PHP+MySQL por una solución estática
> compatible con GitHub Pages, sin perder ninguna funcionalidad.

🔗 **Demo en vivo:** https://stanvanger.github.io/demo-zaira-masala/

---

## ¿Qué problema resuelve este proyecto?

El restaurante usaba un sistema de menú en PHP conectado a una base de datos MySQL.
Eso funcionaba en su servidor propio, pero era imposible de desplegar en GitHub Pages,
que solo sirve archivos estáticos.

**El objetivo:** migrar toda la carta a un archivo `menu.json` que el frontend carga
con `fetch()`, manteniendo el carrito, los filtros por tipo de plato y el sistema de
pago online — sin tocar un servidor.

---

## Problemas técnicos que resolví y por qué importan

### 1. Migración de PHP+MySQL a JSON estático
**Problema:** la carta del restaurante vivía en una base de datos. Sin servidor,
no hay forma de ejecutar PHP ni consultar MySQL.

**Solución:** exporté toda la carta a un archivo `menu.json` estructurado con
categorías, platos, precios, etiquetas (vegano, vegetariano, picante) y descripciones.
El JavaScript carga ese archivo con `fetch()` y renderiza el HTML dinámicamente.

**Impacto:** la web funciona 100% en GitHub Pages sin coste de servidor. El cliente
puede actualizar la carta editando un archivo JSON, sin tocar el código.

```javascript
// Antes: llamada a menu.php en el servidor
// Después: fetch a un archivo estático
const response = await fetch('menu.json');
const data = await response.json();
renderMenu(data.categories);
```

---

### 2. Sistema de filtros sin framework
**Problema:** el menú tiene más de 70 platos en 10 categorías. Sin filtros,
el usuario tiene que desplazarse por toda la carta para encontrar opciones veganas
o sin picante.

**Solución:** construí un sistema de filtros múltiples en JavaScript vanilla.
Cada plato tiene atributos `data-vegan`, `data-vegetarian` y `data-spicy` en el HTML.
Los filtros se pueden combinar — puedes ver solo platos que sean a la vez veganos y picantes.

**Impacto:** mejor experiencia de usuario, especialmente para personas con
restricciones dietéticas. Lo construí sin librerías porque quería entender
cómo funciona el filtrado antes de usar una solución ya hecha.

```javascript
// Filtrado combinado con múltiples criterios activos
activeFilters.forEach(filter => {
  if (filter === 'vegan' && item.dataset.vegan === 'true') show = true;
  if (filter === 'spicy' && parseInt(item.dataset.spicy) > 0) show = true;
});
```

---

### 3. Carrito persistente con localStorage
**Problema:** si el usuario recargaba la página, perdía todo lo que había añadido
al carrito.

**Solución:** cada vez que se modifica el carrito, lo serializo con `JSON.stringify`
y lo guardo en `localStorage`. Al cargar la página, lo recupero con `JSON.parse`.
El usuario puede cerrar el navegador y retomar el pedido más tarde.

**Impacto:** experiencia más fluida, especialmente en móvil donde es habitual
cambiar de app y volver.

```javascript
function saveCart() {
  localStorage.setItem('zairamasala_cart', JSON.stringify(cart));
}
function loadCart() {
  const saved = localStorage.getItem('zairamasala_cart');
  if (saved) cart = JSON.parse(saved);
}
```

---

### 4. Integración GloriaFood sin romper el CSS
**Problema:** GloriaFood inyecta sus propios estilos y botones en el DOM.
Eso chocaba con el diseño del restaurante y generaba elementos duplicados.

**Solución:** usé CSS con `!important` de forma controlada para sobrescribir
los estilos del widget sin desactivarlo. Aprendí que hay casos donde `!important`
es la herramienta correcta, no un atajo sucio.

**Impacto:** el sistema de pedidos online del restaurante funciona con su propio
diseño, sin parecer un widget externo pegado encima.

---

### 5. SEO local para restaurante sin dirección fija en web
**Problema:** el restaurante no quería publicar su dirección exacta en la web,
pero necesitaba aparecer en búsquedas locales de Madrid y Arganda del Rey.

**Solución:** implementé Schema.org tipo `Restaurant` con `areaServed`
en lugar de `streetAddress`, más `FAQPage` con preguntas reales
("¿Dónde está Zaira Masala?", "¿Tienen opciones veganas?").
Las IAs responden esas preguntas directamente desde los datos estructurados.

**Impacto:** posicionamiento local sin exponer información que el cliente
no quería publicar.

---

### 6. Imágenes de platos uniformes sin recorte manual
**Problema:** las fotos del restaurante tenían tamaños distintos.
Algunas eran cuadradas, otras apaisadas. El grid quedaba desigual.

**Solución:** `object-fit: cover` con altura fija en todas las imágenes del menú.
El navegador recorta automáticamente centrando la imagen, sin deformarla.

**Impacto:** carta visualmente consistente sin tener que retocar 70 fotos manualmente.

```css
.menu-item-image {
  height: 200px;
  object-fit: cover;
  object-position: center;
}
```

---

## Stack técnico

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura con `<section>`, `<article>`, `<figure>`, `<aside>` |
| CSS3 vanilla | Variables, Grid, Flexbox, animaciones, responsive completo |
| JavaScript ES6 async/await | fetch(), carrito, filtros, localStorage |
| JSON | Fuente de datos del menú (sustituto del PHP) |
| Schema.org Restaurant | SEO estructurado local |
| ARIA | Accesibilidad completa |
| Stripe (modo demo) | Integración de pago online |
| GloriaFood | Sistema de pedidos y reservas del restaurante |
| particles.js | Partículas de fondo decorativas |
| AOS | Animaciones al hacer scroll |
| GitHub Pages | Despliegue estático |

---

## Estructura del proyecto

```
demo-zaira-masala/
├── index.html
├── menu.json           ← Carta completa: 10 categorías, ~70 platos
├── css/
│   ├── styles.css      ← Estilos principales + responsive
│   └── additional.css  ← Carrito, delivery, pagos
├── js/
│   ├── main.js         ← Menú, carrito, filtros, navegación
│   └── payment.js      ← Integración Stripe
└── images/
```

---

## Lo que aprendí construyendo esto

- Que `fetch()` y JSON pueden reemplazar completamente una base de datos
  cuando los datos no cambian frecuentemente
- Que `localStorage` es suficiente para persistencia ligera sin backend
- Que `!important` tiene su lugar cuando trabajas con widgets de terceros
- Que diseñar para 70 platos es diferente a diseñar para 10 —
  los filtros no son un extra, son necesarios

---

## Otros proyectos

| Proyecto | Descripción | Demo |
|---|---|---|
| Gasomotores | Taller mecánico con calculadora de mantenimiento | [Ver](https://stanvanger.github.io/gasomotores/) |
| PawStudio | Landing peluquería mascotas con reservas online | [Ver](https://stanvanger.github.io/pawstudioo/) |
| Blog Desierto | Blog de ejercicio con JS vanilla | [Ver](https://stanvanger.github.io/blog-desierto/) |

---

## Sobre mí

Soy **Carolina Quintero**, diseñadora publicitaria reconvertida en desarrolladora frontend.
Aprendo construyendo proyectos reales para clientes reales.

📧 kinterocarolina0@gmail.com
📱 +34 655 607 610
🔗 github.com/Stanvanger
