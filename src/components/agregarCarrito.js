import carrito from "./carrito.js"; // Importación del módulo 'carrito.js'
import obtenerProductosLocalStorage from "./obtenerProductosLocalStorage.js"; // Importación del módulo 'obtenerProductosLocalStorage.js'
import guardarProductoLocalStorage from "./guardarProductosLocalStorage.js"; // Importación del módulo 'guardarProductosLocalStorage.js'

// Función para agregar un producto al carrito
const agregarCarrito = (productId) => {
    Promise.all([
        fetch(`https://api.mercadolibre.com/items/${productId}`).then(response => response.json()), // Petición para obtener detalles del producto
    ])
    .then(([product]) => {
        let id = product.id; // ID del producto
        let title = product.title; // Título del producto
        let image = product.thumbnail; // URL de la imagen del producto
        let price = product.price; // Precio del producto
        let cantidad = document.getElementById('quantity').value || 1; // Cantidad seleccionada del producto (o 1 si no se especifica)

        let obtenerProductos = obtenerProductosLocalStorage(); // Obtener productos guardados en el almacenamiento local

        // Verificar si el producto ya está en el carrito
        const productoExistente = obtenerProductos.find(prod => prod.id === id);
        if (productoExistente) {
            alert('ERROR: El producto ya existe en el carrito.'); // Alerta si el producto ya está en el carrito
        } else {
            obtenerProductos.push({ id, title, image, price, cantidad }); // Agregar el nuevo producto al arreglo de productos
            guardarProductoLocalStorage(obtenerProductos); // Guardar productos actualizados en el almacenamiento local

            alert("El producto se guardó con éxito en el carrito"); // Alerta de éxito al agregar el producto al carrito
            carrito(id); // Actualizar la visualización del carrito
        }
    });
};

export default agregarCarrito; // Exportar la función 'agregarCarrito' como módulo
