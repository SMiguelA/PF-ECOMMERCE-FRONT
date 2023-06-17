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
        localStorage.setItem("user", JSON.stringify(users));
        dispatch({ type: LOGIN, payload: users });
      })
      .catch((error) => {
        console.log(`Error en el login: ${error}`);
      });
  };
};

export const createOrder = (payload) => {
  return function (dispatch) {
    const { userId, cart, country, address } = payload;
    console.log("antes de entrar a post orders");
    axios
      .post("/orders", { userId, cart, country, address })
      .then((response) => {
        const user = response.data;
        dispatch({ type: CREATE_ORDER, payload: user });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
      });
  };
};

// export const restartCart = () => {
//   return async function (dispatch) {
//     try {
//       return dispatch({
//         type: RESTART_CART,
//       });
//     } catch (error) {
//       window.alert(error.response.data.Error);
//     }
//   };
// };
