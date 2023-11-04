import { tokenServices } from "./token.service";
import axios from "axios";

const accessToken = tokenServices.getAccessToken();
const BASE_URL = process.env.API_BASE_URL;

const getSummary = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/summary`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.response?.data || new Error(error));
      });
  });
};

const getTrackerHistory = async (options) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/tracker`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: options,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.response?.data || new Error(error));
      });
  });
};

export const summaryServices = { getSummary, getTrackerHistory };
