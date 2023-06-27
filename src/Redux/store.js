import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer";

// Recupera los datos del localStorage
const storedUser = localStorage.getItem("user");
const storedAllProducts = localStorage.getItem("allProducts");
const storedproducts = localStorage.getItem("products");
const storedMyFavorites = localStorage.getItem("myFavorites");
const initialState = {
  // localStorage.setItem("user", JSON.stringify(users));
  // Utiliza los datos almacenados para inicializar el estado de Redux
  user: storedUser ? JSON.parse(storedUser) : null,
  allProducts: storedAllProducts ? JSON.parse(storedAllProducts) : null,
  products: storedproducts ? JSON.parse(storedproducts) : null,
  myFavorites: storedMyFavorites ? JSON.parse(storedMyFavorites) : null,
};
console.log("se inicio initialState");

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
