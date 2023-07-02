import axios from "../../../axios";

import {
  ACTIVE_PRODUCTS_CATEGORY,
  ACTIVE_PRODUCTS_NAME,
  ACTIVE_PRODUCTS_PLATFORM,
  ACTIVE_PRODUCTS_PRICE,
  ADD_TO_CART,
  CREATE_PRODUCT,
  CREATE_REVIEW,
  DECREASE_CART,
  DELETE_PRODUCT_BY_ID,
  EDIT_REVIEW,
  FILTER_PRODUCTS,
  FILTER_PRODUCTS_BY_GENDER,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_PRODUCT_BY_PRICE,
  GET_NOT_REVIEW,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  INCREASE_CART,
  MODIFY_STOCK_PRODUCT,
  OPEN_EDIT,
  REMOVE_FROM_CART,
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

export const modifyProductStock = (cart) => {
  return function (dispatch) {
    const cartItems = Object.keys(cart);
    const productIds = cartItems.filter(
      (key) => key !== "count" && key !== "total"
    );
    const stockPromises = productIds.map((productId) => {
      const quantity = cart[productId];
      return axios.put(`/products/${productId}`, { stock: quantity });
    });

    Promise.all(stockPromises)
      .then(() => {
        dispatch({ type: MODIFY_STOCK_PRODUCT });
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
      console.log("Error filter Products");
    }
  };
};

export const createReviewAction = ({
  rating,
  description,
  id_cliente,
  date,
  id_product,
}) => {
  return async function (dispatch) {
    try {
      const json = await axios.put(`/products/${id_product}`, {
        valorations: {
          id_cliente,
          comment: description,
          rating,
          date,
        },
      });
      return dispatch({
        type: CREATE_REVIEW,
      });
    } catch (error) {
      window.alert(error.response.data.Error);
    }
  };
};

export const activeFilterName = (payload) => {
  return {
    type: ACTIVE_PRODUCTS_NAME,
    payload,
  };
};

export const activeFilterPlatform = (payload) => {
  return {
    type: ACTIVE_PRODUCTS_PLATFORM,
    payload,
  };
};

export const activeFilterPrice = (payload) => {
  return {
    type: ACTIVE_PRODUCTS_PRICE,
    payload,
  };
};

export const activeFilterCategory = (payload) => {
  return {
    type: ACTIVE_PRODUCTS_CATEGORY,
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

export const deleteProduct = (payload) => {
  return function (dispatch) {
    const { product_id, user_id } = payload;
    console.log(product_id, user_id, " esto es en el product actions");

    //   axios
    //     .post(`/products/decrease-cart`, { productId, price, userId })
    //     .then((response) => {
    //       const user = response.data;

    //       dispatch({ type: DECREASE_CART, payload: user });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  };
};

export const increaseCart = (payload) => {
  return function (dispatch) {
    const { productId, price, userId, stock } = payload;

    axios
      .post(`/products/increase-cart`, { productId, price, userId, stock })
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

    console.log(price, "price en removeFromCart");

    axios
      .post(`/products/remove-from-cart`, { productId, price, userId })
      .then((response) => {
        const user = response.data;
        console.log(user, "user en la consulta al back");
        dispatch({ type: REMOVE_FROM_CART, payload: user });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createProduct = (
  name,
  description,
  price,
  category,
  platform,
  pictures,
  stock
) => {
  return function (dispatch) {
    console.log(
      name,
      description,
      price,
      category,
      platform,
      pictures,
      stock,
      "esto es en el createproduct actions"
    );

    axios
      .post("/products", {
        name,
        description,
        price,
        category,
        platform,
        pictures,
        stock,
      })
      .then((response) => {
        const product = response.data;
        dispatch({ type: CREATE_PRODUCT, payload: product });
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

export const verifyNotReview = (payload) => {
  return {
    type: GET_NOT_REVIEW,
    payload,
  };
};

export const openEditReview = (payload) => {
  return {
    type: OPEN_EDIT,
    payload,
  };
};

export const editReviewAction = ({
  rating,
  description,
  id_cliente,
  date,
  id_product,
}) => {
  return async function (dispatch) {
    try {
      const json = await axios.put(`/products/${id_product}`, {
        edit: {
          id_cliente,
          comment: description,
          rating,
          date,
        },
      });
      return dispatch({
        type: EDIT_REVIEW,
      });
    } catch (error) {
      window.alert(error.response.data.Error);
    }
  };
};
