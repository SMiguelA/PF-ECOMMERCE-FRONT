import axios from "../../../axios";
import { CREATE_ORDER, GET_USERS, LOGIN, LOGOUT } from "../../actionsTypes";

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

export const logoutUser = () => {
  console.log("entro al actions de user logout");
  return {
    type: LOGOUT,
  };
};

export const login = (payload) => {
  return function (dispatch) {
    const { email, password } = payload;
    axios
      .post("/users/login", { email, password })
      .then((response) => {
        const users = response.data;
        console.log("user en el user actions");
        console.log(users);
        localStorage.setItem("user", JSON.stringify(users));
        dispatch({ type: LOGIN, payload: users });
      })
      .catch((error) => {
        console.log(error);
        console.log(`Error en el login: ${error}`);
      });
  };
};

export const createOrder = (payload) => {
  console.log("createorder ACtions");
  return {
    type: CREATE_ORDER,
  };
};
