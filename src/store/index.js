import {createStore, combineReducers} from "redux";
import busquedaReducer from "./busqueda/reduce";      
import repoNameReducer from "./abrir/reduce";
import repoOwnerReducer from "./abrir/reduce";
import ownerImageReducer from "./abrir/reduce";



const reducers = combineReducers ({
     busquedaReducer, repoNameReducer, repoOwnerReducer, ownerImageReducer
});

const store = createStore(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

