import axios from "axios";
import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (token && tokenExpiration && new Date(tokenExpiration) < new Date()) {
      // Clear token and redirect to login page after a delay
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      const navigate = useNavigate();
      setTimeout(() => {
        navigate("/login", {
          state: {
            redirect: window.location.pathname,
          },
        });
        message.error("Token đã hết hạn, vui lòng đăng nhập lại.");
        notification.error({
          message: "Đăng nhập hết hạn",
          description: "Vui lòng đăng nhập lại để tiếp tục.",
        });
      }, 1000); // Delay of 1 second
      return Promise.reject("Token expired");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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