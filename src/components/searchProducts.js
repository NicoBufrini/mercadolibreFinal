//importo los componentes necesarios
import displayProducts from "./displayProducts.js";
import tarjetasInicio from "./tarjetasInicio.js";

const searchProducts = (query,n,cartel= 0) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)//busco los productos relacionados a la palabra en la api
        .then(response => response.json())
        .then(data => {
            if (n == 0){//en caso de que venga redireccionado desde el buscador o de las categorias
                displayProducts(data.results);
            }else if(n == 1){//en caso de que venga redireccionado de el inicio para el carousel de tarjetas
                if(cartel == 1){ // en caso de que necesite un cartel arriba del carousel de tarjetas                
                    tarjetasInicio(data.results,query);
                }else{//en caso de que no necesite un cartel
                    tarjetasInicio(data.results);
                }
            }
        })
        .catch(error => {
            console.error('Error al buscar productos:', error);
        });
};

export default searchProducts;