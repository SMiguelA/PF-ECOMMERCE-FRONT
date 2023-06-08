import { GET_PRODUCTS } from "./actions";

const initialState = {
  products: [],
  user: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };

    default:
      return { ...state, detail: action.payload };
  }
};

export default rootReducer;
