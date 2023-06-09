import {
  FILTER_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  GET_USERS,
} from "./actionsTypes";


const initialState = {
  products: [],
  allProducts: [],
  users: [],
  productId:[],
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
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productId:payload
      }
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
