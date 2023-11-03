import axios from "axios";
import { headers } from "../../next.config";
import { tokenServices } from "./token.service";
const BASE_URL = process.env.API_BASE_URL;

const getExpenseData = async () => {
  let token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/expense`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const createExpenseData = async (body) => {
  let token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/expense`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const editExpenseData = async (body, id) => {
  let token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .patch(`${BASE_URL}/expense/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const deleteExpenseData = async (id) => {
  let token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export const expenseServices = { getExpenseData, createExpenseData, editExpenseData, deleteExpenseData};
