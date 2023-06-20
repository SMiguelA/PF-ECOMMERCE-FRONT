import axios from "../../../axios";

import { GET_ORDERS } from "../../actionsTypes.js";

export const getOrders = () => {
  return function (dispatch) {
    axios
      .get("/orders")
      .then((response) => {
        const orders = response.data;
        dispatch({ type: GET_ORDERS, payload: orders });
        return orders;
      })
      .catch((error) => {
        console.log(`Error obteniendo products: ${error}`);
      });
  };
};
