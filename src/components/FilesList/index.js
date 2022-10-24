import './index.css'
import { mapStateToPropsArch, access_token } from "../../utils/index";

import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import MDEditor from '@uiw/react-md-editor';

const FileList = ({ repoName, repoOwner, ownerImage }) => {

  const navigate = useNavigate();
  const [texto, setTexto] = useState("Intenta abrir un archivo...")
  const [files, setFiles] = useState([])

  //Evita un error que se da cuando se intenta renderizar la lista de archivos sin los valores necesarios. 
  const initialRender = () => {
    if (repoName == "") {
      navigate("/")
    }
    else { obtenerArchivos() }
  }


  useEffect(() => {
    initialRender()
  }, [])


  //Llamado. Ingreso al contenido del repositorio elegido.
  const obtenerArchivos = async () => {

    const data = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/`, {
      headers: {
        'Authorization': `token ${access_token}`
      }
    })
    const filesList = await data.json()

    const repoVacio = () => {
      Swal.fire({
        imageUrl: "https://cdn-icons-png.flaticon.com/512/25/25231.png", imageWidth: "100px", text: "El repositorio esta vacio", footer: '<a href="">Hacer una nueva busqueda</a>',
        color: "rgb(94,92,92)", confirmButtonColor: "rgb(0,0,0)"
      })

    }
    //Condicional para que en caso de que el repositorio este vacio no genere error.
    if (filesList.message == 'This repository is empty.') { repoVacio() }
    else { setFiles(filesList) }
    console.log(filesList)
  }

  //Llamado. Navegación dentro del repositorio según el tipo de archivo que se quiera abrir.
  const cambiarFile = async (git_url, tipo, url) => {

    if (tipo == "dir") {
      const data = await fetch(git_url, {
        headers: {
          'Authorization': `token ${access_token}`
        }
      })

      const contenido = await data.json()
      setFiles(contenido.tree)

    }
    else if (tipo == "file") {
      const data = await fetch(git_url, {
        headers: {
          'Authorization': `token ${access_token}`
        }
      })

      const contenido = await data.json()
      setTexto(atob(contenido.content))

    }
    else if (tipo == "tree") {
      const data = await fetch(url, {
        headers: {
          'Authorization': `token ${access_token}`
        }
      })
      const contenido = await data.json()
      setFiles(contenido.tree)
    }
    else if (tipo == "blob") {
      const data = await fetch(url, {
        headers: {
          'Authorization': `token ${access_token}`
        }
      })
      const contenido = await data.json()
      setTexto(atob(contenido.content))
    }
  }

  //Mapeo y renderizado de la lista de archivos, según el tipo de archivo.
  function ReposArch(props) {
    const filesToMap = props.files;
    if (filesToMap) {
      const icons = (filetype, filename, filepath) => {
        if (filetype == "dir") {
          return (<p><i className="material-icons">folder_open</i> {filename} </p>)
        }
        else if (filetype == "file") {
          return (<p><i className="material-icons">insert_drive_file</i> {filename} </p>)
        }
        else if (filetype == "tree") {
          return (<p><i className="material-icons">folder_open</i> {filepath} </p>)
        }
        else if (filetype == "blob") {
          return (<p><i className="material-icons">insert_drive_file</i> {filepath} </p>)
        }
      }
      const ReposArch = filesToMap.map((file) =>

        <a key={file.sha} className="collection-item grey darken-4" id="link" onClick={() => cambiarFile(file.git_url, file.type, file.url)}>
          {icons(file.type, file.name, file.path)}
        </a>

      );
      return (
        <ul className="collection">{ReposArch}</ul>
      );
    }
  }


  return (

    <div>

      <div className="container" id="head">

        <div className="row" id="head2">
          <img src={ownerImage} alt="github" className="circle col s1" id="imagen"></img>

          <div className="col s2" id="nombres" >
            <p className="title">{repoOwner}</p>
            <p>{repoName}</p>
          </div >

          <Link to="/list"><button className="waves-effect waves-light  grey darken-3 btn-small col offset-s6" id="btn1">Volver a la Lista</button></Link>
          <Link to="/"><button className="waves-effect waves-light  grey darken-3 btn-small  col offset-s6" id="btn2">Nueva Busqueda</button></Link>
        </div>

      </div>

      <div className='container'>

        <div className="column">

          <div className="col s5" id="container-files">

            <div className="row">

              <h5 className="col" >Lista de Archivos:</h5>
              <button className="waves-effect waves-light  grey darken-3 btn-small col offset-s7" onClick={() => obtenerArchivos()}>Volver</button>

            </div >

            <ReposArch files={files} />

          </div >

          <div className="col" >

            <div id="visual-code">
              <MDEditor.Markdown
                style={{ padding: 15 }}
                source={texto}
                linkTarget="_blank"

              />
            </div>

          </div >

        </div>

      </div>

    </div>
  );
};

export default connect(mapStateToPropsArch, null)(FileList);