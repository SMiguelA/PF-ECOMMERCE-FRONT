import {
  DELETE_PRODUCT_BY_ID,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_PRODUCT_BY_PRICE,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  GET_USERS,
} from "./actionsTypes";

const initialState = {
  products: [],
  allProducts: [],
  users: [],
  productId: [],
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
        productId: payload,
      };
    case DELETE_PRODUCT_BY_ID:
      return {
        ...state,
        productId: [],
      };
    case FILTER_PRODUCTS_BY_CATEGORY:
      const allProducts = state.allProducts;
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
    case FILTER_PRODUCT_BY_PRICE:
      const { minPrice, maxPrice } = payload;
      const filteredProducts = state.products.filter((product) => {
        const productPrice = product.price; // Asumiendo que el precio de cada producto se encuentra en la propiedad 'price'
        return productPrice >= minPrice && productPrice <= maxPrice;
      });
      return {
        ...state,
        products: filteredProducts,
      };

    case FILTER_PRODUCTS_BY_TYPE:
      const { type, checked } = payload;

      const products = state.allProducts;
      let filteredProductsByType = null;

      if (type === "videoGames" && checked) {
        // Aplicar filtro para videoGames
        filteredProductsByType = products.filter(
          (product) => product.type === "videoGames"
        );
      } else if (type === "componentsPC" && checked) {
        // Aplicar filtro para componentsPC
        filteredProductsByType = products.filter(
          (product) => product.type === "componentsPC"
        );
      } else if (type === "videoGames" && !checked) {
        // Quitar filtro para videoGames
        filteredProductsByType = products;
      } else if (type === "componentsPC" && !checked) {
        // Quitar filtro para videoGames
        filteredProductsByType = products;
      }

      //codigoaca
      return {
        ...state,
        products: filteredProductsByType,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
