
const mapStateToProps = (state) => {
  return {
    busqueda: state.busquedaReducer.busqueda,

  }
};

const mapStateToPropsArch = (state) => {
  return {
    repoName: state.repoNameReducer.repoName,
    repoOwner: state.repoOwnerReducer.repoOwner,
    ownerImage: state.ownerImageReducer.ownerImage,
  }
};

const access_token = "Coloca el nuevo token aqui";

export { mapStateToProps, mapStateToPropsArch, access_token };

