import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate(); // Thêm useNavigate hook
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Lưu current path vào localStorage để sau khi login redirect lại
      localStorage.setItem("redirectPath", window.location.pathname);
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // Nếu không có token, return null để không render gì cả trong quá trình redirect
  if (!token) {
    return null;
  }

  // Nếu có token thì render children
  return children;
};
export default RequireAuth;
