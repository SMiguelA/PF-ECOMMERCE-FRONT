import axios from "../../../axios";

import {
  DELETE_PRODUCT_BY_ID,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCT_BY_PRICE,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
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
