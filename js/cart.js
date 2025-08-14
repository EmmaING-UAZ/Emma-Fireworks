document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountDesktop = document.getElementById('cart-count-desktop');
    const cartCountMobile = document.getElementById('cart-count-mobile');
    const checkoutButton = document.getElementById('checkout-button');
    const clearCartButton = document.getElementById('clear-cart-button');

    let cart = JSON.parse(localStorage.getItem('emmaFireworksCart')) || [];

    function saveCart() {
        localStorage.setItem('emmaFireworksCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountDesktop) cartCountDesktop.textContent = totalItems;
        if (cartCountMobile) cartCountMobile.textContent = totalItems;
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalElement) cartTotalElement.textContent = formatCurrency(total);
        if (checkoutButton) {
            checkoutButton.disabled = cart.length === 0;
        }
    }

    function renderCartItems() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = ''; // Limpiar items actuales

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center">Tu carrito está vacío.</p>';
            updateCartTotal();
            updateCartCount();
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('flex', 'justify-between', 'items-center', 'py-3', 'border-b');
            itemElement.innerHTML = `
                <div class="flex items-center space-x-3 flex-grow">
                    <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-grow">
                        <h4 class="font-semibold text-sm text-gray-800 leading-tight">${item.name}</h4>
                        <p class="text-xs text-gray-500">${formatCurrency(item.price)}</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <button class="quantity-change-btn decrease-quantity" data-id="${item.id}" aria-label="Disminuir cantidad">-</button>
                            <span class="quantity-value text-sm">${item.quantity}</span>
                            <button class="quantity-change-btn increase-quantity" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-end space-y-1">
                    <span class="font-semibold text-sm text-gray-800">${formatCurrency(item.price * item.quantity)}</span>
                    <button data-id="${item.id}" class="remove-from-cart-btn text-red-500 hover:text-red-700" aria-label="Eliminar ${item.name} del carrito">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        updateCartTotal();
        updateCartCount();
    }

    function addRemoveEventListeners() {
        cartItemsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            const itemId = button.dataset.id;
            const itemInCart = cart.find(item => item.id === itemId);
            if (!itemInCart) return;

            if (button.classList.contains('remove-from-cart-btn')) {
                removeItemFromCart(itemId);
            } else if (button.classList.contains('increase-quantity')) {
                updateItemQuantity(itemId, itemInCart.quantity + 1);
            } else if (button.classList.contains('decrease-quantity')) {
                updateItemQuantity(itemId, itemInCart.quantity - 1);
            }
        });
    }

    window.addToCart = function(product, quantity = 1) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        saveCart();
        renderCartItems();
        // Opcional: abrir el panel del carrito al agregar un item
        // document.getElementById('cart-button-desktop').click(); // Simula click para abrir
    }

    window.updateItemQuantity = function(productId, newQuantity) {
        const itemInCart = cart.find(item => item.id === productId);
        if (itemInCart) {
            if (newQuantity > 0) {
                itemInCart.quantity = newQuantity;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
            saveCart();
            renderCartItems();
        }
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCartItems();
    }

    function clearCart() {
        cart = [];
        saveCart();
        renderCartItems();
    }

    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                // La funcionalidad de generar PDF se maneja en pdfGenerator.js
            }
        });
    }


    // Inicializar carrito al cargar la página
    renderCartItems();
    addRemoveEventListeners();

    // === Funciones Globales para ser usadas por otras páginas ===

    // Función para actualizar la cantidad (usada por cart-page.js)
    window.updateCartItemQuantity = function(productId, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('emmaFireworksCart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
            } else {
                // Si la nueva cantidad es 0 o menos, eliminamos el item
                cart.splice(itemIndex, 1);
            }
            localStorage.setItem('emmaFireworksCart', JSON.stringify(cart));
        }
    };

    // Función para eliminar un item (usada por cart-page.js)
    window.removeCartItem = function(productId) {
        let cart = JSON.parse(localStorage.getItem('emmaFireworksCart')) || [];
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('emmaFireworksCart', JSON.stringify(updatedCart));
    };
});

// Helper para formatear moneda (global o importado si se usa módulos)
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
