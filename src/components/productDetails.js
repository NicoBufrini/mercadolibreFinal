// Importo los componentes necesarios
import exportCarrousel from "./carousel.js";
import agregarCarrito from "./agregarCarrito.js";
import searchProducts from "./searchProducts.js";
import inicio from "./inicio.js";

// Función para mostrar los detalles del producto
const displayProductDetails = (productId, n) => {
    // Promesa para consumir la API de MercadoLibre y obtener detalles del producto
    Promise.all([
        fetch(`https://api.mercadolibre.com/items/${productId}`).then(response => response.json()), // Obtiene la información del producto
        fetch(`https://api.mercadolibre.com/items/${productId}/description`).then(response => response.json()) // Obtiene la descripción del producto
    ])
    .then(([product, description]) => {
        // Limpieza del contenido principal (main)
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';

        // Función para hacer scroll hacia arriba al cargar los detalles del producto
        window.scrollTo({
            top: 0,
            left: 0,
        });

        // Creación del elemento contenedor de los detalles del producto
        const productDetailsElement = document.createElement('div');
        productDetailsElement.classList.add('product-details');

        // Carrousel con imágenes del producto
        const carouselElement = exportCarrousel(productId);
        productDetailsElement.appendChild(carouselElement);

        // Título del producto
        const title = document.createElement('h1');
        title.textContent = product.title;
        productDetailsElement.appendChild(title);

        // Precio del producto
        let formatPrice = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });

        const divPrecio = document.createElement('div');
        divPrecio.className = 'divPrecio';

        const precio = document.createElement('h2');
        precio.textContent = formatPrice.format(product.price); // Formatea el precio
        precio.className = 'precio';
        divPrecio.appendChild(precio);

        // Cuota posible para el producto
        const cuotas = document.createElement('p');
        cuotas.textContent = 'en 6 cuotas de ' + formatPrice.format(product.price / 6); // Calcula e muestra el precio en 6 cuotas
        cuotas.className = 'cuotas';
        divPrecio.appendChild(cuotas);

        productDetailsElement.appendChild(divPrecio);

        // Cartel de envío gratis
        const divEnvioGratis = document.createElement('div');
        divEnvioGratis.className = 'divEnvioGratis';
        const spanenvioGratis = document.createElement('span');
        const envioGratis = document.createElement('span');
        spanenvioGratis.className = 'envioGratis';
        envioGratis.textContent = 'Envio Gratis';
        spanenvioGratis.appendChild(envioGratis);
        divEnvioGratis.appendChild(spanenvioGratis);
        productDetailsElement.appendChild(divEnvioGratis);

        // Selector de cantidad
        const divCantidad = document.createElement('div');
        divCantidad.className = 'quantity-selector';

        const h3Cantidad = document.createElement('h3');
        h3Cantidad.textContent = 'cantidad: ';
        divCantidad.appendChild(h3Cantidad);

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.id = 'quantity'; // Identificador utilizado en la función agregarCarrito para obtener la cantidad
        inputCantidad.value = 1;
        inputCantidad.min = 1;
        divCantidad.appendChild(inputCantidad);
        productDetailsElement.appendChild(divCantidad);

        // Cantidad disponible
        const h4CantidadDisponible = document.createElement('h4');
        h4CantidadDisponible.className = 'h4CantidadDisponible';
        h4CantidadDisponible.textContent = product.initial_quantity + " Unidades disponibles"; // Muestra la cantidad disponible del producto
        productDetailsElement.appendChild(h4CantidadDisponible);

        // Botón "Agregar al Carrito"
        const divAgregarCarrito = document.createElement('div');
        divAgregarCarrito.className = 'divAgregarCarrito';
        const botonAgregarCarrito = document.createElement('button');
        botonAgregarCarrito.textContent = 'Agregar al Carrito';
        botonAgregarCarrito.className = 'details-button';
        divAgregarCarrito.appendChild(botonAgregarCarrito);
        productDetailsElement.appendChild(divAgregarCarrito);

        // Evento para el botón "Agregar al Carrito"
        botonAgregarCarrito.addEventListener('click', () => {
            if (inputCantidad.value > product.initial_quantity) { // Verifica que la cantidad solicitada no supere el stock disponible
                alert("La cantidad de unidades supera el stock disponible");
            } else {
                agregarCarrito(productId); // Llama a la función para agregar el producto al carrito
            }
        });

        // Características del producto
        const divCaracteristicas = document.createElement('div');
        divCaracteristicas.className = 'divCaracteristicas';

        const h2Caracteristicas = document.createElement('h2');
        h2Caracteristicas.textContent = 'Características';
        divCaracteristicas.appendChild(h2Caracteristicas);

        const ulCaracteristicas = document.createElement('ul');
        ulCaracteristicas.className = 'ulCaracteristicas';
        
        // Agrega cada característica del producto obtenida de la API
        product.attributes.forEach((element) => {
            const liCaracteristicas = document.createElement('li');
            const strongCaracteristicas = document.createElement('strong');
            strongCaracteristicas.textContent = element.name + ": "; // Nombre de la característica
            liCaracteristicas.appendChild(strongCaracteristicas);
            liCaracteristicas.appendChild(document.createTextNode(element.value_name)); // Información de la característica
            ulCaracteristicas.appendChild(liCaracteristicas);
        });

        divCaracteristicas.appendChild(ulCaracteristicas); // Agrega la lista de características al div contenedor
        productDetailsElement.appendChild(divCaracteristicas);

        // Descripción del producto si está disponible
        if (description.plain_text !== '') {
            const h2DescripcionGeneral = document.createElement('h2');
            h2DescripcionGeneral.textContent = 'Descripción';
            productDetailsElement.appendChild(h2DescripcionGeneral);

            const descripcion = document.createElement('p');
            descripcion.textContent = description.plain_text;
            productDetailsElement.appendChild(descripcion);
        }

        // Botón para volver atrás
        const searchInput = document.getElementById('search-input'); // Obtiene el valor del input de búsqueda

        const divBack = document.createElement('div');
        divBack.className = 'div-back';

        const backBtn = document.createElement('button');
        backBtn.className = "back-button";
        divBack.appendChild(backBtn);
        mainContent.appendChild(divBack);
        mainContent.appendChild(productDetailsElement);

        // Evento para el botón de retroceso
        if (n === 0) { // Si se accedió desde displayProducts
            backBtn.addEventListener('click', () => {
                if (searchInput.value !== '') { // Si se accedió desde el selector de categorías antes de displayProducts
                    searchProducts(searchInput.value, 0);
                }
            });
        } else if (n === 1) { // Si se accedió desde el carrito
            backBtn.addEventListener('click', () => {
                inicio(); // Vuelve a la pantalla de inicio
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener detalles del producto:', error);
    });
};

export default displayProductDetails;
