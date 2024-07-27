import axios from "axios";
import { ClearLocalStore, GetJwtToken } from "./auth";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${GetJwtToken()}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      ClearLocalStore();
      window.alert("You are not authenticated. Please sign in.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export async function post(route, data = {}) {
  const response = await instance.post(route, data);
  return response;
}

export async function get(route, params = {}) {
  const response = await instance.get(route, { params });
  return response;
}
