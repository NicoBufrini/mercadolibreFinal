// Importo los componentes necesarios
import obtenerProductosLocalStorage from "./obtenerProductosLocalStorage.js";
import guardarProductoLocalStorage from "./guardarProductosLocalStorage.js";
import carrito from "./carrito.js";

// Defino la función para manejar la compra exitosa del carrito
const compraCarritoExitosa = () => {
    alert('¡¡Sus compras se realizaron exitosamente!! '); // Muestra un mensaje de alerta
    
    let productos = obtenerProductosLocalStorage(); // Obtengo los productos desde el localStorage

    // Verifica si el objeto de productos existe
    if (productos) {
        // Si es un array, simplemente vacíalo
        if (Array.isArray(productos)) {
            productos.length = 0;
        } else {
            // Si es un objeto, elimina todas sus propiedades
            for (let key in productos) {
                if (productos.hasOwnProperty(key)) {
                    delete productos[key];
                }
            }
        }

        // Guarda el objeto vacío de nuevo en localStorage
        guardarProductoLocalStorage(productos);
        carrito(); // Recargo el carrito para actualizar la pantalla
    } else {
        console.log("No se encontraron productos en localStorage.");
    }
}

export default compraCarritoExitosa;
