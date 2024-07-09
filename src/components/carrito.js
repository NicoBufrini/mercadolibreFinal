// Importo componentes necesarios
import obtenerProductosLocalStorage from "./obtenerProductosLocalStorage.js";
import guardarProductoLocalStorage from "./guardarProductosLocalStorage.js";
import compraCarritoExitosa from "./compraCarritoExitosa.js";
import inicio from "./inicio.js";
import displayProductDetails from "./productDetails.js";

// Defino la función principal 'carrito' con un parámetro opcional 'id'
const carrito = (id=0) => {
    const productos = obtenerProductosLocalStorage(); // Obtengo los productos guardados en el Local Storage

    let div = document.getElementById('main-content'); // Obtengo el elemento main donde se mostrará el carrito
    div.textContent = ''; // Limpio el contenido actual del main, si lo hubiera

    let divProducts = document.createElement('div'); // Creo un nuevo div para los productos del carrito

    let productosHTML = '';

    // Botón de retroceder
    const divBack = document.createElement('div');
    divBack.className = 'div-back';

    const backBtn = document.createElement('button');
    backBtn.className = "back-button";  
    divBack.appendChild(backBtn);
    div.appendChild(divBack);

    // Evento para el botón de retroceder
    backBtn.addEventListener('click', () => {
        div.textContent = '';
        if(id == 0){
            inicio(); // Vuelvo a la pantalla de inicio si id es 0
        } else {
            displayProductDetails(id, 1); // Muestro los detalles del producto si id no es 0
        }
    });

    // Verifico si hay productos en el carrito
    if (productos.length === 0) {  
        productosHTML += '<h1> No hay productos en el carrito!! </h1>';
        divProducts.innerHTML = productosHTML;
        div.appendChild(divProducts); 
    } else {
        let precioTotal = 0;

        // Formateo de precios
        let formatPrice = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });
        
        productosHTML += '<h1> Productos del carrito </h1>';

        // Recorro los productos y creo el HTML correspondiente
        for (var i = 0; i < productos.length; i++) {                                                  
            productosHTML += '<div class="productos_carrito">';
            productosHTML += '<img class="imagen_carrito" src="' + productos[i].image + '" alt="' + productos[i].title + '">';
            productosHTML += '<div class="producto_carrito">';            
            productosHTML += '<h2 class="titulo_carrito">' + productos[i].title + '</h2>';
            productosHTML += '<p class="precio_carrito">' + 'Precio unitario: ' + formatPrice.format(productos[i].price) + '</p>';            
            productosHTML += '<div class="quantity-selector">'
            productosHTML += '<h3> Cantidad:  </h3>'        
            productosHTML += '<input type="number" class="quantity-input" data-id="'+ productos[i].id +'" value="'+ productos[i].cantidad +'" min="1">' 
            productosHTML += '<button class="button-quantity-selector" data-id="'+ productos[i].id +'">Modificar Unidades</button>'       
            productosHTML += '</div>' 
            productosHTML += '<p>' + 'Total: ' + formatPrice.format(productos[i].price * productos[i].cantidad) + '</p>';
            productosHTML += '<button class="producto-comprar" data-id="'+ productos[i].id +'" >' + 'Comprar' + '</button>';
            productosHTML += '<button class="borrar_producto_carrito" data-id="'+ productos[i].id +'" >' + 'Borrar del carrito' + '</button>'; 
            productosHTML += '<button class="detalles_producto_carrito" data-id="'+ productos[i].id +'" >' + 'Detalles' + '</button>';                        
            productosHTML += '</div>';  
            productosHTML += '</div>'; 
            precioTotal += productos[i].price * productos[i].cantidad;
        }
        productosHTML += '<h3> Precio total: '+ formatPrice.format(precioTotal) +' </h3>'
        productosHTML += '<button class="producto-comprar-carrito" >' + 'Comprar todo el carrito' + '</button>';

        divProducts.innerHTML = productosHTML;
        div.appendChild(divProducts);            

        // Eventos para los botones dentro del carrito

        // Evento para cada botón de "Comprar" producto individual
        document.querySelectorAll('.producto-comprar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');  
                const producto = productos.filter(producto => producto.id !== id);
                guardarProductoLocalStorage(producto);
                alert('Su compra se realizó exitosamente');
                carrito();
            })
        })

        // Evento para cada botón de "Detalles" del producto
        document.querySelectorAll('.detalles_producto_carrito').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');  
                displayProductDetails(id, 1);
            })
        })

        // Evento para cada botón de "borrar del carrito"
        document.querySelectorAll('.borrar_producto_carrito').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');  
                const producto = productos.filter(producto => producto.id !== id);
                guardarProductoLocalStorage(producto);
                carrito();
            })
        })       

        // Evento para el botón de "Comprar todo el carrito"
        document.querySelectorAll('.producto-comprar-carrito').forEach(button => {
            button.addEventListener('click', (e) => {
                compraCarritoExitosa();
            });
        });

        // Evento para el botón de "Modificar unidades" de producto   
        document.querySelectorAll('.button-quantity-selector').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const newQuantity = document.querySelector(`.quantity-input[data-id="${id}"]`).value;
                modificarCantidadProducto(id, newQuantity);
            });
        });
    }
};

// Función para modificar la cantidad de un producto en el carrito
const modificarCantidadProducto = (id, newQuantity) => {
    const productos = obtenerProductosLocalStorage();
    const productoIndex = productos.findIndex(producto => producto.id == id);
    
    if (productoIndex > -1) {
        productos[productoIndex].cantidad = parseInt(newQuantity);
        guardarProductoLocalStorage(productos);        
        carrito(); 
    }
};

export default carrito;
