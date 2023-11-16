import axios from "axios";
import { headers } from "../../next.config";
import { tokenServices } from "./token.service";
const BASE_URL = process.env.API_BASE_URL;

const getGoalData = async () => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}/goal`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((err) => {
          reject(err.response?.data);
        });
    });
  };

  const createGoalData  = async (body) => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/goal`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((err) => {
          reject(err.response?.data);
        });
    });
  };

  const editGoalData = async (body, id) => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}/goal/${id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((err) => {
          reject(err.response?.data);
        });
    });
  };

  const deleteGoalData = async (id) => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/goal/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((err) => {
          reject(err.response?.data);
        });
    });
  };

  export const goalServices = { getGoalData, createGoalData, editGoalData, deleteGoalData};