export const signIn = () => {
  return {
    type: "SIGN_IN",
  };
};

export const signOut = () => {
  return {
    type: "SING_OUT",
  };
};

export const updateEmail = (email) => {
  return {
    type: "EMAIL_UPDATE",
    payload: email,
  };
};
