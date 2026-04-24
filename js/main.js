/* ========================================
   ZAIRA MASALA — JavaScript Principal
   Versión: 2.0 (sin PHP, lee menu.json)
   ======================================== */

const CONFIG = {
  dynamicWords:     ['MASALA', 'CURRY', 'TANDOOR', 'ESPECIAS', 'BIRYANI', 'TIKKA', 'SABOR', 'TRADICIÓN'],
  wordChangeInterval: 3000,
  particleColor:    '#D4A437',
  menuDataUrl:      'menu.json'   // ← aquí está el cambio clave: antes era menu.php
};

/* =========================================
   ARRANQUE — espera a que el DOM esté listo
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
  initLoadingScreen();
  initParticles();
  initDynamicText();
  initNavbar();
  initScrollAnimations();
  initCursor();
  initCart();
  loadMenu();           // ← carga el menú desde menu.json
});

/* =========================================
   LOADING SCREEN
   ========================================= */
function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (!loadingScreen) return;
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 2500);
}

/* =========================================
   PARTÍCULAS DE FONDO
   ========================================= */
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number:  { value: 80, density: { enable: true, value_area: 800 } },
      color:   { value: ['#D4A437', '#FF9933', '#FFD700'] },
      shape:   { type: 'circle' },
      opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
      size:    { value: 3,   random: true, anim: { enable: true, speed: 2, size_min: 0.1,    sync: false } },
      line_linked: { enable: true, distance: 150, color: '#D4A437', opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick:  { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.5 } },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}

/* =========================================
   TEXTO DINÁMICO ROTATIVO EN EL HERO
   ========================================= */
function initDynamicText() {
  const el = document.querySelector('.hero-title .dynamic');
  if (!el) return;

  let currentIndex = 0;
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  setInterval(() => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      currentIndex     = (currentIndex + 1) % CONFIG.dynamicWords.length;
      el.textContent   = CONFIG.dynamicWords[currentIndex];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 500);
  }, CONFIG.wordChangeInterval);
}

/* =========================================
   NAVEGACIÓN
   ========================================= */
function initNavbar() {
  const navbar    = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  // Efecto scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
  });

  // Menú móvil
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Smooth scroll + cierre de menú móvil
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.classList.remove('active');
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* =========================================
   CARGA DEL MENÚ DESDE menu.json
   — Reemplaza al PHP anterior —
   ========================================= */
async function loadMenu() {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;

  try {
    const response = await fetch(CONFIG.menuDataUrl);

    // Si el servidor devuelve error (404, 500...) lo capturamos
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    renderMenu(data.categories);
    initFilters();

  } catch (error) {
    console.error('Error cargando menu.json:', error);
    menuContainer.innerHTML = `
      <p role="alert" style="text-align:center; color: var(--saffron); padding: 2rem;">
        No se pudo cargar la carta. Por favor recarga la página.
      </p>`;
  }
}

/* =========================================
   RENDERIZADO DEL MENÚ
   ========================================= */
function renderMenu(categories) {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = categories.map(createCategoryHTML).join('');

  // Expandir / colapsar categorías
  menuContainer.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', function () {
      const items  = this.nextElementSibling;
      const toggle = this.querySelector('.category-toggle');
      const isOpen = items.classList.toggle('active');
      toggle.classList.toggle('active');
      // Accesibilidad: actualizar aria-expanded
      this.setAttribute('aria-expanded', isOpen);
    });
  });
}

function createCategoryHTML(category) {
  const itemsHTML = category.items.map(createItemHTML).join('');
  const categoryId = `cat-${category.id}`;

  return `
    <article class="menu-category" data-category="${category.id}" aria-labelledby="${categoryId}-title">
      <div class="category-header"
           role="button"
           tabindex="0"
           aria-expanded="false"
           aria-controls="${categoryId}-items"
           onkeydown="if(event.key==='Enter'||event.key===' ')this.click()">
        <div class="category-info">
          <span class="category-icon" aria-hidden="true">${category.icon}</span>
          <div>
            <h3 id="${categoryId}-title" class="category-title">${category.name}</h3>
            <p class="category-count">${category.items.length} platos</p>
          </div>
        </div>
        <span class="category-toggle" aria-hidden="true">▼</span>
      </div>
      <div id="${categoryId}-items" class="category-items">
        <ul class="menu-items-grid" role="list" aria-label="Platos de ${category.name}">
          ${itemsHTML}
        </ul>
      </div>
    </article>`;
}

function createItemHTML(item) {
  const itemId  = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const tagsHTML = buildTagsHTML(item);
  const spicyLevel = item.spicy || 0;

  // Descripción accesible de nivel de picante
  const spicyLabel = spicyLevel === 1 ? 'Picante' : spicyLevel === 2 ? 'Muy picante' : spicyLevel === 3 ? 'Extra picante' : '';
  const ariaLabel  = [
    item.name,
    `${item.price.toFixed(2)} euros`,
    item.vegan       ? 'Vegano'       : '',
    item.vegetarian  ? 'Vegetariano'  : '',
    spicyLabel
  ].filter(Boolean).join(', ');

  return `
    <li class="menu-item"
        role="listitem"
        data-vegan="${item.vegan || false}"
        data-vegetarian="${item.vegetarian || false}"
        data-spicy="${spicyLevel}">
      <article class="menu-item-content" aria-label="${ariaLabel}">
        <header class="menu-item-header">
          <h4 class="menu-item-name">${item.name}</h4>
          <span class="menu-item-price" aria-label="${item.price.toFixed(2)} euros">${item.price.toFixed(2)} €</span>
        </header>
        <p class="menu-item-description">${item.description}</p>
        ${tagsHTML ? `<div class="menu-item-tags" aria-label="Características">${tagsHTML}</div>` : ''}
        <button class="menu-item-add"
                aria-label="Añadir ${item.name} al carrito"
                onclick="addToCart('${itemId}', '${item.name.replace(/'/g, "\\'")}', ${item.price})">
          🛒 Añadir
        </button>
      </article>
    </li>`;
}

function buildTagsHTML(item) {
  let tags = '';
  if (item.vegan)                   tags += '<span class="tag tag-vegan" aria-label="Vegano">🟠 Vegano</span>';
  if (item.vegetarian && !item.vegan) tags += '<span class="tag tag-vegetarian" aria-label="Vegetariano">🟡 Vegetariano</span>';
  if (item.spicy === 1)             tags += '<span class="tag tag-spicy-1" aria-label="Picante">🌶️ Picante</span>';
  if (item.spicy === 2)             tags += '<span class="tag tag-spicy-2" aria-label="Muy picante">🌶️🌶️ Muy picante</span>';
  if (item.spicy === 3)             tags += '<span class="tag tag-spicy-3" aria-label="Extra picante">🌶️🌶️🌶️ Extra picante</span>';
  return tags;
}

/* =========================================
   FILTROS DEL MENÚ
   ========================================= */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      if (filter === 'all') {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        showAllItems();
      } else {
        document.querySelector('.filter-btn[data-filter="all"]').classList.remove('active');
        document.querySelector('.filter-btn[data-filter="all"]').setAttribute('aria-pressed', 'false');
        this.classList.toggle('active');
        const isActive = this.classList.contains('active');
        this.setAttribute('aria-pressed', isActive);
        applyFilters();
      }
    });
  });
}

function showAllItems() {
  document.querySelectorAll('.menu-item').forEach(item => item.style.display = '');
  document.querySelectorAll('.menu-category').forEach(cat => cat.style.display = '');
}

function applyFilters() {
  const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
    .map(btn => btn.dataset.filter)
    .filter(f => f !== 'all');

  if (activeFilters.length === 0) {
    showAllItems();
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    allBtn.classList.add('active');
    allBtn.setAttribute('aria-pressed', 'true');
    return;
  }

  document.querySelectorAll('.menu-item').forEach(item => {
    let show = false;
    activeFilters.forEach(filter => {
      if (filter === 'vegan'       && item.dataset.vegan === 'true')        show = true;
      if (filter === 'vegetarian'  && item.dataset.vegetarian === 'true')   show = true;
      if (filter === 'spicy'       && parseInt(item.dataset.spicy) > 0)     show = true;
    });
    item.style.display = show ? '' : 'none';
  });

  // Ocultar categorías sin platos visibles
  document.querySelectorAll('.menu-category').forEach(cat => {
    const total   = cat.querySelectorAll('.menu-item').length;
    const hidden  = cat.querySelectorAll('.menu-item[style="display: none;"]').length;
    cat.style.display = (hidden === total) ? 'none' : '';
  });
}

/* =========================================
   ANIMACIONES AL SCROLL (AOS)
   ========================================= */
function initScrollAnimations() {
  if (typeof AOS === 'undefined') return;
  AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 100 });
}

/* =========================================
   CURSOR PERSONALIZADO
   ========================================= */
function initCursor() {
  const cursor    = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  if (!cursor || !cursorDot) return;

  // Solo en pantallas grandes
  if (window.innerWidth < 1024) {
    cursor.style.display    = 'none';
    cursorDot.style.display = 'none';
    return;
  }

  document.addEventListener('mousemove', e => {
    cursor.style.left    = e.clientX - 10 + 'px';
    cursor.style.top     = e.clientY - 10 + 'px';
    cursorDot.style.left = e.clientX - 2.5 + 'px';
    cursorDot.style.top  = e.clientY - 2.5 + 'px';
  });

  document.querySelectorAll('a, button, .menu-item, .category-header').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform   = 'scale(1.5)';
      cursor.style.borderColor = '#FF9933';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform   = 'scale(1)';
      cursor.style.borderColor = '#D4A437';
    });
  });
}

/* =========================================
   CARRITO DE COMPRAS
   ========================================= */
let cart = [];

function initCart() {
  const cartIcon     = document.getElementById('cart-icon');
  const cartModal    = document.getElementById('cart-modal');
  const cartOverlay  = document.getElementById('cart-overlay');
  const cartClose    = document.getElementById('cart-close');
  const cartCheckout = document.getElementById('cart-checkout');

  if (!cartIcon) return;

  cartIcon.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  cartCheckout && cartCheckout.addEventListener('click', closeCart);

  // Cerrar con Escape (accesibilidad)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && cartModal.getAttribute('aria-hidden') === 'false') closeCart();
  });

  loadCart();
}

function openCart() {
  const modal   = document.getElementById('cart-modal');
  const overlay = document.getElementById('cart-overlay');
  modal.classList.add('open');
  overlay.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('cart-icon').setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  // Focus al primer elemento interactivo del modal
  document.getElementById('cart-close').focus();
}

function closeCart() {
  const modal   = document.getElementById('cart-modal');
  const overlay = document.getElementById('cart-overlay');
  modal.classList.remove('open');
  overlay.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.getElementById('cart-icon').setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart();
  updateCartUI();

  // Feedback visual en el botón
  const btn = event && event.target;
  if (btn) showAddedFeedback(btn);
}

function removeFromCart(id) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx > -1) {
    cart[idx].qty > 1 ? cart[idx].qty-- : cart.splice(idx, 1);
  }
  saveCart();
  updateCartUI();
}

function deleteFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartCount   = document.getElementById('cart-count');
  const cartItems   = document.getElementById('cart-items');
  const cartTotal   = document.getElementById('cart-total');
  const orderAmount = document.getElementById('order-amount');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const total      = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Contador del icono
  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.classList.remove('hidden');
  } else {
    cartCount.classList.add('hidden');
  }

  // Total
  cartTotal.textContent = total.toFixed(2) + ' €';
  if (orderAmount) orderAmount.value = total.toFixed(2);

  // Lista de items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty" role="status">
        <div class="cart-empty-icon" aria-hidden="true">🛒</div>
        <p>Tu carrito está vacío</p>
        <p><small>Añade platos desde el menú</small></p>
      </div>`;
  } else {
    cartItems.innerHTML = `
      <ul role="list" aria-label="Platos en el carrito">
        ${cart.map(item => `
          <li class="cart-item" role="listitem">
            <div class="cart-item-info">
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">${item.price.toFixed(2)} €</span>
            </div>
            <div class="cart-item-controls" role="group" aria-label="Cantidad de ${item.name}">
              <button onclick="removeFromCart('${item.id}')" aria-label="Reducir cantidad de ${item.name}">−</button>
              <span class="cart-item-qty" aria-label="${item.qty} unidades">${item.qty}</span>
              <button onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price})" aria-label="Aumentar cantidad de ${item.name}">+</button>
              <button onclick="deleteFromCart('${item.id}')" style="color:#DC143C" aria-label="Eliminar ${item.name} del carrito">×</button>
            </div>
          </li>`).join('')}
      </ul>`;
  }
}

function showAddedFeedback(button) {
  const original = button.innerHTML;
  button.innerHTML = '✓ Añadido';
  button.classList.add('added');
  button.setAttribute('aria-label', 'Añadido al carrito');
  setTimeout(() => {
    button.innerHTML = original;
    button.classList.remove('added');
    button.removeAttribute('aria-label');
  }, 1500);
}

function saveCart() {
  localStorage.setItem('zairamasala_cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem('zairamasala_cart');
    if (saved) {
      cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {
    console.warn('No se pudo cargar el carrito guardado.');
    cart = [];
  }
}

/* =========================================
   UTILIDADES
   ========================================= */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

window.addEventListener('resize', debounce(() => initCursor(), 250));
