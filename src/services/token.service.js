import Cookie from "js-cookie";

const setAccessToken = (token) => {
  Cookie.set("accessToken", token);
};

const getAccessToken = () => {
  return Cookie.get("accessToken");
};

const getUserLoginStatus = () => {
  return getAccessToken() ? true : false;
};

const removeAccessToken = () => {
  Cookie.remove("accessToken");
};

export const tokenServices = {
  setAccessToken,
  getAccessToken,
  getUserLoginStatus,
  removeAccessToken,
};
