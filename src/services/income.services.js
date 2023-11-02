import axios from "axios";
import { headers } from "../../next.config";
import { tokenServices } from "./token.service";
const BASE_URL = process.env.API_BASE_URL;

const getIncomeData = async () => {
  let token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/income`, {
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

const createIncomeData = async (body) => {
  let token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/income`, body, {
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

export const incomeServices = { getIncomeData, createIncomeData };
