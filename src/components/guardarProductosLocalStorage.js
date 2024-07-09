const guardarProductoLocalStorage = (producto) => {
    localStorage.setItem('productos', JSON.stringify(producto)); // Guarda el producto en localStorage como JSON
};

export default guardarProductoLocalStorage;
