import './App.css'
import { Routes, Route } from "react-router-dom";

import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import FilesList from './components/FilesList';


// TRAER ESTADO Y HACER CONDICIONAL, SI ES = "" REDIRIGIR A path="/"


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="" element={<SearchBar />}></Route>
        <Route path="list" element={<RepoList />}></Route>
        <Route path="repository" element={<FilesList />}></Route>
      </Routes>


    </div>
  );
}

export default App;
