import { combineReducers } from "redux";
import loaderReducer from "./loader.reducer";
import popupReducer from "./popup.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  userReducer,
  loaderReducer,
  popupReducer,
});

export default rootReducer;
