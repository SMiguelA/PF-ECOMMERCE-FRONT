import axios from "../../../axios";

import { GET_ORDERS } from "../../actionsTypes.js";

export const getOrders = (token, userAdmin) => {
  return function (dispatch) {
    if (userAdmin) {
      axios
        .get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const orders = response.data;
          dispatch({ type: GET_ORDERS, payload: orders });
          return orders;
        })
        .catch((error) => {
          console.log(`Error obteniendo products: ${error}`);
        });
    } else {
      console.log("no es admin");
    }
  };
};
