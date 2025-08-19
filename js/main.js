document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    const countdownBanner = document.getElementById('countdown-banner');
    if (countdownBanner) {
        const countdownDate = new Date("2025-11-30T23:59:59").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                countdownBanner.innerHTML = "El pedido ha cerrado.";
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownBanner.innerHTML = `El pedido cierra en ${days}d ${hours}h ${minutes}m ${seconds}s`;
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // Menú Móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Cambiar aria-expanded para accesibilidad
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // Botón Scroll to Top
    const scrollTopButton = document.getElementById('scrollTopButton');

    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Mostrar el botón después de 300px de scroll
                scrollTopButton.classList.remove('hidden');
                scrollTopButton.classList.add('flex'); // O 'block' según el display que uses
            } else {
                scrollTopButton.classList.add('hidden');
                scrollTopButton.classList.remove('flex');
            }
        });

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Lógica para abrir y cerrar el panel del carrito (común a todas las páginas)
    const cartButtonDesktop = document.getElementById('cart-button-desktop');
    const cartButtonMobile = document.getElementById('cart-button-mobile');
    const cartPanel = document.getElementById('cart-panel');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartOverlay = document.getElementById('cart-overlay');

    const openCartPanel = () => {
        if (cartPanel && cartOverlay) {
            cartPanel.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
            document.body.classList.add('cart-panel-open'); // Para evitar scroll del body
        }
    };

    const closeCartPanel = () => {
        if (cartPanel && cartOverlay) {
            cartPanel.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
            document.body.classList.remove('cart-panel-open');
        }
    };

    if (cartButtonDesktop) {
        cartButtonDesktop.addEventListener('click', openCartPanel);
    }
    if (cartButtonMobile) {
        cartButtonMobile.addEventListener('click', openCartPanel);
    }
    if (closeCartButton) {
        closeCartButton.addEventListener('click', closeCartPanel);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartPanel); // Cerrar al hacer clic en el overlay
    }

    // Cerrar carrito con tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !cartPanel.classList.contains('translate-x-full')) {
            closeCartPanel();
        }
    });


    // Scroll Reveal (simple implementación con Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-fade-in, .reveal-slide-in-left, .reveal-slide-in-right');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // No observar más una vez que es visible
                }
            });
        }, { threshold: 0.1 }); // Ajustar threshold según necesidad

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // --- CARRUSEL PRODUCTOS DESTACADOS (INDEX.HTML) ---
    const carouselTrack = document.getElementById('carousel-track');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const carouselContainer = document.getElementById('carousel-container');

    const featuredProducts = [
        { id: 'prod035', name: 'Cohetón de Luz', price: 450, image: 'img/productos/coheton-de-luz.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod032', name: 'Cohetoncito de Micrófono', price: 220, image: 'img/productos/cohetoncito-de-microfono.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod031', name: 'Cohetoncito de Cracker', price: 210, image: 'img/productos/cohetoncito-de-cracker.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod007', name: 'Bazuka 3 Pulgadas', price: 255, image: 'img/productos/bazuka-3-pulgadas.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod009', name: 'Bazuka 4 Pulgadas', price: 550, image: 'img/productos/bazuka-4-pulgadas.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod008', name: 'Bazuka 3 Pulgadas Cacahuate', price: 320, image: 'img/productos/bazuka-3-pulgadas-cacahuate.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod042', name: 'Escupidor de Colores', price: 120, image: 'img/productos/escupidor-de-colores.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod073', name: 'Trabuco', price: 100, image: 'img/productos/trabuco.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod079', name: 'Vara Mini Llorona', price: 110, image: 'img/productos/vara-mini-llorona.webp', description: 'Contiene 25 piezas.', category: 'General' },
        { id: 'prod076', name: 'Vara Cobra', price: 60, image: 'img/productos/vara-cobra.webp', description: 'Contiene 10 piezas.', category: 'General' }
    ];

    let currentCarouselIndex = 0;
    let itemsPerPage = getItemsPerPage();
    let totalPages = 0;

    function getItemsPerPage() {
        if (window.innerWidth < 640) return 1; // sm
        if (window.innerWidth < 1024) return 2; // md
        return 3; // lg and up
    }

    function renderCarouselItems() {
        if (!carouselTrack || !carouselContainer) return;
        carouselTrack.innerHTML = ''; // Limpiar
        itemsPerPage = getItemsPerPage();
        totalPages = Math.ceil(featuredProducts.length / itemsPerPage);

        featuredProducts.forEach(product => {
            const productCard = `
                <div class="carousel-item w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-2">
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full hover-effect">
                        <img src="${product.image || 'https://via.placeholder.com/300x200.png?text=Producto'}" alt="${product.name}" class="w-full h-48 object-cover">
                        <div class="p-4 flex flex-col flex-grow">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate" title="${product.name}">${product.name}</h3>
                            <p class="text-sm text-gray-600 mb-3 flex-grow">${product.description.length > 60 ? product.description.substring(0, 60) + '...' : product.description}</p>
                            <p class="text-xl font-bold text-yellow-600 mb-4">${formatCurrency(product.price)}</p>
                            <div class="mt-auto">
                                <div class="flex items-center justify-center space-x-3 mb-4">
                                    <button onclick="updateQuantity('${product.id}', -1)" aria-label="Disminuir cantidad" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">-</button>
                                    <span id="quantity-${product.id}" class="text-lg font-semibold">1</span>
                                    <button onclick="updateQuantity('${product.id}', 1)" aria-label="Aumentar cantidad" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">+</button>
                                </div>
                                <button onclick="window.addToCart({id:'${product.id}', name:'${product.name}', price:${product.price}, image:'${product.image}', description:'${product.description}'}, getQuantity('${product.id}'))"
                                        class="w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-600 transition-colors duration-300 text-sm">
                                    Agregar al Carrito
                                </button>
                                <button onclick="window.openPopularProductModal({id:'${product.id}', name:'${product.name}', price:${product.price}, image:'${product.image}', description:'${product.description}'})"
                                        class="w-full mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 text-sm">
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            carouselTrack.innerHTML += productCard;
        });
        updateCarousel();
    }

    function updateCarousel() {
        if (!carouselTrack || !carouselContainer) return;
        const itemWidth = carouselContainer.offsetWidth / itemsPerPage;
        carouselTrack.style.transform = `translateX(-${currentCarouselIndex * itemWidth * itemsPerPage}px)`;

        if (prevButton) prevButton.disabled = currentCarouselIndex === 0;
        if (nextButton) nextButton.disabled = currentCarouselIndex >= totalPages -1 ;

        // Para un carrusel que no es "infinito", ocultar botones si no hay más items
        if (featuredProducts.length <= itemsPerPage) {
            if(prevButton) prevButton.classList.add('hidden');
            if(nextButton) nextButton.classList.add('hidden');
        } else {
            if(prevButton) prevButton.classList.remove('hidden');
            if(nextButton) nextButton.classList.remove('hidden');
        }
    }

    if (prevButton && nextButton && carouselTrack) {
        prevButton.addEventListener('click', () => {
            if (currentCarouselIndex > 0) {
                currentCarouselIndex--;
                updateCarousel();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentCarouselIndex < totalPages - 1) {
                currentCarouselIndex++;
                updateCarousel();
            }
        });

        window.addEventListener('resize', () => {
            currentCarouselIndex = 0; // Resetear en resize para recalcular
            renderCarouselItems();
        });

        // Renderizar carrusel al inicio
        renderCarouselItems();
    }
    // --- FIN CARRUSEL ---

    // --- LÓGICA PARA PÁGINA DE CATÁLOGO ---
    const catalogContainer = document.getElementById('catalog-product-grid');
    const categoryFiltersContainer = document.getElementById('category-filters');

    // Productos de ejemplo para el catálogo (más extenso)
    const allProducts = [
        { id: 'prod001', name: 'Abejorro', price: 200, image: 'img/productos/abejorro.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod002', name: 'Adrenocromo', price: 120, image: 'img/productos/adrenocromo.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod003', name: 'Batería Baby', price: 100, image: 'img/productos/bateria-baby.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod004', name: 'Batería La Reina', price: 150, image: 'img/productos/bateria-la-reina.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod005', name: 'Bazuca Baby', price: 100, image: 'img/productos/bazuca-baby.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod006', name: 'Bazuka 2 Pulgadas', price: 150, image: 'img/productos/bazuka-2-pulgadas.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod007', name: 'Bazuka 3 Pulgadas', price: 255, image: 'img/productos/bazuka-3-pulgadas.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod008', name: 'Bazuka 3 Pulgadas Cacahuate', price: 320, image: 'img/productos/bazuka-3-pulgadas-cacahuate.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod009', name: 'Bazuka 4 Pulgadas', price: 550, image: 'img/productos/bazuka-4-pulgadas.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod010', name: 'Billete', price: 100, image: 'img/productos/billete.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod011', name: 'Bob Esponja', price: 100, image: 'img/productos/bob-esponja.webp', description: 'Contiene 16 piezas.', category: 'General' },
        { id: 'prod012', name: 'Bobillo Grande', price: 170, image: 'img/productos/bobillo-grande.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod013', name: 'Bola de Humo', price: 25, image: 'img/productos/bola-de-humo.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod014', name: 'Bola de Humo Gigante', price: 100, image: 'img/productos/bola-de-humo-gigante.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod015', name: 'Bola de Luz', price: 25, image: 'img/productos/bola-de-luz.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod016', name: 'Bombillo', price: 90, image: 'img/productos/bombillo.webp', description: 'Contiene 100 piezas.', category: 'General' },
        { id: 'prod017', name: 'Bombillo Mediano', price: 110, image: 'img/productos/bombillo-mediano.webp', description: 'Contiene 100 piezas.', category: 'General' },
        { id: 'prod018', name: 'Bombillo Mini', price: 150, image: 'img/productos/bombillo-mini.webp', description: 'Contiene 400 piezas.', category: 'General' },
        { id: 'prod019', name: 'Bombillo R-15', price: 150, image: 'img/productos/bombillo-r-15.webp', description: 'Contiene 90 piezas.', category: 'General' },
        { id: 'prod020', name: 'Bombillo R-15 Tricolor', price: 170, image: 'img/productos/bombillo-r-15-tricolor.webp', description: 'Contiene 100 piezas.', category: 'General' },
        { id: 'prod021', name: 'Brujitas', price: 430, image: 'img/productos/brujitas.webp', description: 'Contiene 50 paquetes.', category: 'General' },
        { id: 'prod022', name: 'Bota Misil 25', price: 255, image: 'img/productos/bota-misil-25.webp', description: 'Contiene 4 piezas.', category: 'General' },
        { id: 'prod023', name: 'Bota Misil 100', price: 300, image: 'img/productos/bota-misil-100.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod024', name: 'Cara de Diablo', price: 300, image: 'img/productos/cara-de-diablo.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod025', name: 'Carrillera', price: 40, image: 'img/productos/carrillera.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod026', name: 'Cebollita', price: 30, image: 'img/productos/cebollita.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod027', name: 'Cerveza Luminosa', price: 120, image: 'img/productos/cerveza-luminosa.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod028', name: 'Chiflador de Piso Grande', price: 80, image: 'img/productos/chiflador-de-piso-grande.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod029', name: 'Chifladores de Piso', price: 150, image: 'img/productos/chifladores-de-piso.webp', description: 'Contiene 144 piezas.', category: 'General' },
        { id: 'prod030', name: 'Cohetoncito Bomba', price: 200, image: 'img/productos/cohetoncito-bomba.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod031', name: 'Cohetoncito de Cracker', price: 210, image: 'img/productos/cohetoncito-de-cracker.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod032', name: 'Cohetoncito de Micrófono', price: 220, image: 'img/productos/cohetoncito-de-microfono.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod033', name: 'Cohetoncito de Paracaídas', price: 210, image: 'img/productos/cohetoncito-de-paracaidas.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod034', name: 'Cohetoncito de Trueno', price: 200, image: 'img/productos/cohetoncito-de-trueno.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod035', name: 'Cohetón de Luz', price: 450, image: 'img/productos/coheton-de-luz.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod036', name: 'Cohetón de Trueno', price: 370, image: 'img/productos/coheton-de-trueno.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod037', name: 'Cosmopolitan', price: 1000, image: 'img/productos/cosmopolitan.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod038', name: 'Cracker de Colores', price: 230, image: 'img/productos/cracker-de-colores.webp', description: 'Contiene 144 piezas.', category: 'General' },
        { id: 'prod039', name: 'Crackle Spinners', price: 80, image: 'img/productos/crackle-spinners.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod040', name: 'Cuete Blanco', price: 120, image: 'img/productos/cuete-blanco.webp', description: 'Contiene 20 rollos.', category: 'General' },
        { id: 'prod041', name: 'Dragoncitos', price: 70, image: 'img/productos/dragoncitos.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod042', name: 'Escupidor de Colores', price: 120, image: 'img/productos/escupidor-de-colores.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod043', name: 'Escupidor de Cracker', price: 120, image: 'img/productos/escupidor-de-cracker.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod044', name: 'Escupidor de Diamantina', price: 110, image: 'img/productos/escupidor-de-diamantina.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod045', name: 'Espanta Suegras', price: 120, image: 'img/productos/espanta-suegras.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod046', name: 'Flash', price: 250, image: 'img/productos/flash.webp', description: 'Contiene 144 piezas.', category: 'General' },
        { id: 'prod047', name: 'Frozen', price: 115, image: 'img/productos/frozen.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod048', name: 'Garra de Tigre', price: 170, image: 'img/productos/garra-de-tigre.webp', description: 'Contiene 20 piezas.', category: 'General' },
        { id: 'prod049', name: 'Garra de Tigre Chica', price: 150, image: 'img/productos/garra-de-tigre-chica.webp', description: 'Contiene 50 piezas.', category: 'General' },
        { id: 'prod050', name: 'Garra de Tigre Mega', price: 220, image: 'img/productos/garra-de-tigre-mega.webp', description: 'Contiene 20 piezas.', category: 'General' },
        { id: 'prod051', name: 'Hormiguero', price: 180, image: 'img/productos/hormiguero.webp', description: 'Contiene 72 piezas.', category: 'General' },
        { id: 'prod052', name: 'Hulk', price: 170, image: 'img/productos/hulk.webp', description: 'Contiene 20 piezas.', category: 'General' },
        { id: 'prod053', name: 'Hulk Chico', price: 150, image: 'img/productos/hulk-chico.webp', description: 'Contiene 50 piezas.', category: 'General' },
        { id: 'prod054', name: 'Hulk Mega', price: 220, image: 'img/productos/hulk-mega.webp', description: 'Contiene 20 piezas.', category: 'General' },
        { id: 'prod055', name: 'Juguitos Explosivos', price: 130, image: 'img/productos/juguitos-explosivos.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod056', name: 'Mexicano Espacial', price: 160, image: 'img/productos/mexicano-espacial.webp', description: 'Contiene 3 piezas.', category: 'General' },
        { id: 'prod057', name: 'Misil Chico', price: 200, image: 'img/productos/misil-chico.webp', description: 'Contiene 38 piezas.', category: 'General' },
        { id: 'prod058', name: 'Mosaico de Color', price: 120, image: 'img/productos/mosaico-de-color.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod059', name: 'Olla Chica', price: 90, image: 'img/productos/olla-chica.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod060', name: 'Olla Grande', price: 120, image: 'img/productos/olla-grande.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod061', name: 'Olla Mediana', price: 110, image: 'img/productos/olla-mediana.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod062', name: 'Ovni', price: 100, image: 'img/productos/ovni.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod063', name: 'Paloma', price: 30, image: 'img/productos/paloma.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod064', name: 'Paloma Grande', price: 160, image: 'img/productos/paloma-grande.webp', description: 'Contiene 85 piezas.', category: 'General' },
        { id: 'prod065', name: 'Paloma Super', price: 170, image: 'img/productos/paloma-super.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod066', name: 'Pata de Elefante', price: 200, image: 'img/productos/pata-de-elefante.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod067', name: 'Pirinola Luminosa', price: 75, image: 'img/productos/pirinola-luminosa.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod068', name: 'P-k-t Diviertas', price: 170, image: 'img/productos/p-k-t-diviertas.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod069', name: 'Pokebolas', price: 90, image: 'img/productos/pokebolas.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod070', name: 'Pulgas Mágicas', price: 100, image: 'img/productos/pulgas-magicas.webp', description: 'Contiene 12 piezas.', category: 'General' },
        { id: 'prod071', name: 'Rosas', price: 40, image: 'img/productos/rosas.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod072', name: 'Tamalitos', price: 120, image: 'img/productos/tamalitos.webp', description: 'Contiene 25 piezas.', category: 'General' },
        { id: 'prod073', name: 'Trabuco', price: 100, image: 'img/productos/trabuco.webp', description: 'Contiene 6 piezas.', category: 'General' },
        { id: 'prod074', name: 'Trabuco Jumbo', price: 210, image: 'img/productos/trabuco-jumbo.webp', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod075', name: 'Trabuquito', price: 80, image: 'img/productos/trabuquito.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod076', name: 'Vara Cobra', price: 60, image: 'img/productos/vara-cobra.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod077', name: 'Vara Ever', price: 40, image: 'img/productos/vara-ever.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod078', name: 'Vara Ever Jumbo', price: 60, image: 'img/productos/vara-ever-jumbo.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod079', name: 'Vara Mini Llorona', price: 110, image: 'img/productos/vara-mini-llorona.webp', description: 'Contiene 25 piezas.', category: 'General' },
        { id: 'prod080', name: 'Vara Pajarera', price: 150, image: 'img/productos/vara-pajarera.webp', description: 'Contiene 144 piezas.', category: 'General' },
        { id: 'prod081', name: 'Vara Urba', price: 40, image: 'img/productos/vara-urba.webp', description: 'Contiene 10 piezas.', category: 'General' },
        { id: 'prod082', name: 'Volcán', price: 55, image: 'img/productos/volcan.webp', description: 'Contiene 10 piezas.', category: 'General' }
    ];

    const categories = [
        'Mostrar Todos',
        'General'
    ];

    function renderProductCard(product) {
        const truncatedDescription = product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description;
        return `
            <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover-effect reveal-fade-in" data-category="${product.category}">
                <img src="${product.image || 'https://via.placeholder.com/300x200.png?text=Producto'}" alt="${product.name}" class="w-full h-56 object-cover">
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2 truncate" title="${product.name}">${product.name}</h3>
                    <p class="text-sm text-gray-500 mb-3 flex-grow">${truncatedDescription}</p>
                    <p class="text-2xl font-bold text-yellow-600 mb-5">${formatCurrency(product.price)}</p>
                    <div class="mt-auto space-y-2">
                        <div class="flex items-center justify-center space-x-3 mb-2">
                            <button onclick="updateQuantity('${product.id}', -1)" aria-label="Disminuir cantidad" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">-</button>
                            <span id="quantity-${product.id}" class="text-lg font-semibold">1</span>
                            <button onclick="updateQuantity('${product.id}', 1)" aria-label="Aumentar cantidad" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">+</button>
                        </div>
                        <button onclick="window.addToCart({id:'${product.id}', name:'${product.name}', price:${product.price}, image:'${product.image}', description:'${product.description}'}, getQuantity('${product.id}'))"
                                class="w-full bg-yellow-500 text-white py-2.5 px-4 rounded-md font-semibold hover:bg-yellow-600 transition-colors duration-300 text-base">
                            Agregar al Carrito
                        </button>
                        <button onclick="window.openProductModal({id:'${product.id}', name:'${product.name}', price:${product.price}, image:'${product.image}', description:'${product.description}'})"
                                class="w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 text-base">
                            Ver Más
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function displayProducts(productsToDisplay) {
        if (!catalogContainer) return;
        catalogContainer.innerHTML = '';
        productsToDisplay.forEach(product => {
            catalogContainer.innerHTML += renderProductCard(product);
        });
        // Re-initialize ScrollReveal for newly added cards (if needed, or ensure it runs once after all are added)
        const newRevealElements = catalogContainer.querySelectorAll('.reveal-fade-in');
        if (newRevealElements.length > 0 && typeof IntersectionObserver === 'function') {
             const tempObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            newRevealElements.forEach(el => tempObserver.observe(el));
        }
    }

    function renderCategoryFilters() {
        if (!categoryFiltersContainer) return;
        categoryFiltersContainer.innerHTML = '';
        categories.forEach(category => {
            const filterButton = document.createElement('button');
            filterButton.textContent = category;
            filterButton.classList.add('px-4', 'py-2', 'm-1', 'rounded-md', 'transition-colors', 'duration-300', 'font-medium', 'hover-effect');
            if (category === 'Mostrar Todos') {
                filterButton.classList.add('bg-yellow-500', 'text-white');
                filterButton.dataset.active = "true";
            } else {
                filterButton.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-yellow-400', 'hover:text-white');
            }
            filterButton.addEventListener('click', () => {
                handleFilterClick(category, filterButton);
            });
            categoryFiltersContainer.appendChild(filterButton);
        });
    }

    function handleFilterClick(category, clickedButton) {
        // Update active state for buttons
        const buttons = categoryFiltersContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.remove('bg-yellow-500', 'text-white');
            button.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-yellow-400', 'hover:text-white');
            button.dataset.active = "false";
        });
        clickedButton.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-yellow-400');
        clickedButton.classList.add('bg-yellow-500', 'text-white');
        clickedButton.dataset.active = "true";

        if (category === 'Mostrar Todos') {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => product.category === category);
            displayProducts(filteredProducts);
        }
    }


    if (catalogContainer && categoryFiltersContainer) {
        // Initial render on catalog page
        renderCategoryFilters();
        displayProducts(allProducts);
    }
    // --- FIN LÓGICA PÁGINA DE CATÁLOGO ---

});

// Pequeña función helper para formatear moneda (ejemplo)
// Asegurarse que está disponible globalmente o importarla/definirla donde se necesite.
if (typeof formatCurrency !== 'function') {
    function formatCurrency(amount) {
        return `$${parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }
}

function updateQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    if (quantityElement) {
        let currentQuantity = parseInt(quantityElement.textContent, 10);
        currentQuantity += change;
        if (currentQuantity < 1) {
            currentQuantity = 1;
        }
        quantityElement.textContent = currentQuantity;
    }
}

function getQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    if (quantityElement) {
        return parseInt(quantityElement.textContent, 10);
    }
    return 1; // Default to 1 if not found
}
