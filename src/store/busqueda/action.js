const tomarBusqueda = (event) => {
    return {
        type: "TOMAR_BUSQUEDA",
        payload: event.target.search.value 
    };
};


export { tomarBusqueda };

