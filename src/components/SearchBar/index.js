import './index.css'
import { tomarBusqueda } from "../../store/busqueda/action";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ tomarBusqueda }) => {

 const navigate = useNavigate();

  const navegar = () => {
      navigate("/list");
  }

  //Evita el evento, y captura el valor que se utiliza en la búsqueda de los repositorios, por último redirige al componente donde se renderiza la misma.
  const prevenirTomarBusqueda = (event) => {
    event.preventDefault()
    tomarBusqueda(event)
    navegar()
    
  };
  
  return (
    


      <div className='searchBar'>

        <h4 > ¿Que Repositorio Buscamos?</h4>

        <br/>
        <nav>
          <div className="nav-wrapper grey darken-3 z-depth-3 ">
            <form onSubmit={(event) => prevenirTomarBusqueda(event)} >
              <div className="input-field">
                <input id="search" name="search" type="search" required />
                <label className="label-icon" ><i className="material-icons" >search</i></label>
                <i className="material-icons">close</i>
              </div>
              <button className="btn waves-effect waves-light  grey darken-3 btn-small z-depth-3">Buscar</button>
            </form>
          </div>
        </nav>

        
        
      </div>

    
  );
};

export default connect(null, { tomarBusqueda })(SearchBar);