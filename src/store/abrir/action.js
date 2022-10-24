
const abrirRepoName = (repo1) => {
    return {
        type: "ABRIR_REPONAME",
        payload: repo1
    };
};

const abrirRepoOwner = (repo2) => {

    return {
        type: "ABRIR_REPOOWNER",
        payload: repo2
    };
};

const abrirOwnerImage = (repo3) => {
    return {
        type: "ABRIR_OWNERIMAGE",
        payload: repo3
    };
};



export { abrirRepoName, abrirRepoOwner, abrirOwnerImage };
