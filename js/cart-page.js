document.addEventListener('DOMContentLoaded', () => {
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    const generatePdfButton = document.getElementById('generate-pdf-button');

    let cart = JSON.parse(localStorage.getItem('emmaFireworksCart')) || [];

    function renderCartSummary() {
        if (!cartSummaryContainer) return;

        if (cart.length === 0) {
            cartSummaryContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Tu carrito está vacío.</p>';
            if(generatePdfButton) generatePdfButton.disabled = true;
            updateHeaderCartCount();
            return;
        }

        if(generatePdfButton) generatePdfButton.disabled = false;

        let total = 0;
        let summaryHtml = `
            <div class="summary-table-header hidden md:grid">
                <div class="header-cell">Producto</div>
                <div class="header-cell text-center">Precio</div>
                <div class="header-cell text-center">Cantidad</div>
                <div class="header-cell text-right">Subtotal</div>
                <div class="header-cell text-center">Acciones</div>
            </div>
            <div class="summary-table-body">
        `;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            summaryHtml += `
                <div class="summary-table-row" data-id="${item.id}">
                    <div class="table-cell" data-label="Producto">
                        <div class="flex items-center">
                            <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-4 hidden sm:block">
                            <span>${item.name}</span>
                        </div>
                    </div>
                    <div class="table-cell" data-label="Precio">${formatCurrency(item.price)}</div>
                    <div class="table-cell" data-label="Cantidad">
                        <div class="flex items-center justify-end md:justify-center">
                            <button class="quantity-change-btn decrease-quantity" data-id="${item.id}" aria-label="Disminuir cantidad">-</button>
                            <span class="quantity-value mx-3">${item.quantity}</span>
                            <button class="quantity-change-btn increase-quantity" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
                        </div>
                    </div>
                    <div class="table-cell text-right md:text-right" data-label="Subtotal">${formatCurrency(subtotal)}</div>
                    <div class="table-cell" data-label="Acciones">
                         <div class="flex items-center justify-end md:justify-center">
                            <button class="remove-item-btn" data-id="${item.id}" aria-label="Eliminar producto">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        summaryHtml += `
            </div>
            <div class="summary-table-footer">
                <div class="footer-label">Total:</div>
                <div class="footer-value">${formatCurrency(total)}</div>
            </div>
        `;
        cartSummaryContainer.innerHTML = summaryHtml;
        updateHeaderCartCount();
    }

    function updateHeaderCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountDesktop = document.getElementById('cart-count-desktop');
        const cartCountMobile = document.getElementById('cart-count-mobile');
        if (cartCountDesktop) cartCountDesktop.textContent = totalItems;
        if (cartCountMobile) cartCountMobile.textContent = totalItems;
    }

    function addCartActionListeners() {
        if (!cartSummaryContainer) return;

        cartSummaryContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (!button) return;

            const productId = button.dataset.id;
            if (!productId) return;

            const itemIndex = cart.findIndex(i => i.id === productId);
            if (itemIndex === -1) return;

            if (button.classList.contains('increase-quantity')) {
                cart[itemIndex].quantity++;
            } else if (button.classList.contains('decrease-quantity')) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    // Si la cantidad es 1, eliminar el producto
                    cart.splice(itemIndex, 1);
                }
            } else if (button.classList.contains('remove-item-btn')) {
                cart.splice(itemIndex, 1);
            }

            // Guardar el estado actualizado en localStorage
            localStorage.setItem('emmaFireworksCart', JSON.stringify(cart));

            // Volver a renderizar el resumen del carrito sin recargar la página
            renderCartSummary();
        });
    }

    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', () => {
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();

            if (!name || !phone || !address) {
                Swal.fire({
                    icon: 'error',
                    title: 'Formulario Incompleto',
                    text: 'Por favor, complete todos los campos de información de entrega.',
                    confirmButtonColor: '#fBBF24'
                });
                return;
            }

            if (phone.length < 10) {
                Swal.fire({
                    icon: 'error',
                    title: 'Teléfono Inválido',
                    text: 'El número de teléfono debe tener al menos 10 dígitos.',
                    confirmButtonColor: '#fBBF24'
                });
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Título principal
            doc.setFontSize(18);
            doc.setTextColor(255, 0, 0); // Rojo para "Emma Fireworks"
            doc.text("Emma Fireworks", 105, 20, { align: "center" });

            // Subtítulo
            doc.setFontSize(20);
            doc.setTextColor(0, 0, 0);
            doc.text("Resumen del Pedido", doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

            // Datos del cliente
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text("Nombre: " + name, 14, 40);
            doc.text("Teléfono: " + phone, 14, 46);
            doc.text("Dirección: " + address, 14, 52);

            // Tabla
            const tableColumn = ["Producto", "Cantidad", "Precio Unitario", "Subtotal"];
            const tableRows = [];

            let total = 0;

            cart.forEach(item => {
                const subtotal = item.price * item.quantity;
                tableRows.push([
                    item.name,
                    item.quantity,
                    `$${item.price.toFixed(2)}`,
                    `$${subtotal.toFixed(2)}`
                ]);
                total += subtotal;
            });

            doc.autoTable(tableColumn, tableRows, { startY: 60 });

            const finalY = doc.autoTable.previous.finalY;

            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(`Total General: $${total.toFixed(2)}`, doc.internal.pageSize.getWidth() - 14, finalY + 15, { align: 'right' });

            doc.save('resumen-pedido-emmafireworks.pdf');

            localStorage.removeItem('emmaFireworksCart');
            window.location.href = 'catalogo.html';
        });
    }

    // Inicializar la página del carrito
    renderCartSummary();
    addCartActionListeners();
});
