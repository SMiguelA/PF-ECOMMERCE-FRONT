import axios from "../../../axios";
import {
  GET_USERS
} from "../../actionsTypes";

export const getUsers = () => {
  return function (dispatch) {
    axios
      .get("/users")
      .then((response) => {
        const users = response.data;
        dispatch({ type: GET_USERS, payload: users });
      })
      .catch((error) => {
        console.log(`Error obteniendo users: ${error}`);
      });
  };
};
