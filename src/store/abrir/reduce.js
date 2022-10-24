
const initialState = {
    repoName: "",
    repoOwner: "",
    ownerImage: "",
};

export default (state = initialState, action) => {
    if (action.type === "ABRIR_REPONAME") {
        return {
            ...state,
            repoName: state.repoName = action.payload
        };
    }

    if (action.type === "ABRIR_REPOOWNER") {
        return {
            ...state,
            repoOwner: state.repoOwner = action.payload
        };
    }

    if (action.type === "ABRIR_OWNERIMAGE") {
        return {
            ...state,
            ownerImage: state.ownerImage = action.payload 
        };
    }


    return state;

}


