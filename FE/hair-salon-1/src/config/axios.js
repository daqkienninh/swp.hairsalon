import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  console.log(token);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const handleError = async (error) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      console.log("Removing token from local storage"); // Check if the token is being removed
      localStorage.removeItem("token");
      window.location.href = `/login?redirect=${window.location.pathname}`;
      return Promise.reject(error);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  // Các lỗi khác
  return Promise.reject(error);
};

api.interceptors.request.use(handleBefore);
api.interceptors.response.use(response => response, handleError);

export default api;