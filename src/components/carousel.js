const exportCarrousel = (productId) => {
    // Crear contenedor principal del carrusel
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container-details';

    // Crear contenedor interno del carrusel con scroll oculto
    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel-wrapper';
    carouselWrapper.style.overflow = 'hidden';
    carouselContainer.appendChild(carouselWrapper);

    // Crear el elemento del carrusel
    const carousel = document.createElement('div');
    carousel.className = 'carousel-inner';
    carouselWrapper.appendChild(carousel);

    // Crear botón de anterior
    const prevButton = document.createElement('button');
    prevButton.className = 'prev';
    prevButton.textContent = '❮';
    carouselContainer.appendChild(prevButton);

    // Crear botón de siguiente
    const nextButton = document.createElement('button');
    nextButton.className = 'next';
    nextButton.textContent = '❯';
    carouselContainer.appendChild(nextButton);

    let index = 0; // Inicializar el índice del carrusel

    // Función asincrónica para obtener las imágenes del producto
    async function fetchImages() {
        try {
            const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
            const data = await response.json();
            return data.pictures; // Devolver las imágenes del producto
        } catch (error) {
            console.error('Error al obtener las imágenes:', error); // Manejar error en caso de fallo en la petición
        }
    }

    // Función para crear los elementos del carrusel basados en las imágenes recibidas
    function createCarouselItems(images) {
        images.forEach((image, i) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${i === 0 ? 'active' : ''}`; // Marcar el primer ítem como activo
            item.style.minWidth = '100%';
            
            const img = document.createElement('img');
            img.src = image.url; // Establecer la URL de la imagen
            img.alt = `Imagen ${i + 1}`; // Establecer texto alternativo para la accesibilidad
            item.appendChild(img); // Añadir la imagen al elemento del carrusel
            carousel.appendChild(item); // Añadir el elemento del carrusel al carrusel principal
        });
    }

    // Función para mostrar un ítem específico del carrusel
    function showItem(n) {
        const items = carousel.querySelectorAll('.carousel-item'); // Obtener todos los ítems del carrusel
        if (n >= items.length) {
            index = 0; // Volver al primer ítem si se supera el límite
        } else if (n < 0) {
            index = items.length - 1; // Ir al último ítem si se está en el primer ítem y se presiona anterior
        } else {
            index = n; // Establecer el índice deseado
        }
        carousel.style.transform = `translateX(-${index * 100}%)`; // Mover el carrusel para mostrar el ítem seleccionado
    }

    // Evento para el botón anterior
    prevButton.addEventListener('click', () => {
        showItem(index - 1); // Mostrar el ítem anterior
    });

    // Evento para el botón siguiente
    nextButton.addEventListener('click', () => {
        showItem(index + 1); // Mostrar el ítem siguiente
    });

    // Obtener imágenes y mostrar el carrusel al cargar
    fetchImages().then(images => {
        if (images) {
            createCarouselItems(images); // Crear elementos del carrusel con las imágenes obtenidas
            showItem(0); // Mostrar el primer ítem del carrusel
        }
    });

    return carouselContainer; // Devolver el contenedor del carrusel generado
};

export default exportCarrousel; // Exportar la función 'exportCarrousel' como módulo
