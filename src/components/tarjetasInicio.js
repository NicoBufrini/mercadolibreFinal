// Importo el componente necesario
import displayProductDetails from "./productDetails.js";

// Función para mostrar tarjetas de productos en la página de inicio
const tarjetasInicio = (cardData, cartel = 0) => {
    const div = document.getElementById('main-content'); // Obtengo el elemento main para colocar todo el contenido

    const divTarjetas = document.createElement('div'); // Contenedor principal del carousel de tarjetas
    divTarjetas.className = 'carousel-container';

    if (cartel !== 0) { // Si se requiere un cartel encima del carousel
        const divContenedor = document.createElement('div'); // Contenedor del cartel y el carousel
        divContenedor.className = 'divCartel';
        const divCartel = document.createElement('div');
        divCartel.className = 'cartel';
        const h3Cartel = document.createElement('h3');
        h3Cartel.textContent = cartel === 'Ofertas' ? cartel : `Lo más vendido en ${cartel}!`; // Texto del cartel dependiendo del tipo
        divCartel.appendChild(h3Cartel);
        divContenedor.appendChild(divCartel);
        divContenedor.appendChild(divTarjetas);
        div.appendChild(divContenedor); // Agrego el contenedor al main
    }

    // Botón para retroceder en el carousel
    const buttonPrev = document.createElement('button');
    buttonPrev.className = 'carousel-button prev';
    buttonPrev.textContent = '‹';
    divTarjetas.appendChild(buttonPrev);

    const divTarjetasContainer = document.createElement('div'); // Contenedor de todas las tarjetas
    divTarjetasContainer.className = 'card-container';
    divTarjetasContainer.id = 'cardContainer';

    // Función para formatear el precio
    let formatPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    // Creación de cada tarjeta de producto
    cardData.forEach(data => {
        const precioFormateado = formatPrice.format(data.price); // Formato del precio
        const precioFormateadoCuotas = formatPrice.format(data.price / 12); // Formato del precio en cuotas
        const card = document.createElement('div'); // Contenedor de cada tarjeta
        card.className = 'card';
        card.innerHTML = `
            ${data.thumbnail ? `<img src="${data.thumbnail}" alt="${data.title}">` : ''}  
            <h2>${data.title}</h2>            
            ${data.image ? `<img src="${data.image}" alt="${data.title}">` : ''}            
            ${data.description ? `<p>${data.description}</p>` : ''}
            ${data.price ? `<p class="precio">${precioFormateado}</p>` : ''}
            ${data.price ? `<p class="cuotas12">Mismo precio en 12 cuotas de ${precioFormateadoCuotas}</p>` : ''}
            ${data.buttonText ? `<button>${data.buttonText}</button>` : ''}
            ${data.price ? `<button data-id="${data.id}" class="details-button">Detalles</button>` : ''}
        `;
        divTarjetasContainer.appendChild(card);
    });

    divTarjetas.appendChild(divTarjetasContainer);

    // Evento para el botón "Detalles" de cada tarjeta
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id'); // Obtengo el ID del producto
            displayProductDetails(productId, 1); // Redirige a la página de detalles del producto
        });
    });

    // Botón para avanzar en el carousel
    const buttonNext = document.createElement('button');
    buttonNext.className = 'carousel-button next';
    buttonNext.textContent = '›';
    divTarjetas.appendChild(buttonNext);

    let currentIndex = 0; // Índice inicial del carousel

    // Evento para retroceder en el carousel
    buttonPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel(); // Actualiza la posición del carousel
        }
    });

    // Evento para avanzar en el carousel
    buttonNext.addEventListener('click', () => {
        if (currentIndex < cardData.length - 1) {
            currentIndex++;
            updateCarousel(); // Actualiza la posición del carousel
        }
    });

    div.appendChild(divTarjetas);

    // Función para actualizar la posición del carousel
    function updateCarousel() {
        const cardWidth = document.querySelector('.card').offsetWidth; // Ancho de una tarjeta (incluye borde y padding)
        const margin = 10; // Margen entre tarjetas
        const offset = -(currentIndex * (cardWidth + margin)); // Calcula el desplazamiento basado en el índice y el ancho de la tarjeta
        divTarjetasContainer.style.transform = `translateX(${offset}px)`; // Aplica el desplazamiento horizontal al contenedor de tarjetas
    }
};

export default tarjetasInicio;
