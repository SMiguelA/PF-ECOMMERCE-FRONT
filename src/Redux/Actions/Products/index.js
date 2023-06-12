import axios from "../../../axios";

import {
  ADD_TO_CART,
  DELETE_PRODUCT_BY_ID,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_PRODUCT_BY_PRICE,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  SIGNUP,
} from "../../actionsTypes.js";

export const getProducts = () => {
  return function (dispatch) {
    axios
      .get("/products")
      .then((response) => {
        const products = response.data;
        dispatch({ type: GET_PRODUCTS, payload: products });
      })
      .catch((error) => {
        console.log(`Error obteniendo products: ${error}`);
      });
  };
};

export const filterProductsByCategory = (payload) => {
  return {
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload,
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/products?name=${name}`);
      return dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      window.alert(error.response.data.Error);
    }
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      window.alert(error.response.data.Error);
    }
  };
};

export const deletProductId = () => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: DELETE_PRODUCT_BY_ID,
      });
    } catch (error) {
      window.alert(error.response.data.Error);
    }
  };
};
export const filterProductsByPrice = (payload) => {
  return {
    type: FILTER_PRODUCT_BY_PRICE,
    payload,
  };
};

<<<<<<< HEAD
export const signup = (payload) => {
  return function (dispatch) {
    const { name, email, password } = payload;
    console.log(name, email, password);
    axios
      .post("/users/signup", { name, email, password })
      .then((response) => {
        const user = response.data;
        console.log("user es: en el actions");
        console.log(user);
        dispatch({ type: SIGNUP, payload: user });
      })
      .catch((error) => {
        console.log(error);
        console.log(`Error registrando usuario: ${error}`);
      });
  };
};

export const addToCart = (payload) => {
  return function (dispatch) {
    const { userId, productId, price, image } = payload;

    axios
      .post(`/products/add-to-cart`, { userId, productId, price })
      .then((response) => {
        const user = response.data;
        console.log("se hizo el dispatch de actions a reducer ");
        console.log(user);
        dispatch({ type: ADD_TO_CART, payload: user });
      })
      .catch((error) => {
        console.log(error);
        console.log(`Error registrando usuario: ${error}`);
      });
=======
export const filterProductsByType = (payload) => {
  console.log("payload en action es:");
  console.log(payload);
  return {
    type: FILTER_PRODUCTS_BY_TYPE,
    payload,
>>>>>>> fafce39ed5fe4ae5ce9506f3856176ae727702d1
  };
};
