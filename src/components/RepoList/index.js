import './index.css'

import { abrirRepoName, abrirRepoOwner, abrirOwnerImage } from "../../store/abrir/action";
import { mapStateToProps, access_token } from "../../utils/index"

import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";


const RepoList = ({ busqueda, abrirRepoOwner, abrirRepoName, abrirOwnerImage }) => {

  const navigate = useNavigate();
  const [list, setList] = useState([])
  const [numberPage, setnumberPage] = useState(1)

  //Captura los valores que se utilizan para la apertura del repositorio, también captura la imagen de perfil del usuario. Por último redirige.
  const obtenerDatos = (repoName, repoOwner, ownerImage) => {
    abrirRepoName(repoName)
    abrirRepoOwner(repoOwner)
    abrirOwnerImage(ownerImage)
    navigate("/repository")
  };


  //Evita un error que se da cuando se intenta renderizar la lista de repositorios sin el valor de la búsqueda. 
  const initialRender = () => {
    if (busqueda == "") {
      navigate("/")
    }
    else { obtenerListas() }
  }


  useEffect(() => {
    initialRender()
  }, [])

  //Llamado. Trae las páginas necesarias de listas de a 15 repositorios. 
  const obtenerListas = async () => {
    const data = await fetch(`https://api.github.com/search/repositories?q=${busqueda}&per_page=15`, {
      headers: {
        'Authorization': `token ${access_token}`
      }
    })
    const listRepo = await data.json()
    setList(listRepo)
  }

  //Llamado. Cambia las páginas, para avanzar en la lista. 
  const cambiarPagina = async (numero = 1) => {

    if (list.total_count <= 15) {
      setnumberPage(1)
      obtenerListas()
    }
    else {
      if (numero <= 1) { setnumberPage(1) }
      else { setnumberPage(numero) }

      const data = await fetch(`https://api.github.com/search/repositories?q=${busqueda}&per_page=15&page=${numero}`, {
        headers: {
          'Authorization': `token ${access_token}`
        }
      })
      const page = await data.json()
      setList(page)
    }

  }

  //Mapeo y renderizado de la lista.
  function ReposLista(props) {
    const reposToMap = props.repos;
    if (reposToMap) {
      const repoList = reposToMap.map((repo) => (
        <a key={repo.id} id="link" className="collection-item avatar grey darken-4" onClick={() => obtenerDatos(repo.name, repo.owner.login, repo.owner.avatar_url)}  >
          <img src={repo.owner.avatar_url} alt="github" className="circle"></img>
          <span className="title">{repo.owner.login}</span>
          <br />
          <p>{repo.name}</p>
        </a>
      ));

      return (
        <div className="collection">{repoList}</div>
      );
    }
  }

  return (

    <div className="container" id="lista">

      <div className="row">
        <h5 className="col"> Se Encontraron </h5>
        <h5 className="col z-depth-3" id="numeroRepos">{list.total_count}</h5>
        <h5 className="col"> Repositorios</h5>
      </div>

      <ReposLista repos={list.items}></ReposLista>

      <div className="row">

        <Link to="/"> <button className="btn waves-effect waves-light  grey darken-3 col s5 btn-small z-depth-3" >Nueva Busqueda</button></Link>

        <ul className="pagination col s9 offset-s9">
          <li className="waves-effect" ><a className="icons" onClick={() => cambiarPagina(numberPage - 1)}><i className="material-icons">arrow_back</i></a></li>
          {numberPage}
          <li className="waves-effect"><a className="icons" onClick={() => cambiarPagina(numberPage + 1)}><i className="material-icons">arrow_forward</i></a></li>
        </ul>

      </div>

    </div>

  );
};

export default connect(mapStateToProps, { abrirRepoName, abrirRepoOwner, abrirOwnerImage })(RepoList);