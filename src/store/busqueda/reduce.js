const initialState = {
    busqueda: "",
};

export default (state = initialState, action) => {
    if (action.type === "TOMAR_BUSQUEDA") {
        return {
            ...state,
            busqueda: action.payload
        };
    }

    return state;

}

