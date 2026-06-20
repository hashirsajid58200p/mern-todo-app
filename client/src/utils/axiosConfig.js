import axios from "axios";

axios.defaults.baseURL = "/api/v1";

axios.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

export default axios;
