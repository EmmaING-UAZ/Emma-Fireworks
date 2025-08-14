document.addEventListener('DOMContentLoaded', () => {
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    const generatePdfButton = document.getElementById('generate-pdf-button');

    const cart = JSON.parse(localStorage.getItem('emmaFireworksCart')) || [];

    function renderCartSummary() {
        if (cart.length === 0) {
            cartSummaryContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            generatePdfButton.disabled = true;
            return;
        }

        let total = 0;
        let summaryHtml = `
            <div class="summary-table-header">
                <div class="header-cell">Producto</div>
                <div class="header-cell">Precio</div>
                <div class="header-cell">Cantidad</div>
                <div class="header-cell">Subtotal</div>
                <div class="header-cell">Acciones</div>
            </div>
            <div class="summary-table-body">
        `;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            summaryHtml += `
                <div class="summary-table-row" data-id="${item.id}">
                    <div class="table-cell" data-label="Producto">${item.name}</div>
                    <div class="table-cell" data-label="Precio">$${item.price.toFixed(2)}</div>
                    <div class="table-cell" data-label="Cantidad">
                        <div class="flex items-center justify-end md:justify-start">
                            <button class="quantity-change-btn decrease-quantity" data-id="${item.id}" aria-label="Disminuir cantidad">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-change-btn increase-quantity" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
                        </div>
                    </div>
                    <div class="table-cell" data-label="Subtotal">$${subtotal.toFixed(2)}</div>
                    <div class="table-cell" data-label="Acciones">
                        <button class="remove-item-btn" data-id="${item.id}" aria-label="Eliminar producto">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            `;
            total += subtotal;
        });

        summaryHtml += `
            </div>
            <div class="summary-table-footer">
                <div class="footer-label">Total:</div>
                <div class="footer-value">$${total.toFixed(2)}</div>
            </div>
        `;
        cartSummaryContainer.innerHTML = summaryHtml;
        addCartActionListeners();
    }

    function addCartActionListeners() {
        const cartContainer = document.getElementById('cart-summary-container');

        cartContainer.addEventListener('click', (event) => {
            const target = event.target;
            const button = target.closest('button');
            if (!button) return;

            const row = button.closest('.summary-table-row');
            const productId = row.dataset.id;

            if (button.classList.contains('increase-quantity')) {
                const item = cart.find(i => i.id === productId);
                if (item) {
                    item.quantity++;
                    localStorage.setItem('emmaFireworksCart', JSON.stringify(cart));
                    renderCartSummary();
                }
            } else if (button.classList.contains('decrease-quantity')) {
                const item = cart.find(i => i.id === productId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    localStorage.setItem('emmaFireworksCart', JSON.stringify(cart));
                    renderCartSummary();
                } else if (item && item.quantity === 1) {
                    // Si la cantidad es 1, eliminar el producto
                    cart = cart.filter(i => i.id !== productId);
                    localStorage.setItem('emmaFireworksCart', JSON.stringify(cart));
                    renderCartSummary();
                }
            } else if (button.classList.contains('remove-item-btn')) {
                cart = cart.filter(i => i.id !== productId);
                localStorage.setItem('emmaFireworksCart', JSON.stringify(cart));
                renderCartSummary();
            }
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

    renderCartSummary();
});
