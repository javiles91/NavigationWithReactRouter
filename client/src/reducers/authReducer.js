import { SIGN_OUT, SIGN_IN } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: JSON.parse(localStorage.getItem("signedIn")),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
