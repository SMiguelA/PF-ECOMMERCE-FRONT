import { } from "./actionsTypes";

const initialState = {
  products:[]
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case : 
    //   return {
        
    //   }
    default:
      return { ...state };
  }
};

export default rootReducer;
