import axios from "axios";
const BASE_URL = process.env.API_BASE_URL;

const handleUserSignup = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/signup`, body)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((err) => {
        reject(err.response?.data || new Error(err));
      });
  });
};

const handleUserLogin = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/login`, body)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((err) => {
        reject(err.response?.data || new Error(err));
      });
  });
};

export const authServices = { handleUserSignup, handleUserLogin };
