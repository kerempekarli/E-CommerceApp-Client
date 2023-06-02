// actions.js dosyası

export const loginAction = (userData) => {
  return {
    type: "LOGIN",
    payload: userData,
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
