import { GET_PRODUCTS } from "./Actions/Products/index";
import { GET_USERS } from "./Actions/Users/index";

const initialState = {
  products: [],
  users: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
