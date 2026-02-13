/* ========================================
   ZAIRA MASALA - JavaScript Principal
   Animaciones, Interactividad, Menú
   ======================================== */

// ===== CONFIGURACIÓN =====
const CONFIG = {
    dynamicWords: ['MASALA', 'CURRY', 'TANDOOR', 'ESPECIAS', 'BIRYANI', 'TIKKA', 'SABOR', 'TRADICIÓN'],
    wordChangeInterval: 3000,
    particleColor: '#D4A437'
};

// ===== DATOS DEL MENÚ (JSON) =====
const MENU_DATA = {
    categories: [
        {
            id: 'entrantes-veg',
            name: 'Entrantes Vegetarianos',
            icon: '🥗',
            description: 'Crujientes, aromáticos y llenos de sabor',
            items: [
                { name: 'Pakora', price: 4.95, description: 'Verduras variadas rebozadas en harina de garbanzo y fritas.', vegan: true, vegetarian: true },
                { name: 'Samosas de Verduras (x2)', price: 4.95, description: 'Empanadillas rellenas de patata, guisantes, cilantro y especias.', vegetarian: true },
                { name: 'Veg Mix Platter', price: 13.95, description: 'Surtido de aperitivos vegetarianos fritos. Ideal para compartir.', vegetarian: true },
                { name: 'Onion Bhaji', price: 4.95, description: 'Cebolla rebozada en harina de garbanzo, crujiente y especiada.', vegan: true, vegetarian: true },
                { name: 'Aloo Tikki', price: 5.50, description: 'Mini hamburguesas de patata rellenas de queso y especias.', vegetarian: true }
            ]
        },
        {
            id: 'entrantes-tandoor',
            name: 'Entrantes Tandoor',
            icon: '🔥',
            description: 'Marinados en especias indias y asados al horno',
            items: [
                { name: 'Chicken Tikka', price: 10.90, description: 'Pechuga de pollo marinada con yogur, jengibre y limón.', spicy: 1 },
                { name: 'Lamb Tikka', price: 12.95, description: 'Trozos de cordero marinados con yogur, lima y hierbas aromáticas.', spicy: 1 },
                { name: 'Chicken Tandoori', price: 10.50, description: 'Pollo macerado con yogur, jengibre y ajo, asado al tandoor.' },
                { name: 'King Prawn Tandoori', price: 14.95, description: 'Langostinos al horno tandoor con especias tradicionales.' },
                { name: 'Mantra Special Mix Grill', price: 19.95, description: 'Pollo Tandoori, Chicken Tikka, Lamb Tikka y King Prawn Tandoori.', spicy: 1 }
            ]
        },
        {
            id: 'pollo',
            name: 'Platos de Pollo',
            icon: '🍗',
            description: 'Currys indios con diferentes salsas',
            items: [
                { name: 'Chicken Tikka Masala', price: 12.95, description: 'Pollo tikka en salsa de tomate, nata y especias aromáticas.' },
                { name: 'Butter Chicken', price: 12.95, description: 'Pollo cocinado en salsa cremosa de mantequilla y especias.' },
                { name: 'Chicken Korma', price: 12.80, description: 'Curry suave con frutos secos, leche y nata.' },
                { name: 'Mango Chicken', price: 12.50, description: 'Pollo con mango en salsa de azafrán y crema.', spicy: 1 },
                { name: 'Mantra Special Chicken Curry', price: 12.50, description: 'Pollo con especias indias y mantequilla clarificada (ghee).' },
                { name: 'Kadai Chicken', price: 14.95, description: 'Pollo con cebolla, tomate y semillas de cilantro.' },
                { name: 'Chicken Jalfrezi', price: 13.50, description: 'Pollo con cebolla, tomate y pimientos verdes y rojos.', spicy: 1 },
                { name: 'Chicken Madrasi', price: 13.50, description: 'Pollo con salsa picante de tomate y especias.', spicy: 2 },
                { name: 'Chicken Vindaloo', price: 13.95, description: 'Pollo con salsa muy picante.', spicy: 3 }
            ]
        },
        {
            id: 'vegetarianos',
            name: 'Platos Vegetarianos',
            icon: '🥦',
            description: 'Sabor auténtico sin carne',
            items: [
                { name: 'Baingan Bhaji', price: 10.50, description: 'Berenjena al horno con cebolla y especias.', vegan: true },
                { name: 'Chana Masala', price: 10.95, description: 'Garbanzos con cebolla, tomate y especias.', vegan: true, spicy: 1 },
                { name: 'Dal Tadka', price: 10.95, description: 'Lentejas con tomate y cebolla.' },
                { name: 'Veg Korma', price: 10.50, description: 'Verduras en salsa de frutos secos y leche de coco.', vegan: true },
                { name: 'Mix Vegetable', price: 10.95, description: 'Curry de verduras con salsa de cebolla, tomate y especias.', vegan: true },
                { name: 'Palak Paneer', price: 10.95, description: 'Queso fresco indio en salsa de espinacas.', vegetarian: true },
                { name: 'Kadai Paneer', price: 10.95, description: 'Queso fresco con cebolla, tomate y semillas de cilantro.', vegetarian: true }
            ]
        },
        {
            id: 'cordero',
            name: 'Especialidades de Cordero',
            icon: '🐑',
            description: 'El sabor más intenso de la India',
            items: [
                { name: 'Lamb Korma', price: 13.50, description: 'Cordero en salsa de frutos secos y leche de coco.' },
                { name: 'Lamb Roganjosh', price: 13.50, description: 'Cordero con cebolla, tomate, jengibre, ajo y especias.', spicy: 1 },
                { name: 'Lamb Tikka Masala', price: 13.50, description: 'Cordero tikka en salsa de tomate y nata.' },
                { name: 'Lamb Madrasi', price: 13.50, description: 'Cordero con salsa picante de tomate y especias.', spicy: 2 },
                { name: 'Lamb Kadai', price: 13.95, description: 'Cordero con cebolla, tomate y cilantro.' },
                { name: 'Lamb Vindaloo', price: 13.95, description: 'Cordero con salsa muy picante.', spicy: 3 },
                { name: 'Lamb Jalfrezi', price: 13.95, description: 'Cordero con cebolla, tomate y pimientos.', spicy: 1 },
                { name: 'Lamb Palak', price: 13.95, description: 'Cordero en salsa de espinacas.' },
                { name: 'Mantra Special Lamb Curry', price: 14.95, description: 'Nuestra receta especial de cordero con especias selectas.' }
            ]
        },
        {
            id: 'mar',
            name: 'Platos del Mar',
            icon: '🦐',
            description: 'Frescura del océano con especias indias',
            items: [
                { name: 'Prawn Masala', price: 11.95, description: 'Gambas en salsa de especias.' },
                { name: 'Prawn Madrasi', price: 12.95, description: 'Gambas con salsa picante de tomate y especias.', spicy: 2 },
                { name: 'Prawn Korma', price: 12.95, description: 'Gambas con salsa de frutos secos y leche de coco.' },
                { name: 'Prawn Vindaloo', price: 12.95, description: 'Gambas con salsa muy picante.', spicy: 3 },
                { name: 'Prawn Jalfrezi', price: 12.95, description: 'Gambas con cebolla, tomate y pimientos.', spicy: 1 }
            ]
        },
        {
            id: 'pan',
            name: 'Pan Tandoori',
            icon: '🫓',
            description: 'Recién horneado en nuestro tandoor',
            items: [
                { name: 'Plain Naan', price: 3.25, description: 'Pan tradicional indio.' },
                { name: 'Onion Naan', price: 3.45, description: 'Naan con cebolla.' },
                { name: 'Garlic Naan', price: 3.90, description: 'Naan con ajo.' },
                { name: 'Butter Naan', price: 4.45, description: 'Naan con mantequilla.' },
                { name: 'Cheese Naan', price: 4.95, description: 'Naan relleno de queso.' },
                { name: 'Peshawari Naan', price: 5.50, description: 'Pan dulce con frutos secos y coco.' }
            ]
        },
        {
            id: 'acompañamientos',
            name: 'Acompañamientos',
            icon: '🍚',
            description: 'Arroces y guarniciones',
            items: [
                { name: 'Pulao Rice', price: 3.95, description: 'Arroz basmati aromático.' },
                { name: 'Jeera Rice', price: 3.95, description: 'Arroz con comino.' },
                { name: 'Lemon Rice', price: 4.95, description: 'Arroz con limón.' },
                { name: 'Matar Pulao', price: 5.95, description: 'Arroz con guisantes.' },
                { name: 'Kashmiri Pulao', price: 6.95, description: 'Arroz con frutos secos de Cachemira.' },
                { name: 'Vegetable Biryani', price: 10.50, description: 'Arroz especiado con verduras.' },
                { name: 'Chicken Biryani', price: 10.50, description: 'Arroz especiado con pollo.' },
                { name: 'Mutton Biryani', price: 11.50, description: 'Arroz especiado con cordero.' },
                { name: 'Prawn Biryani', price: 12.95, description: 'Arroz especiado con gambas.' }
            ]
        },
        {
            id: 'postres',
            name: 'Postres Indios',
            icon: '🍨',
            description: 'Dulces tradicionales',
            items: [
                { name: 'Kulfi Pistacho', price: 4.90, description: 'Helado tradicional indio de pistacho.' },
                { name: 'Kulfi Mango', price: 4.50, description: 'Helado tradicional indio de mango.' }
            ]
        },
        {
            id: 'bebidas',
            name: 'Bebidas',
            icon: '🥤',
            description: 'Para refrescarte',
            items: [
                { name: 'Agua Natural (0,5 L)', price: 2.50, description: 'Agua mineral.' },
                { name: 'Agua con Gas', price: 2.50, description: 'Agua mineral con gas.' },
                { name: 'Coca-Cola', price: 2.95, description: 'Refresco clásico.' },
                { name: 'Coca-Cola Zero', price: 2.95, description: 'Sin azúcar.' },
                { name: 'Fanta', price: 2.95, description: 'Refresco de naranja.' },
                { name: 'Cerveza India Kingfisher', price: 3.50, description: 'Cerveza premium de la India. +18' },
                { name: 'Cerveza India Cobra', price: 3.50, description: 'Cerveza suave de la India. +18' },
                { name: 'Cerveza Sin Alcohol', price: 2.95, description: 'Para todos.' }
            ]
        }
    ]
};

// ===== DOM LOADED =====
document.addEventListener('DOMContentLoaded', function () {
    initLoadingScreen();
    initParticles();
    initDynamicText();
    initNavbar();
    initMenu();
    initScrollAnimations();
    initCursor();
    initCart();
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2500);
    }
}

// ===== PARTÍCULAS DE FONDO =====
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#D4A437', '#FF9933', '#FFD700']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#D4A437',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===== TEXTO DINÁMICO (EFECTO ROTATIVO) =====
function initDynamicText() {
    const dynamicElement = document.querySelector('.hero-title .dynamic');
    if (!dynamicElement) return;

    let currentIndex = 0;
    const words = CONFIG.dynamicWords;

    function changeWord() {
        // Fade out
        dynamicElement.style.opacity = '0';
        dynamicElement.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            dynamicElement.textContent = words[currentIndex];

            // Fade in
            dynamicElement.style.opacity = '1';
            dynamicElement.style.transform = 'translateY(0)';
        }, 500);
    }

    // Configurar transición
    dynamicElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    // Iniciar rotación
    setInterval(changeWord, CONFIG.wordChangeInterval);
}

// ===== NAVEGACIÓN =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Cerrar menú móvil
                navLinks.classList.remove('active');
            }
        });
    });
}

// ===== MENÚ INTERACTIVO =====
function initMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    // Renderizar categorías
    renderMenu(MENU_DATA.categories);

    // Inicializar filtros
    initFilters();
}

function renderMenu(categories) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';

    categories.forEach(category => {
        const categoryHTML = createCategoryHTML(category);
        menuContainer.innerHTML += categoryHTML;
    });

    // Añadir event listeners para expandir/colapsar
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function () {
            const items = this.nextElementSibling;
            const toggle = this.querySelector('.category-toggle');

            items.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });
}

function createCategoryHTML(category) {
    const itemsHTML = category.items.map(item => createItemHTML(item)).join('');

    return `
        <div class="menu-category" data-category="${category.id}">
            <div class="category-header">
                <div class="category-info">
                    <div class="category-icon">${category.icon}</div>
                    <div>
                        <h3 class="category-title">${category.name}</h3>
                        <p class="category-count">${category.items.length} platos</p>
                    </div>
                </div>
                <div class="category-toggle">▼</div>
            </div>
            <div class="category-items">
                <div class="menu-items-grid">
                    ${itemsHTML}
                </div>
            </div>
        </div>
    `;
}

function createItemHTML(item) {
    let tags = '';

    if (item.vegan) {
        tags += '<span class="tag tag-vegan">🟠 Vegano</span>';
    }
    if (item.vegetarian && !item.vegan) {
        tags += '<span class="tag tag-vegetarian">🟡 Vegetariano</span>';
    }
    if (item.spicy === 1) {
        tags += '<span class="tag tag-spicy-1">🌶️ Picante</span>';
    }
    if (item.spicy === 2) {
        tags += '<span class="tag tag-spicy-2">🌶️🌶️ Muy picante</span>';
    }
    if (item.spicy === 3) {
        tags += '<span class="tag tag-spicy-3">🌶️🌶️🌶️ Extra picante</span>';
    }

    // Crear ID único para el item
    const itemId = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    return `
        <div class="menu-item" data-vegan="${item.vegan || false}" data-vegetarian="${item.vegetarian || false}" data-spicy="${item.spicy || 0}">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h4 class="menu-item-name">${item.name}</h4>
                    <span class="menu-item-price">${item.price.toFixed(2)} €</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                ${tags ? `<div class="menu-item-tags">${tags}</div>` : ''}
                <button class="menu-item-add" onclick="addToCart('${itemId}', '${item.name}', ${item.price})">
                    🛒 Añadir
                </button>
            </div>
        </div>
    `;
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Toggle active state
            if (filter === 'all') {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                showAllItems();
            } else {
                document.querySelector('.filter-btn[data-filter="all"]').classList.remove('active');
                this.classList.toggle('active');
                applyFilters();
            }
        });
    });
}

function showAllItems() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.display = 'block';
    });
    document.querySelectorAll('.menu-category').forEach(cat => {
        cat.style.display = 'block';
    });
}

function applyFilters() {
    const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
        .map(btn => btn.dataset.filter)
        .filter(f => f !== 'all');

    if (activeFilters.length === 0) {
        showAllItems();
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        return;
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        let show = false;

        activeFilters.forEach(filter => {
            if (filter === 'vegan' && item.dataset.vegan === 'true') show = true;
            if (filter === 'vegetarian' && item.dataset.vegetarian === 'true') show = true;
            if (filter === 'spicy' && parseInt(item.dataset.spicy) > 0) show = true;
        });

        item.style.display = show ? 'block' : 'none';
    });

    // Ocultar categorías vacías
    document.querySelectorAll('.menu-category').forEach(cat => {
        const visibleItems = cat.querySelectorAll('.menu-item[style="display: block"], .menu-item:not([style])');
        const hiddenItems = cat.querySelectorAll('.menu-item[style="display: none"]');
        cat.style.display = hiddenItems.length === cat.querySelectorAll('.menu-item').length ? 'none' : 'block';
    });
}

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
}

// ===== CURSOR PERSONALIZADO =====
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (!cursor || !cursorDot) return;

    // Solo en desktop
    if (window.innerWidth < 1024) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursorDot.style.left = e.clientX - 2.5 + 'px';
        cursorDot.style.top = e.clientY - 2.5 + 'px';
    });

    // Efecto hover en elementos interactivos
    document.querySelectorAll('a, button, .menu-item, .category-header').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#FF9933';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#D4A437';
        });
    });
}

// ===== UTILIDADES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Redimensionar
window.addEventListener('resize', debounce(() => {
    initCursor();
}, 250));

// ===== CARRITO DE COMPRAS =====
let cart = [];

function initCart() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartCheckout = document.getElementById('cart-checkout');

    if (!cartIcon) return;

    // Abrir carrito
    cartIcon.addEventListener('click', openCart);

    // Cerrar carrito
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Checkout - cerrar carrito y llevar a pago
    cartCheckout.addEventListener('click', () => {
        closeCart();
    });

    // Cargar carrito de localStorage
    loadCart();
}

function openCart() {
    document.getElementById('cart-modal').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cart-modal').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

function addToCart(id, name, price) {
    // Buscar si ya existe en el carrito
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }

    // Guardar y actualizar UI
    saveCart();
    updateCartUI();

    // Feedback visual
    showAddedFeedback(event.target);
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        if (cart[index].qty > 1) {
            cart[index].qty -= 1;
        } else {
            cart.splice(index, 1);
        }
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
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const orderAmount = document.getElementById('order-amount');

    // Contar items
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    // Actualizar contador
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }

    // Calcular total
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotal.textContent = total.toFixed(2) + ' €';

    // Actualizar el campo de importe en formulario de pago
    if (orderAmount) {
        orderAmount.value = total.toFixed(2);
    }

    // Renderizar items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Tu carrito está vacío</p>
                <p><small>Añade platos desde el menú</small></p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                </div>
                <div class="cart-item-controls">
                    <button onclick="removeFromCart('${item.id}')">-</button>
                    <span class="cart-item-qty">${item.qty}</span>
                    <button onclick="addToCart('${item.id}', '${item.name}', ${item.price})">+</button>
                    <button onclick="deleteFromCart('${item.id}')" style="color: #DC143C;">×</button>
                </div>
            </div>
        `).join('');
    }
}

function showAddedFeedback(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Añadido';
    button.classList.add('added');

    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('added');
    }, 1500);
}

function saveCart() {
    localStorage.setItem('zairamasala_cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('zairamasala_cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}
