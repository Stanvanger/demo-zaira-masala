/* ========================================
   ZAIRA MASALA - Stripe Payment Integration
   Pasarela de pago funcional
   ======================================== */

// IMPORTANTE: Reemplaza con tu clave pública de Stripe
// Obtén tu clave en: https://dashboard.stripe.com/apikeys
const STRIPE_PUBLIC_KEY = 'pk_test_TU_CLAVE_PUBLICA_AQUI';

// Variable para controlar si Stripe está disponible
let stripe = null;
let elements = null;
let cardElement = null;

// Inicializar Stripe cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    initStripe();
});

function initStripe() {
    // Verificar si Stripe.js está cargado
    if (typeof Stripe === 'undefined') {
        console.warn('Stripe.js no está cargado. El sistema de pagos no estará disponible.');
        showPaymentUnavailable();
        return;
    }

    // Verificar si tenemos una clave válida
    if (STRIPE_PUBLIC_KEY === 'pk_test_TU_CLAVE_PUBLICA_AQUI' || !STRIPE_PUBLIC_KEY.startsWith('pk_')) {
        console.warn('Clave de Stripe no configurada. Usando modo demo.');
        showDemoMode();
        return;
    }

    try {
        // Inicializar Stripe
        stripe = Stripe(STRIPE_PUBLIC_KEY);
        elements = stripe.elements();

        // Crear el elemento de tarjeta con estilos personalizados
        const style = {
            base: {
                color: '#F5F5F0',
                fontFamily: 'Inter, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#888880'
                }
            },
            invalid: {
                color: '#DC143C',
                iconColor: '#DC143C'
            }
        };

        cardElement = elements.create('card', { style: style });

        // Montar el elemento en el DOM
        const cardElementContainer = document.getElementById('card-element');
        if (cardElementContainer) {
            cardElement.mount('#card-element');

            // Manejar errores de validación en tiempo real
            cardElement.on('change', function (event) {
                const displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
            });
        }

        // Configurar el formulario
        setupPaymentForm();

    } catch (error) {
        console.error('Error inicializando Stripe:', error);
        showPaymentUnavailable();
    }
}

function setupPaymentForm() {
    const form = document.getElementById('payment-form');
    if (!form) return;

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Obtener datos del formulario
        const name = document.getElementById('customer-name').value;
        const email = document.getElementById('customer-email').value;
        const amount = parseFloat(document.getElementById('order-amount').value);

        // Validar
        if (!name || !email || !amount || amount <= 0) {
            showError('Por favor, completa todos los campos correctamente.');
            return;
        }

        // Deshabilitar botón y mostrar spinner
        setLoading(true);

        try {
            // En un entorno real, aquí harías una llamada a tu backend
            // para crear un PaymentIntent y obtener el client_secret

            // DEMO: Simular proceso de pago
            await simulatePayment(name, email, amount);

        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    });
}

async function simulatePayment(name, email, amount) {
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mostrar mensaje de éxito (DEMO)
    const formWrapper = document.querySelector('.payment-form-wrapper');
    formWrapper.innerHTML = `
        <div class="payment-success">
            <div class="success-icon">✅</div>
            <h3>¡Pago Simulado Exitoso!</h3>
            <p>Gracias, <strong>${name}</strong></p>
            <p>Importe: <strong>${amount.toFixed(2)} €</strong></p>
            <p class="demo-note">
                ⚠️ Este es un modo demo. Para pagos reales, 
                configura tu clave de Stripe en <code>payment.js</code>
            </p>
            <button class="btn btn-primary" onclick="location.reload()">
                Hacer otro pago
            </button>
        </div>
    `;
}

function showDemoMode() {
    const cardElement = document.getElementById('card-element');
    if (cardElement) {
        cardElement.innerHTML = `
            <div style="padding: 10px; background: rgba(255,153,51,0.1); border-radius: 8px; text-align: center;">
                <span style="color: #FF9933;">🔧 Modo Demo</span><br>
                <small style="color: #888;">Configura tu clave de Stripe para pagos reales</small>
            </div>
        `;
    }
}

function showPaymentUnavailable() {
    const container = document.querySelector('.payment-container');
    if (container) {
        container.innerHTML = `
            <span class="section-badge">💳 Pago Seguro</span>
            <h2 class="section-title">Pago Online No Disponible</h2>
            <p class="section-description">
                El sistema de pagos está temporalmente fuera de servicio.
                Por favor, contacta con el restaurante para realizar tu pedido.
            </p>
            <a href="tel:+34XXXXXXXXX" class="btn btn-primary">
                📞 Llamar para Pedir
            </a>
        `;
    }
}

function setLoading(isLoading) {
    const submitButton = document.getElementById('submit-payment');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');

    if (isLoading) {
        submitButton.disabled = true;
        buttonText.textContent = 'Procesando...';
        spinner.classList.remove('hidden');
    } else {
        submitButton.disabled = false;
        buttonText.textContent = '💳 Pagar Ahora';
        spinner.classList.add('hidden');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('card-errors');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.color = '#DC143C';
    }
}

// Añadir estilos para el mensaje de éxito
const successStyles = document.createElement('style');
successStyles.textContent = `
    .payment-success {
        text-align: center;
        padding: 2rem;
    }
    .success-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    .payment-success h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.8rem;
        color: #F5F5F0;
        margin-bottom: 1rem;
    }
    .payment-success p {
        color: #B8B8B0;
        margin-bottom: 0.5rem;
    }
    .demo-note {
        margin-top: 1.5rem;
        padding: 1rem;
        background: rgba(255, 153, 51, 0.1);
        border-radius: 10px;
        font-size: 0.85rem;
    }
    .demo-note code {
        background: rgba(0,0,0,0.3);
        padding: 2px 6px;
        border-radius: 4px;
    }
`;
document.head.appendChild(successStyles);
