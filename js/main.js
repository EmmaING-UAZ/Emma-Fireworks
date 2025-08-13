document.addEventListener('DOMContentLoaded', () => {
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
        {
            id: 'fp001',
            name: 'batería la reina',
            price: 1250.00,
            image: 'img/productos/cake_imperial.jpg',
            description: 'Impresionante batería de 100 disparos con variedad de efectos coloridos y sonoros. Ideal para grandes celebraciones.',
            category: 'General'
        },
        {
            id: 'fp002',
            name: 'bazuka 4 pulgadas',
            price: 80.00,
            image: 'img/productos/bengalas.jpg',
            description: 'Clásicas luces de bengala, seguras y divertidas para todas las edades. Chispas doradas brillantes.',
            category: 'General'
        },
        {
            id: 'fp003',
            name: 'bob esponja',
            price: 150.00,
            image: 'img/productos/volcan_etna.jpg',
            description: 'Fuente de chispas plateadas de larga duración que alcanza hasta 3 metros de altura.',
            category: 'General'
        },
        {
            id: 'fp004',
            name: 'paloma grande',
            price: 220.00,
            image: 'img/productos/revelacion_azul.jpg',
            description: 'Cañón de confeti y polvo de color azul para revelar el género del bebé. ¡Un momento emocionante!',
            category: 'General'
        },
        {
            id: 'fp005',
            name: 'Trabuco',
            price: 45.00,
            image: 'img/productos/paloma_estruendo.jpg',
            description: 'Petardo de gran trueno, para los amantes de los efectos sonoros potentes.',
            category: 'General'
        },
        {
            id: 'fp006',
            name: 'volcán',
            price: 350.00,
            image: 'https://via.placeholder.com/300x200.png?text=Crisantemo+Rojo', // Placeholder
            description: 'Un efecto clásico de crisantemo rojo que llena el cielo. Impactante y elegante.',
            category: 'General'
        }
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
        { id: 'prod001', name: 'Batena Baby', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod002', name: 'batería la reina', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod003', name: 'bazuca baby', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod004', name: 'bazuka 2 pulgadas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod005', name: 'bazuka 3 pulgadas cacahuate', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod006', name: 'bazuka 3 pulgadas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod007', name: 'bazuka 4 pulgadas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod008', name: 'big trabuco', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod009', name: 'billete', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod010', name: 'bob esponja 2', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod011', name: 'bob esponja', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod012', name: 'bobilio grande', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod013', name: 'bola de humo 2', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod014', name: 'bola de humo gigante', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod015', name: 'bola de humo', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod016', name: 'bola de luz', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod017', name: 'bombillo mediano', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod018', name: 'bombillo r-15', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod019', name: 'bombillo', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod020', name: 'Brujitas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod021', name: 'carrilera', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod022', name: 'cerveza luminosa', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod023', name: 'chiflador de piso grande', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod024', name: 'chifladores', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod025', name: 'cohete de trueno', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod026', name: 'cohete de luz', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod027', name: 'cohetoncito bomba', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod028', name: 'cohetoncito de cracker', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod029', name: 'cohetoncito de microfono', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod030', name: 'cohetoncito de paracaídas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod031', name: 'cohetoncito de trueno', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod032', name: 'cosmopolitan', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod033', name: 'cracker de colores', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod034', name: 'crackle spinners', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod035', name: 'cuete blanco', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod036', name: 'dragoncitos', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod037', name: 'escupidor de colores', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod038', name: 'escupidor de diamantina', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod039', name: 'espanta suegras', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod040', name: 'flash', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod041', name: 'frozen', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod042', name: 'Hormiguero', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod043', name: 'juguitos explosivos', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod044', name: 'mexicano espacial', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod045', name: 'mini bombillo', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod046', name: 'misil chico', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod047', name: 'mosaico de color', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod048', name: 'olla chica', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod049', name: 'olla grande', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod050', name: 'olla mediana', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod051', name: 'ovni', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod052', name: 'paloma grande', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod053', name: 'paloma super', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod054', name: 'pata de elefante', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod055', name: 'pirinola luminosa', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod056', name: 'p-k-t diviertas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod057', name: 'pokebolas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod058', name: 'pulgas magicas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod059', name: 'r15 tricolor', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod060', name: 'rosas chavito', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod061', name: 'rosas', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod062', name: 'tamalitos', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod063', name: 'Trabuco', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod064', name: 'trabuguito', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod065', name: 'vara cobra', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod066', name: 'vara ever jumbo', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod067', name: 'vara ever', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod068', name: 'vara mini llorona', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod069', name: 'vara pajarera', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod070', name: 'vara urba', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' },
        { id: 'prod071', name: 'volcán', price: 10.00, image: 'https://via.placeholder.com/300x200.png?text=Producto', description: 'Descripción no disponible.', category: 'General' }
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
