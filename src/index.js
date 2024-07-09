//importacion de componentes
import inicio from "./components/inicio.js";
import carrito from "./components/carrito.js";
import searchProducts from "./components/searchProducts.js";

//Preparo para cargar los componentes y eventos que van en el index
document.addEventListener('DOMContentLoaded', () => {
//Busco del html clases e ids
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const cardbutton = document.querySelector('.btn-carrito');
//Evento al hacer click en el boton "Buscar"
searchButton.addEventListener('click', () => {
    const query = searchInput.value;//optiene el valor del input
    //En caso de hacer click en el boton "Buscar" si haber puesto nada en el input:
    if(query == ''){

    }else{
    searchProducts(query,0);
    }
});
//Evento al hacer click en el boton de carrito
cardbutton.addEventListener('click',() => {
    carrito();
});   

inicio();//Carousel y productos mostrados en el inicio


});