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
        { id: 'prod035', name: 'Cohetón de Luz', price: 450, image: 'img/productos/coheton-de-luz.webp', description: 'Contiene 12 piezas. El cohetón de luz es un proyectil que se eleva a 50 metros de altura y abre en el cielo una bomba de colores y efectos variados. Perfecto para fiestas patronales, reuniones y espectáculos inolvidables.', classification: 'C', category: 'aereo', imageFit: 'contain' },
        { id: 'prod032', name: 'Cohetoncito de Micrófono', price: 220, image: 'img/productos/cohetoncito-de-microfono.webp', description: 'Contiene 12 piezas. La vara bomba, pero con el efecto más redondo, se eleva igualmente a 30 metros.', classification: 'B', category: 'aereo', imageFit: 'contain' },
        { id: 'prod031', name: 'Cohetoncito de Cracker', price: 210, image: 'img/productos/cohetoncito-de-cracker.webp', description: 'Contiene 12 piezas. Vara que se eleva a 30 metros y que ofrece un espectáculo de tronidos.', classification: 'B', category: 'aereo' },
        { id: 'prod007', name: 'Bazuka 3 Pulgadas', price: 255, image: 'img/productos/bazuka-3-pulgadas.webp', description: 'Proyectil de 3” impulsado al cielo, con colores variados y un diámetro de apertura de 70 metros aproximadamente.', classification: 'B', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod009', name: 'Bazuka 4 Pulgadas', price: 550, image: 'img/productos/bazuka-4-pulgadas.webp', description: 'Proyectil de 4” impulsada al cielo, con una apertura de colores variados con un diámetro aproximadamente de 100 metros.', classification: 'C', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod008', name: 'Bazuka 3 Pulgadas Cacahuate', price: 320, image: 'img/productos/bazuka-3-pulgadas-cacahuate.webp', description: 'Proyectiles de 1”, 2” y 3” que abren en el cielo secuencialmente, dando un espectáculo visualmente atractivo.', classification: 'B', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod042', name: 'Escupidor de Colores', price: 120, image: 'img/productos/escupidor-de-colores.webp', description: 'Contiene 12 piezas. El clásico escupidor que avienta bolas de colores secuenciales, ideal para los más peques.', classification: 'A', category: 'luz', imageFit: 'contain' },
        { id: 'prod073', name: 'Trabuco', price: 100, image: 'img/productos/trabuco.webp', description: 'Contiene 6 piezas. El clásico Trabuco, al encenderse, dispara una bola de fuego, mientras despliega una cola de luz que lo acompaña hasta el cielo, en donde emite una serie de pequeños estallidos y destellos.', classification: 'A', category: 'luz', imageFit: 'contain' },
        { id: 'prod079', name: 'Vara Mini Llorona', price: 110, image: 'img/productos/vara-mini-llorona.webp', description: 'Contiene 25 piezas. Al encenderse, la Vara Mini Llorona produce un sonido característico y un despliegue de luces brillantes que capturan la atención (chiflador).', classification: 'A', category: 'aéreo' },
        { id: 'prod076', name: 'Vara Cobra', price: 60, image: 'img/productos/vara-cobra.webp', description: 'Contiene 10 piezas. Al encenderse, lanza destellos que se retuercen y giran en el aire, mientras silba (chiflador).', classification: 'A', category: 'aéreo', imageFit: 'contain' }
    ];

    let isTransitioning = false;
    let currentCarouselIndex = 0;

    function getItemsPerPage() {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function createProductCard(product) {
        const imageClass = product.imageFit === 'contain' ? 'long-product-image' : 'object-cover';
        return `
            <div class="carousel-item w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-2">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full hover-effect">
                    <div class="relative">
                        <img src="${product.image || 'https://via.placeholder.com/300x200.png?text=Producto'}" alt="${product.name}" class="w-full h-48 ${imageClass}">
                        <div class="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">${product.classification}</div>
                    </div>
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
    }

    function setupCarousel() {
        if (!carouselTrack || !carouselContainer || featuredProducts.length === 0) {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            return;
        }

        const itemsPerPage = getItemsPerPage();
        if (featuredProducts.length <= itemsPerPage) {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            carouselTrack.innerHTML = featuredProducts.map(createProductCard).join('');
            return;
        }

        if (prevButton) prevButton.style.display = 'block';
        if (nextButton) nextButton.style.display = 'block';

        const clonedFirst = featuredProducts.slice(0, itemsPerPage);
        const clonedLast = featuredProducts.slice(-itemsPerPage);

        const allItems = [...clonedLast, ...featuredProducts, ...clonedFirst];
        carouselTrack.innerHTML = allItems.map(createProductCard).join('');

        currentCarouselIndex = itemsPerPage;
        const itemWidth = carouselContainer.offsetWidth / itemsPerPage;
        carouselTrack.style.transform = `translateX(-${currentCarouselIndex * itemWidth}px)`;

        const moveTo = (index, withTransition = true) => {
            isTransitioning = true;
            carouselTrack.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
            const newTransform = -(index * itemWidth);
            carouselTrack.style.transform = `translateX(${newTransform}px)`;
            currentCarouselIndex = index;
        };

        nextButton.addEventListener('click', () => {
            if (isTransitioning) return;
            moveTo(currentCarouselIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            if (isTransitioning) return;
            moveTo(currentCarouselIndex - 1);
        });

        carouselTrack.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentCarouselIndex >= featuredProducts.length + itemsPerPage) {
                moveTo(itemsPerPage, false);
            }
            if (currentCarouselIndex < itemsPerPage) {
                moveTo(featuredProducts.length + itemsPerPage -1, false);
            }
        });
    }

    if (carouselTrack) {
        setupCarousel();
        window.addEventListener('resize', setupCarousel);
    }
    // --- FIN CARRUSEL ---

    // --- LÓGICA PARA PÁGINA DE CATÁLOGO ---
    const catalogContainer = document.getElementById('catalog-product-grid');
    const categoryFiltersContainer = document.getElementById('category-filters');

    // Productos de ejemplo para el catálogo (más extenso)
       const allProducts = [
        { id: 'prod001', name: 'Abejorro', price: 200, image: 'img/productos/abejorro.webp', description: 'Contiene 12 piezas. El Abejorro es conocido por sus movimientos rápidos y erráticos en el aire. Al encenderse, emite un sonido zumbante y una serie de destellos brillantes multicolor que imitan el vuelo de un abejorro. Ideal y seguro para la diversión y sorpresa de los pequeños.', classification: 'A', category: 'luz' },
        { id: 'prod002', name: 'Adrenocromo', price: 120, image: 'img/productos/adrenocromo.webp', description: 'Contiene 6 piezas. ¡Prepárate para una descarga de adrenalina! El Adrenocromo te ofrece una experiencia pirotécnica intensa y emocionante, al ser encendido ofrece una explosión intensa y vibrante de luz. Perfecto para eventos nocturnos y fiestas que buscan una sensación de adrenalina y emoción.', classification: 'B', category: 'luz' },
        { id: 'prod003', name: 'Batería Baby', price: 100, image: 'img/productos/bateria-baby.webp', description: 'La Batería Baby es una opción más compacta que combina seguridad y diversión. Sus disparos suaves y coloridos proporcionan un espectáculo visual encantador sin ser demasiado ruidosos. Los efectos incluyen estrellas de colores y destellos que mantendrán a los niños y adultos fascinados.', classification: 'B', category: 'aéreo' },
        { id: 'prod004', name: 'Batería La Reina', price: 150, image: 'img/productos/bateria-la-reina.webp', description: 'La Batería La Reina es un tributo a la majestuosidad. Sus disparos ofrecen una exhibición de luces y estallidos que iluminan el cielo. Perfecta para eventos y celebraciones que requieren un toque especial.', classification: 'B', category: 'aéreo' },
        { id: 'prod005', name: 'Bazuca Baby', price: 100, image: 'img/productos/bazuca-baby.webp', description: 'Serpiente de gran altura, con colores variados y tronidos.', classification: 'A', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod006', name: 'Bazuka 2 Pulgadas', price: 150, image: 'img/productos/bazuka-2-pulgadas.webp', description: 'Proyectil pequeño de 2”, que abre una esfera en el cielo de 50 metros de diámetro, aproximadamente.', classification: 'B', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod007', name: 'Bazuka 3 Pulgadas', price: 255, image: 'img/productos/bazuka-3-pulgadas.webp', description: 'Proyectil de 3” impulsado al cielo, con colores variados y un diámetro de apertura de 70 metros, aproximadamente.', classification: 'B', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod008', name: 'Bazuka 3 Pulgadas Cacahuate', price: 320, image: 'img/productos/bazuka-3-pulgadas-cacahuate.webp', description: 'Proyectiles de 1”, 2” y 3” que abren en el cielo secuencialmente, dando un espectáculo visualmente atractivo.', classification: 'B', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod009', name: 'Bazuka 4 Pulgadas', price: 550, image: 'img/productos/bazuka-4-pulgadas.webp', description: 'Proyectil de 4” impulsada al cielo, con una apertura de colores variados con un diámetro de, aproximadamente, 100 metros.', classification: 'C', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod010', name: 'Billete', price: 80, image: 'img/productos/billete.webp', description: 'Varios disparos de serpientes de colores.', classification: 'B', category: 'aéreo' },
        { id: 'prod011', name: 'Bob Esponja', price: 100, image: 'img/productos/bob-esponja.webp', description: 'Contiene 16 piezas. Tronidos de colores en el suelo.', classification: 'A', category: 'luz' },
        { id: 'prod013', name: 'Bola de Humo', price: 25, image: 'img/productos/bola-de-humo.webp', description: 'Contiene 10 piezas. La clásica bola de humo de color.', classification: 'A', category: 'luz' },
        { id: 'prod014', name: 'Bola de Humo Gigante', price: 100, image: 'img/productos/bola-de-humo-gigante.webp', description: 'Contiene 10 piezas. La bola de humo tradicional, pero de un tamaño más grande.', classification: 'A', category: 'luz' },
        { id: 'prod015', name: 'Bola de Luz', price: 25, image: 'img/productos/bola-de-luz.webp', description: 'Contiene 10 piezas. Bola que emite chispas al encenderse, cambiando el humo por chispas.', classification: 'A', category: 'luz' },
        { id: 'prod016', name: 'Bombillo', price: 90, image: 'img/productos/bombillo.webp', description: 'Contiene 100 piezas. El clásico bombillo con un estallido medio-fuerte.', classification: 'B', category: 'trueno' },
        { id: 'prod017', name: 'Bombillo Mediano', price: 110, image: 'img/productos/bombillo-mediano.webp', description: 'Contiene 100 piezas. El bombillo de un tamaño más grande, con un trueno superior.', classification: 'B', category: 'trueno' },
        { id: 'prod012', name: 'Bombillo Grande', price: 170, image: 'img/productos/bombillo-grande.webp', description: 'Tiros secuenciales hacia el cielo de diferentes colores.', classification: 'B', category: 'aéreo' },
        { id: 'prod018', name: 'Bombillo Mini', price: 150, image: 'img/productos/bombillo-mini.webp', description: 'Contiene 400 piezas. La versión pequeña del bombillo de trueno suave.', classification: 'B', category: 'trueno' },
        { id: 'prod019', name: 'Bombillo R-15', price: 150, image: 'img/productos/bombillo-r-15.webp', description: 'Contiene 90 piezas. El clásico trueno más fuerte del R-15.', classification: 'B', category: 'trueno' },
        { id: 'prod021', name: 'Brujitas', price: 430, image: 'img/productos/brujitas.webp', description: 'Contiene 50 paquetes. Pequeñas bolitas que, al aventarlas a una superficie, estallan de manera suave.', classification: 'A', category: 'trueno' },
        { id: 'prod025', name: 'Carrillera', price: 40, image: 'img/productos/carrillera.webp', description: '16 cargas que truenan secuencialmente, con un trueno bajo-medio.', classification: 'B', category: 'trueno' },
        { id: 'prod026', name: 'Cebollita', price: 30, image: 'img/productos/cebollita.webp', description: 'La clásica cebollita zacatecana, que se eleva de 4 a 8 metros al ser lanzada. Chispas color naranja que promueven el vuelo muy lejos. No son de chispa blanca que explotan en la mano, es la cebollita clásica de mecha amarilla que se disfruta en todo momento y sin miedo de que explote en la mano.', classification: 'A', category: 'luz' },
        { id: 'prod027', name: 'Cerveza Luminosa', price: 120, image: 'img/productos/cerveza-luminosa.webp', description: 'Pequeña fuente de tronidos, ideal para los más pequeños de la casa.', classification: 'A', category: 'luz' },
        { id: 'prod028', name: 'Chiflador de Piso Grande', price: 80, image: 'img/productos/chiflador-de-piso-grande.webp', description: 'Como el chiflador de piso clásico, pero ahora en una versión más grande.', classification: 'A', category: 'luz' },
        { id: 'prod029', name: 'Chifladores de Piso', price: 150, image: 'img/productos/chifladores-de-piso.webp', description: 'Contiene 144 piezas. El clásico chiflador de piso con una excelente calidad.', classification: 'A', category: 'luz' },
        { id: 'prod030', name: 'Cohetoncito Bomba', price: 200, image: 'img/productos/cohetoncito-bomba.webp', description: 'Contiene 12 piezas. Una vara pequeña, pero impresionante, se eleva a 30 metros y estalla con efecto de colores. Perfecta para fiestas y reuniones.', classification: 'B', category: 'aereo' },
        { id: 'prod031', name: 'Cohetoncito de Cracker', price: 210, image: 'img/productos/cohetoncito-de-cracker.webp', description: 'Contiene 12 piezas. Vara que se eleva a 30 metros y que ofrece un espectáculo de tronidos.', classification: 'B', category: 'aereo' },
        { id: 'prod032', name: 'Cohetoncito de Micrófono', price: 220, image: 'img/productos/cohetoncito-de-microfono.webp', description: 'Contiene 12 piezas. La vara bomba, pero con el efecto más redondo, se eleva igualmente a 30 metros.', classification: 'B', category: 'aereo', imageFit: 'contain' },
        { id: 'prod033', name: 'Cohetoncito de Paracaídas', price: 210, image: 'img/productos/cohetoncito-de-paracaidas.webp', description: 'Contiene 12 piezas. Vara que se eleva y cae lentamente con una luz de color.', classification: 'B', category: 'aereo' },
        { id: 'prod034', name: 'Cohetoncito de Trueno', price: 200, image: 'img/productos/cohetoncito-de-trueno.webp', description: 'Contiene 12 piezas. El clásico para las fiestas patronales, se eleva y truena de manera fuerte en el cielo.', classification: 'B', category: 'aereo' },
        { id: 'prod035', name: 'Cohetón de Luz', price: 450, image: 'img/productos/coheton-de-luz.webp', description: 'Contiene 12 piezas. El cohetón de luz es un proyectil que se eleva a 50 metros de altura y abre en el cielo una bomba de colores y efectos variados. Perfecto para fiestas patronales, reuniones y espectáculos inolvidables.', classification: 'C', category: 'aereo', imageFit: 'contain' },
        { id: 'prod036', name: 'Cohetón de Trueno', price: 370, image: 'img/productos/coheton-de-trueno.webp', description: 'Contiene 12 piezas. El cohetón de cohetones, el clásico de fiestas religiosas en los barrios, conocido también como cohetón guadalupano, ofrece un estruendo fuerte a 50 metros de altura.', classification: 'C', category: 'aereo', imageFit: 'contain' },
        { id: 'prod038', name: 'Cracker de Colores', price: 230, image: 'img/productos/cracker-de-colores.webp', description: 'Contiene 144 piezas. El Cracker produce una serie de pequeños estallidos y destellos al encenderse. Perfecto para divertir a los más peques.', classification: 'A', category: 'luz' },
        { id: 'prod039', name: 'Crackle Spinners', price: 80, image: 'img/productos/crackle-spinners.webp', description: 'Contiene 6 piezas. Los Crackle Spinners son dispositivos pirotécnicos que giran rápidamente en el suelo al encenderse, emitiendo una serie de chispas multicolor.', classification: 'A', category: 'luz' },
        { id: 'prod040', name: 'Cuete Blanco', price: 200, image: 'img/productos/cuete-blanco.webp', description: 'Contiene 20 rollos. Este clásico se activa con un estallido seco y potente, que deja su marca en cualquier festejo. Reconocido por su sonido limpio y directo.', classification: 'B', category: 'trueno' },
        { id: 'prod041', name: 'Dragoncitos', price: 70, image: 'img/productos/dragoncitos.webp', description: 'Los Dragoncitos imitan el vuelo y los estallidos de un dragón. Al encenderse, emiten destellos de luz y se elevan, imitando el vuelo de un dragón. Ideal para añadir un toque de fantasía y diversión a cualquier celebración.', classification: 'A', category: 'luz' },
        { id: 'prod042', name: 'Escupidor de Colores', price: 120, image: 'img/productos/escupidor-de-colores.webp', description: 'Contiene 12 piezas. El clásico escupidor que avienta bolas de colores secuenciales, ideal para los más peques.', classification: 'A', category: 'luz', imageFit: 'contain' },
        { id: 'prod044', name: 'Escupidor de Diamantina', price: 110, image: 'img/productos/escupidor-de-diamantina.webp', description: 'Contiene 12 piezas. El clásico escupidor que avienta bolas de colores con diferente efecto secuenciales, ideal para los más peques.', classification: 'A', category: 'luz', imageFit: 'contain' },
        { id: 'prod045', name: 'Espanta Suegras', price: 120, image: 'img/productos/espanta-suegras.webp', description: 'Al encenderse, el Espanta Suegras emite destellos de luz, pero ten cuidado, porque después de unos segundos, este explota repentinamente. Es perfecto para fiestas y reuniones familiares (o para alejar a las suegras).', classification: 'B', category: 'trueno' },
        { id: 'prod046', name: 'Flash', price: 250, image: 'img/productos/flash.webp', description: 'Contiene 144 piezas. El clásico flash, al encender, emite una luz muy brillante, similar a la de una fotografía, pero de manera secuencial por un período de tiempo.', classification: 'A', category: 'luz' },
        { id: 'prod047', name: 'Frozen', price: 115, image: 'img/productos/frozen.webp', description: 'Al encenderse, gira rápidamente sobre el suelo y lanza destellos en tonos fríos, como azul, blanco y plateado, simulando una pequeña tormenta de nieve mágica.', classification: 'A', category: 'luz' },
        { id: 'prod051', name: 'Hormiguero', price: 180, image: 'img/productos/hormiguero.webp', description: 'Contiene 72 piezas. El Hormiguero es pequeño en tamaño, pero grande en presencia. Al encenderse, comienza a soltar una lluvia de destellos chispeantes y puntos de luz que parpadean, como si un enjambre de luciérnagas se hubiese liberado en la oscuridad.', classification: 'A', category: 'luz' },
        { id: 'prod055', name: 'Juguitos Explosivos', price: 130, image: 'img/productos/juguitos-explosivos.webp', description: 'Contiene 12 piezas. Los Juguitos Explosivos producen varias luces multicolor que emiten destellos de luz intermitentes y, al mismo tiempo, una serie de pequeños estallidos y destellos al encenderse.', classification: 'A', category: 'luz' },
        { id: 'prod056', name: 'Mexicano Espacial', price: 160, image: 'img/productos/mexicano-espacial.webp', description: 'Contiene 3 piezas. El Mexicano Espacial es un producto pirotécnico que lanza al cielo bolas de fuego, donde explotan en un estallido de luces brillantes y colores.', classification: 'B', category: 'luz' },
        { id: 'prod057', name: 'Misil Chico', price: 200, image: 'img/productos/misil-chico.webp', description: 'Contiene 38 piezas. Al ser encendido, se impulsa con una cascada de luz rojiza para subir rápidamente hacia el cielo.', classification: 'A', category: 'luz' },
        { id: 'prod058', name: 'Mosaico de Color', price: 120, image: 'img/productos/mosaico-de-color.webp', description: 'El Mosaico de Color crea un espectáculo visual deslumbrante. Al encenderse, produce una serie de destellos en diferentes colores, formando un mosaico luminoso.', classification: 'A', category: 'luz' },
        { id: 'prod059', name: 'Olla Chica', price: 90, image: 'img/productos/olla-chica.webp', description: 'Contiene 12 piezas. La Olla Chica libera una columna de destellos y chispas al encenderse.', classification: 'A', category: 'luz' },
        { id: 'prod060', name: 'Olla Grande', price: 120, image: 'img/productos/olla-grande.webp', description: 'Contiene 6 piezas. La Olla grande libera una columna de destellos y chispas al encenderse.', classification: 'A', category: 'luz' },
        { id: 'prod061', name: 'Olla Mediana', price: 110, image: 'img/productos/olla-mediana.webp', description: 'Contiene 6 piezas. La Olla mediana libera una columna de destellos y chispas al encenderse.', classification: 'A', category: 'luz' },
        { id: 'prod063', name: 'Paloma', price: 30, image: 'img/productos/paloma.webp', description: 'Ofrece un estallido ágil y sonoro, que añade un toque divertido y constante a cualquier celebración.', classification: 'A', category: 'trueno' },
        { id: 'prod062', name: 'Ovni', price: 100, image: 'img/productos/ovni.webp', description: 'Contiene 10 piezas. El OVNI simula el vuelo de un objeto volador no identificado. Al encenderse, emite luces y destellos que giran en el aire, creando un efecto visual dinámico y sorprendente.', classification: 'A', category: 'luz' },
        { id: 'prod064', name: 'Paloma Grande', price: 160, image: 'img/productos/paloma-grande.webp', description: 'Contiene 85 piezas. La Paloma Grande es el punto medio perfecto entre potencia y tradición. Con su inconfundible forma triangular, está diseñada para liberar un estallido fuerte y seco, que impone presencia en cualquier festejo.', classification: 'A', category: 'trueno' },
        { id: 'prod065', name: 'Paloma Super', price: 170, image: 'img/productos/paloma-super.webp', description: 'Contiene 10 piezas. La Paloma Super es la versión más grande y potente de las palomas tradicionales.', classification: 'C', category: 'trueno' },
        { id: 'prod066', name: 'Pata de Elefante', price: 200, image: 'img/productos/pata-de-elefante.webp', description: 'Un cohete de gran calibre que, gracias a sus 5 disparos individuales, ofrece un espectáculo duradero. Cada disparo es potente e ilumina el cielo con una combinación explosiva de luces, colores y truenos. Bazuca con 6 tiros.', classification: 'C', category: 'aéreo' },
        { id: 'prod067', name: 'Pirinola Luminosa', price: 75, image: 'img/productos/pirinola-luminosa.webp', description: 'Contiene 6 piezas. Al encender las 2 mechas, podrás disfrutar de un conjunto de luces, mientras que gira y gira buscando diversión. Ideal para reuniones pequeñas y jugar con tus seres más queridos.', classification: 'A', category: 'luz' },
        { id: 'prod068', name: 'P-k-t Diviertas', price: 170, image: 'img/productos/p-k-t-diviertas.webp', description: 'El P-K-T Diviertas es un surtido de artículos pirotécnicos, que ofrece una variedad de efectos y espectáculos en un solo paquete. Incluye 2 abejorros, 2 trabucos, 1 mosaico de color, 6 hormigueros, 3 trabuquitos, 3 pulgas mágicas, 1 mini-paquete de cebollitas, 1 juguito explosivo, 6 crackers, 3 pitufisorpresas, 1 muecas explosivas y 2 chavitos bailarines.', classification: 'A', category: 'luz' },
        { id: 'prod069', name: 'Pokebolas', price: 90, image: 'img/productos/pokebolas.webp', description: 'Contiene 6 piezas. Al encenderse, estalla con destellos vibrantes que imitan la energía de una verdadera liberación de poder, como si un Pokémon estuviera a punto de salir al combate.', classification: 'A', category: 'luz' },
        { id: 'prod070', name: 'Pulgas Mágicas', price: 100, image: 'img/productos/pulgas-magicas.webp', description: 'Contiene 12 piezas. Al ser encendidas, las Pulgas Mágicas saltan varias luces multicolor que emiten destellos de luz intermitentes.', classification: 'A', category: 'luz' },
        { id: 'prod071', name: 'Rosas', price: 40, image: 'img/productos/rosas.webp', description: 'Contiene 6 piezas. Al encenderse La Rosa, produce una serie de destellos brillantes y multicolor, mientras gira en el suelo en forma de pétalos de rosa.', classification: 'A', category: 'luz' },
        { id: 'prod072', name: 'Tamalitos', price: 120, image: 'img/productos/tamalitos.webp', description: 'Contiene 25 piezas. Los Tamalitos producen una serie de pequeños estallidos y destellos al encenderse.', classification: 'A', category: 'luz' },
        { id: 'prod073', name: 'Trabuco', price: 100, image: 'img/productos/trabuco.webp', description: 'Contiene 6 piezas. El clásico Trabuco, al encenderse, dispara una bola de fuego, mientras despliega una cola de luz que lo acompaña hasta el cielo, en donde emite una serie de pequeños estallidos y destellos.', classification: 'A', category: 'luz', imageFit: 'contain' },
        { id: 'prod074', name: 'Trabuco Jumbo', price: 210, image: 'img/productos/trabuco-jumbo.webp', description: 'El Big Trabuco es una versión más grande y potente del clásico Trabuco. Al encenderse, despliega una cola de luz que lo acompaña hasta el cielo, en donde emite una serie de pequeños estallidos y destellos.', classification: 'A', category: 'luz' },
        { id: 'prod075', name: 'Trabuquito', price: 80, image: 'img/productos/trabuquito.webp', description: 'Contiene 10 piezas. El Trabuquito es una versión más pequeña del clásico Trabuco. Al encenderse, dispara una bola de fuego, mientras despliega una cola de luz que lo acompaña hasta el cielo, en donde emite una serie de pequeños estallidos y destellos.', classification: 'A', category: 'luz' },
        { id: 'prod076', name: 'Vara Cobra', price: 60, image: 'img/productos/vara-cobra.webp', description: 'Contiene 10 piezas. Al encenderse, lanza destellos que se retuercen y giran en el aire, mientras silba (chiflador).', classification: 'A', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod078', name: 'Vara Ever', price: 60, image: 'img/productos/vara-ever-jumbo.webp', description: 'Contiene 10 piezas. La Vara Ever Jumbo es una versión más grande y potente de la clásica Vara Ever. Al encenderse, esta vara deja a su paso una potente cascada de luz plateada que ilumina la noche (chiflador).', classification: 'A', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod079', name: 'Vara Mini Llorona', price: 110, image: 'img/productos/vara-mini-llorona.webp', description: 'Contiene 25 piezas. Al encenderse, la Vara Mini Llorona produce un sonido característico y un despliegue de luces brillantes que capturan la atención (chiflador).', classification: 'A', category: 'aéreo' },
        { id: 'prod080', name: 'Vara Pajarera', price: 150, image: 'img/productos/vara-pajarera.webp', description: 'Contiene 144 piezas. La Vara Pajarera, al ser encendida, se impulsa con una cascada de luz rojiza para terminar tronando en el cielo.', classification: 'B', category: 'aéreo', imageFit: 'contain' },
        { id: 'prod081', name: 'Vara Urba', price: 40, image: 'img/productos/vara-urba.webp', description: 'Contiene 10 piezas. Al encenderse, esta vara deja a su paso una serie de destellos brillantes y coloridos que iluminan la noche (chiflador).', classification: 'A', category: 'aéreo' },
        { id: 'prod082', name: 'Volcán', price: 55, image: 'img/productos/volcan.webp', description: 'Contiene 10 piezas. El Volcán Diamantina es un dispositivo pirotécnico que emite una serie de chispas brillantes y destellos, que imitan la apariencia de un volcán en erupción con diamantina.', classification: 'A', category: 'luz' }
    ];


    const categories = [
        'Mostrar Todos',
        'aéreo',
        'luz',
        'trueno',
        'profesional'
    ];

    function renderProductCard(product) {
        const truncatedDescription = product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description;
        const imageClass = product.imageFit === 'contain' ? 'long-product-image' : 'object-cover';
        return `
            <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover-effect reveal-fade-in" data-category="${product.category}">
                <div class="relative">
                    <img src="${product.image || 'https://via.placeholder.com/300x200.png?text=Producto'}" alt="${product.name}" class="w-full h-56 ${imageClass}">
                    <div class="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">${product.classification}</div>
                </div>
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

        const searchInput = document.getElementById('search-input-catalog');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                const activeCategoryButton = categoryFiltersContainer.querySelector('button[data-active="true"]');
                const activeCategory = activeCategoryButton ? activeCategoryButton.textContent : 'Mostrar Todos';

                let productsToFilter = allProducts;
                if (activeCategory !== 'Mostrar Todos') {
                    productsToFilter = allProducts.filter(p => p.category === activeCategory);
                }

                const filteredProducts = productsToFilter.filter(product => {
                    return product.name.toLowerCase().includes(searchTerm) ||
                           product.description.toLowerCase().includes(searchTerm);
                });
                displayProducts(filteredProducts);
            });

            const urlParams = new URLSearchParams(window.location.search);
            const searchFromUrl = urlParams.get('search');
            if (searchFromUrl) {
                searchInput.value = decodeURIComponent(searchFromUrl);
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    }
    // --- FIN LÓGICA PÁGINA DE CATÁLOGO ---

    const searchInputHome = document.getElementById('search-input-home');
    if (searchInputHome) {
        searchInputHome.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.trim();
                if (searchTerm) {
                    window.location.href = `catalogo.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
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
