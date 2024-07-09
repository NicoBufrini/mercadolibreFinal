// Importo los componentes necesarios
import displayProductDetails from "./productDetails.js";
import inicio from "./inicio.js";

// Obtengo el elemento main donde se mostrarán los productos
const mainContent = document.getElementById('main-content');

// Defino la función para mostrar productos
const displayProducts = (products) => {
    mainContent.innerHTML = ''; // Limpio el contenido actual del main, si lo hubiera

    // Botón de retroceder
    const divBack = document.createElement('div');
    divBack.className = 'div-back';

    const backBtn = document.createElement('button');
    backBtn.className = "back-button";
    divBack.appendChild(backBtn);
    mainContent.appendChild(divBack);

    // Evento para el botón de retroceder
    backBtn.addEventListener('click', () => {
        mainContent.textContent = '';
        inicio(); // Redirecciono al inicio al hacer clic en retroceder
    });

    // Para darle formato a los precios
    let formatPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    // Creo el HTML para mostrar todos los productos obtenidos
    products.forEach(product => {
        const productElement = document.createElement('div'); // Div contenedor de cada producto
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <div class="divEnvioGratis"><span class="envioGratis"><span>Envio Gratis</span></span></div>
            <p>Precio: $${formatPrice.format(product.price)}</p>
            <button data-id="${product.id}" class="details-button">Ver detalles</button>
        `;
        mainContent.appendChild(productElement); // Agrego cada contenedor de producto al main
    });

    // Evento para el botón de "Ver detalles"
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id'); // Obtengo el id del producto
            displayProductDetails(productId, 0); // Redirecciono al detalle del producto
        });
    });
};

export default displayProducts;
