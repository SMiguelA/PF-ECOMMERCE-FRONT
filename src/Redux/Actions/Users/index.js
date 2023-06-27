import axios from "../../../axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER,
  ERROR_LOGIN,
  ERROR_REGISTER,
  GET_USERS,
  LOGIN,
  LOGIN_GOOGLE,
  LOGOUT,
  SIGNUP,
  REMOVE_FAVORITE,
  ADD_FAVORITE,
  UPDATE_USER,
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

export const updateUser = (id, data) => {
  return function (dispatch) {
    axios
      .put(`/users/${id}`, data)
      .then((response) => {
        const user = response.data;
        dispatch({ type: UPDATE_USER, payload: user.userModified });
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

export const signup = (payload) => {
  return function (dispatch) {
    const { name, email, password, picture } = payload;
    axios
      .post("/users/signup", { name, email, password, picture })
      .then((response) => {
        const user = response.data;
        dispatch({ type: SIGNUP, payload: user });
      })
      .catch((error) => {
        console.log(`Error registrando usuario: ${error}`);

        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data;
          console.log(errorMessage);
          if (errorMessage.Error === "Email") {
            console.log("!!!!!!ERROR EMAIL");
            dispatch({
              type: ERROR_REGISTER,
              payload: { message: errorMessage.Error, status: 400 },
            });
          } else if (errorMessage.Error === "Name") {
            dispatch({
              type: ERROR_REGISTER,
              payload: { message: errorMessage.Error, status: 400 },
            });
          } else if (errorMessage.Error === "Picture") {
            dispatch({
              type: ERROR_REGISTER,
              payload: { message: errorMessage.Error, status: 400 },
            });
          }
        }
      });
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
        if (error.response && error.response.status === 404) {
          const errorMessage = error.response.data;
          dispatch({
            type: ERROR_LOGIN,
            payload: { message: errorMessage, status: 404 },
          });
        } else if (error.response && error.response.status === 403) {
          const errorMessage = error.response.data;
          dispatch({
            type: ERROR_LOGIN,
            payload: { message: errorMessage, status: 403 },
          });
        } else {
          const errorMessage = error.response.data;
          dispatch({
            type: ERROR_LOGIN,
            payload: { message: errorMessage, status: error.response.status },
          });
        }
      });
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const googleLogin = (token) => {
  return function (dispatch) {
    axios
      .post("users/check-google-email", null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const user = response.data;
        dispatch({
          type: LOGIN_GOOGLE,
          payload: user,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const createOrder = (payload) => {
  return function (dispatch) {
    const { userId, cart, country, address, paymentStatus } = payload;
    console.log("paymentStatus:", paymentStatus);
    axios
      .post("/orders", { userId, cart, country, address, paymentStatus })
      .then((response) => {
        const user = response.data;
        dispatch({ type: CREATE_ORDER, payload: user });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
      });
  };
};

export const addFavorite = (user, product) => {
  return function (dispatch) {
    axios
      .post(`/users/update-favorites`, { userId: user._id, favorites: product, type:"ADD" })
      .then((response) => {
        const user = response.data;
        dispatch({ type: ADD_FAVORITE, payload: product });
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };
};

export const removeFavorite = (user, product) => {
  console.log("Entra a remove")
  // console.log(id)
  return function (dispatch) {
    axios
      .post(`/users/update-favorites`, { userId: user._id, favorites: product, type:"REMOVE" })
      .then((response) => {
        const user = response.data;
        dispatch({ type: REMOVE_FAVORITE, payload: product._id });
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
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
