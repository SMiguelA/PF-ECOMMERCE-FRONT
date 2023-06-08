import axios from "../../../axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY";

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
