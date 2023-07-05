import {
  ACTIVE_PRODUCTS_CATEGORY,
  ACTIVE_PRODUCTS_NAME,
  ACTIVE_PRODUCTS_PLATFORM,
  ACTIVE_PRODUCTS_PRICE,
  ADD_FAVORITE,
  ADD_TO_CART,
  CLEAR_ERRORS,
  CREATE_ORDER,
  CREATE_PRODUCT,
  CREATE_REVIEW,
  DECREASE_CART,
  DELETE_PRODUCT_BY_ID,
  EDIT_REVIEW,
  ERROR_LOGIN,
  ERROR_REGISTER,
  FILTER_PRODUCTS,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_GENDER,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_PRODUCT_BY_PRICE,
  GET_NOT_REVIEW,
  GET_ORDERS,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  GET_USERS,
  GET_USER_PRODUCTS,
  INCREASE_CART,
  LOADINGFORM,
  LOGIN,
  LOGIN_GOOGLE,
  LOGOUT,
  OPEN_EDIT,
  REMOVE_FAVORITE,
  REMOVE_FROM_CART,
  SIGNUP,
  UPDATE_USER,
} from "./actionsTypes";

const initialState = {
  myFavorites: [],
  products: [],
  filters: {
    name: "",
    price: "",
    category: [],
    platform: [],
  },
  allProducts: [],
  users: [],
  user: null,
  productId: [],
  cart: [],
  loadingLoagin_Register: false,
  orders: [],
  errorsBack: {
    errorLogin: [],
    errorRegister: [],
  },
  dataDashAdmin: [],
  notReview: true,
  openEdit: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case CREATE_REVIEW:
      return {
        ...state,
      };
    case GET_USER_PRODUCTS:
      return {
        ...state,
        dataDashAdmin: payload,
      };
    case LOGIN_GOOGLE:
      return {
        ...state,
        user: payload,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        errorsBack: {
          ...state.errorsBack,
          errorLogin: [],
        },
      };
    }
    case ERROR_REGISTER:
      return {
        ...state,
        errorsBack: {
          ...state.errorsBack,
          errorRegister: payload,
        },
      };
    case ERROR_LOGIN:
      return {
        ...state,
        errorsBack: {
          ...state.errorsBack,
          errorLogin: payload,
        },
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        products: payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };
    case LOADINGFORM:
      return {
        ...state,
        loadingLoagin_Register: payload,
      };
    case ACTIVE_PRODUCTS_NAME:
      return {
        ...state,
        filters: {
          ...state.filters,
          name: payload,
        },
      };
    case ACTIVE_PRODUCTS_CATEGORY:
      const dataFilter = payload.split("-");
      return {
        ...state,
        filters: {
          ...state.filters,
          category: dataFilter,
        },
      };

    case ACTIVE_PRODUCTS_PLATFORM:
      const dataFilterCategory = payload.split("-");
      return {
        ...state,
        filters: {
          ...state.filters,
          platform: dataFilterCategory,
        },
      };

    case ACTIVE_PRODUCTS_PRICE:
      if (payload.endsWith("99999")) payload = payload.replace("-99999", "");
      return {
        ...state,
        filters: {
          ...state.filters,
          price: payload,
        },
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
        myFavorites: [],
      };

    case LOGIN:
      console.log(payload);
      return {
        ...state,
        user: payload,
        myFavorites: payload.myFavorites,
      };

    case ADD_TO_CART:
      console.log("add to cart este payload:");
      console.log(payload);
      return {
        ...state,
        user: {
          ...state.user,
          cart: payload,
        },
      };
    case GET_NOT_REVIEW:
      return {
        ...state,
        notReview: payload,
      };
    case OPEN_EDIT:
      return {
        ...state,
        openEdit: payload,
      };

    // case RESTART_CART:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       cart: {
    //         total: 0,
    //         count: 0,
    //       },
    //     },
    //   };
    case CREATE_ORDER:
      return {
        ...state,
        user: payload,
      };

    case DECREASE_CART:
      return {
        ...state,
        user: payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        user: payload,
      };

    case INCREASE_CART:
      return {
        ...state,
        user: payload,
      };

    case CREATE_ORDER:
      console.log("reducer create order");
      return {
        ...state,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
      };

    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case EDIT_REVIEW:
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

    case ADD_FAVORITE:
      return {
        ...state,
        myFavorites: [...state.myFavorites, payload],
        user: {
          ...state.user,
          myFavorites: [...state.myFavorites, payload],
        },
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        myFavorites: state.myFavorites.filter(
          (product) => product._id !== payload
        ),
        user: {
          ...state.user,
          myFavorites: state.myFavorites.filter(
            (product) => product._id !== payload
          ),
        },
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
