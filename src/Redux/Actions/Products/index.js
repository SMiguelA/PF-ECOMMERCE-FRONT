import axios from "../../../axios";

import {
  ADD_TO_CART,
  DECREASE_CART,
  DELETE_PRODUCT_BY_ID,
  FILTER_PRODUCTS,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_GENDER,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_PRODUCT_BY_PRICE,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  INCREASE_CART,
  REMOVE_FROM_CART,
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

export const filterProducts = (filters) => {
  return async function (dispatch) {
    try {
      let data = await axios.get(
        `/products?filterCategory=${filters.filterCategory}&filterPlatform=${filters.filterPlatform}&filterPrice=${filters.filterPrice}&name=${filters.name}`
      );
      return dispatch({
        type: FILTER_PRODUCTS,
        payload: data.data,
      });
    } catch (error) {
      window.alert(error.response.data.Error);
    }
  };
};

export const filterProductsByCategory = (payload) => {
  return {
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload,
  };
};

export const filterProductsByGender = (payload) => {
  return {
    type: FILTER_PRODUCTS_BY_GENDER,
    payload,
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    if (!name.length) {
      const data = await axios.get("/products");
      return dispatch({ type: GET_PRODUCTS, payload: data.data });
    }

    try {
      const json = await axios.get(`/products?name=${name}`);
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

export const signup = (payload) => {
  return function (dispatch) {
    const { name, email, password } = payload;
    axios
      .post("/users/signup", { name, email, password })
      .then((response) => {
        const user = response.data;
        dispatch({ type: SIGNUP, payload: user });
      })
      .catch((error) => {
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
        dispatch({ type: ADD_TO_CART, payload: user.cart });
      })
      .catch((error) => {
        console.log(`Error registrando usuario: ${error}`);
      });
  };
};

export const decreaseCart = (payload) => {
  return function (dispatch) {
    const { productId, price, userId } = payload;

    axios
      .post(`/products/decrease-cart`, { productId, price, userId })
      .then((response) => {
        const user = response.data;

        dispatch({ type: DECREASE_CART, payload: user });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const increaseCart = (payload) => {
  return function (dispatch) {
    const { productId, price, userId } = payload;

    axios
      .post(`/products/increase-cart`, { productId, price, userId })
      .then((response) => {
        const user = response.data;

        dispatch({ type: INCREASE_CART, payload: user });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const removeFromCart = (payload) => {
  return function (dispatch) {
    const { productId, price, userId } = payload;

    axios
      .post(`/products/remove-from-cart`, { productId, price, userId })
      .then((response) => {
        const user = response.data;
        dispatch({ type: REMOVE_FROM_CART, payload: user });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const filterProductsByType = (payload) => {
  return {
    type: FILTER_PRODUCTS_BY_TYPE,
    payload,
  };
};
