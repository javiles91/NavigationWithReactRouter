import { combineReducers } from "redux";
import authReducer from "./authReducer";

function emailReducer(
  email = JSON.parse(localStorage.getItem("email")),
  action
) {
  if (action.type === "EMAIL_UPDATE") {
    return action.payload;
  }
  return email;
}

export default combineReducers({
  auth: authReducer,
  email: emailReducer,
});
