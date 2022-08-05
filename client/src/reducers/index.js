import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

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
  form: formReducer,
  streams: streamReducer,
});
