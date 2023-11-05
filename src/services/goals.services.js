import axios from "axios";
import { headers } from "../../next.config";
import { tokenServices } from "./token.service";
const BASE_URL = process.env.API_BASE_URL;

const getGoalsData = async () => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}/goals`, {
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

  const createGoalsData  = async (body) => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/goals`, body, {
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

  const editGoalsData = async (body, id) => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}/goals/${id}`, body, {
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

  const deleteGoalsData = async (id) => {
    let token = tokenServices.getAccessToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/goals/${id}`, {
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

  export const goalsServices = { getGoalsData, createGoalsData, editGoalsData, deleteGoalsData};