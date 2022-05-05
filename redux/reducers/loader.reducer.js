import * as actionTypes from "../action-types/loader.types";

const initialState = {
  type: actionTypes.LOADER_INIT,
};

const loaderReducer = (state, action) => {
  if (!state || typeof action.type === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case actionTypes.LOADER_SHOW:
    case actionTypes.LOADER_HIDE:
      return {
        type: action.type,
      };
    default:
      return {
        type: state.type,
      };
  }
};

export default loaderReducer;
