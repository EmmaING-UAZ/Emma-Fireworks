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
                <div class="header-cell">Cantidad</div>
                <div class="header-cell">Precio</div>
                <div class="header-cell">Subtotal</div>
            </div>
            <div class="summary-table-body">
        `;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            summaryHtml += `
                <div class="summary-table-row">
                    <div class="table-cell" data-label="Producto">${item.name}</div>
                    <div class="table-cell" data-label="Cantidad">${item.quantity}</div>
                    <div class="table-cell" data-label="Precio">$${item.price.toFixed(2)}</div>
                    <div class="table-cell" data-label="Subtotal">$${subtotal.toFixed(2)}</div>
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
