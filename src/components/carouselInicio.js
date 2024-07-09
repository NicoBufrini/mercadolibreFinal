const carouselInicio = () => {
    let div = document.getElementById('main-content'); // Obtener el elemento 'main-content' para guardar el carrusel
    div.innerHTML = ''; // Limpiar el contenido actual del 'main-content', si lo hubiera

    // Crear contenedor principal del carrusel
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel';

    // Botón para retroceder
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button prev';
    prevButton.textContent = '‹';

    // Botón para avanzar
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button next';
    nextButton.textContent = '›';

    // Contenedor de imágenes
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'carousel-images';

    // Array con las URLs de las imágenes
    const images = ['/src/img/image1.webp', '/src/img/image2.webp', '/src/img/image3.webp', '/src/img/image4.webp', '/src/img/image5.webp'];

    // Crear elementos <img> para cada imagen y añadirlos al contenedor de imágenes
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        imagesContainer.appendChild(img); // Añadir cada imagen al contenedor de imágenes
    });

    // Añadir botones y contenedor de imágenes al contenedor principal del carrusel
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(imagesContainer);
    carouselContainer.appendChild(nextButton);

    // Añadir el contenedor principal del carrusel al elemento 'main-content'
    div.appendChild(carouselContainer);

    let currentIndex = 0; // Inicializar el índice de la imagen actual
    const totalImages = images.length; // Obtener el número total de imágenes

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        const width = imagesContainer.children[0].clientWidth; // Obtener el ancho de la primera imagen
        imagesContainer.style.transform = `translateX(-${currentIndex * width}px)`; // Mover el carrusel para mostrar la imagen correspondiente
    }

    // Función para mostrar la siguiente imagen
    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages; // Calcular el índice de la siguiente imagen
        updateCarousel(); // Actualizar la visualización del carrusel
    }

    // Función para mostrar la imagen anterior
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Calcular el índice de la imagen anterior
        updateCarousel(); // Actualizar la visualización del carrusel
    }

    // Evento para el botón de siguiente imagen
    nextButton.addEventListener('click', showNextImage);

    // Evento para el botón de imagen anterior
    prevButton.addEventListener('click', showPrevImage);

    // Intervalo para avanzar automáticamente las imágenes cada 3 segundos
    setInterval(showNextImage, 3000);
};

export default carouselInicio; // Exportar la función 'carouselInicio' como módulo
