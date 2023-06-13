import {
  ADD_TO_CART,
  CREATE_ORDER,
  DELETE_PRODUCT_BY_ID,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_GENDER,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_PRODUCT_BY_PRICE,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  GET_USERS,
  LOGIN,
  LOGOUT,
  SIGNUP,
} from "./actionsTypes";

const initialState = {
  products: [],
  allProducts: [],
  users: [],
  user: null,
  productId: [],
  cart: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };

    case GET_PRODUCTS:
      localStorage.setItem("allProducts", JSON.stringify(payload));
      localStorage.setItem("products", JSON.stringify(payload));
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
      const selectedCategories = payload;

      const productFilter = allProducts.filter((product) => {
        for (const category in selectedCategories) {
          if (selectedCategories[category] && product.category === category) {
            return true;
          }
        }
        return false;
      });
      return {
        ...state,
        products: productFilter.length > 0 ? productFilter : allProducts,
      };

    case FILTER_PRODUCTS_BY_GENDER:
      const allProducts2 = state.allProducts;
      const selectedGender = payload;

      const productFilter2 = allProducts2.filter((product) => {
        for (const category in selectedGender) {
          if (selectedGender[category] && product.gender === category) {
            return true;
          }
        }
        return false;
      });
      return {
        ...state,
        products: productFilter2.length > 0 ? productFilter2 : allProducts2,
      };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        products: payload,
      };
    case FILTER_PRODUCT_BY_PRICE:
      const { minPrice, maxPrice } = payload;

      const filteredProducts = state.products.filter((product) => {
        const productPrice = product.price;
        return productPrice >= minPrice && productPrice <= maxPrice;
      });
      return {
        ...state,
        products: filteredProducts,
      };

    case SIGNUP:
      return {
        ...state,
        user: payload,
      };

    case LOGOUT:
      console.log("entro al reducer logout");
      return {
        ...state,
        user: null,
      };

    case LOGIN:
      return {
        ...state,
        user: payload,
      };

    case ADD_TO_CART:
      console.log("add to cart este payload:");
      console.log(payload);
      return {
        ...state,
        cart: payload,
      };

    case CREATE_ORDER:
      console.log("reducer create order");
      return {
        ...state,
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
