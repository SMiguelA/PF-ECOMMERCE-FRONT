import axios from "../../../axios";

import { GET_USER_PRODUCTS } from "../../actionsTypes.js";

export const getUserProducts = () => {
  return function (dispatch) {
      axios
        .get(`/admin`)
        .then((response) => {
          const data = response.data;
          dispatch({ type: GET_USER_PRODUCTS, payload: data });
          return data;
        })
        .catch((error) => {
          console.log(`Error obteniendo products/users en Admin: ${error}`);
        });
  };
};
