import {
  FILTER_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS,
  GET_PRODUCT_BY_NAME,
} from "./Actions/Products/index";
import { GET_USERS } from "./Actions/Users/index";

const initialState = {
  products: [],
  allProducts: [],
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
        allProducts: payload,
      };

    case FILTER_PRODUCTS_BY_CATEGORY:
      const allProducts = state.allProducts;
      console.log(allProducts);
      const productFilter =
        payload === "All"
          ? allProducts
          : allProducts.filter((el) => el.category === payload);
      return {
        ...state,
        products: productFilter,
      };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        products: payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
