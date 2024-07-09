// Importamos los componentes necesarios
import carouselInicio from "./carouselInicio.js";
import tarjetasInicio from "./tarjetasInicio.js";
import searchProducts from "./searchProducts.js";

// Array de objetos que contiene la información, svg y botón del primer carousel de tarjetas del inicio
const cardData = [];

// Función principal para la pantalla de inicio
const inicio = () => {
    carouselInicio(); // Llama a la función para inicializar el carousel de inicio

    tarjetasInicio(cardData); // Llama a la función para mostrar las tarjetas de inicio, pasando el array cardData

    // Ejecuta la búsqueda de productos para diferentes categorías
    searchProducts('Descuentos', 1, 1);
    searchProducts('Celulares', 1, 1);
    searchProducts('Anteojos', 1, 1);
    searchProducts('Motos', 1, 1);
    searchProducts('Cascos', 1, 1);
    searchProducts('Juguetes', 1, 1);
    searchProducts('Auriculares', 1, 1);
    searchProducts('Peceras', 1, 1);
    searchProducts('Electricidad', 1, 1);
};

export default inicio;
