import React, { useState } from "react";
import AuthenTemplate from "../../components/authen-template";
import { Button, Form, Input, Modal } from "antd";
import { googleProvider } from "../../config/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false); // Function link to another location
  const [sendEmail, setSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginGoolge = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  /*End Handle LoginGoogle ------------------------------------------------------------------ */

  const dispatch = useDispatch(); // Store data to redux
  const handleLogin = async (values) => {
    try {
      const response = await api.post("/api/login", values);
      console.log(response);
      const { role, token, tokenExpiration } = response.data;
      console.log(role);
      dispatch(login(response.data));
      localStorage.setItem("token", token); 
      localStorage.setItem("tokenExpiration", tokenExpiration);
      // Lấy đường dẫn redirect từ localStorage
      const redirectPath = sessionStorage.getItem("redirectPath") || "/";
      sessionStorage.removeItem("redirectPath"); // Xóa sau khi đã sử dụng
      if (role === "CUSTOMER") {
        navigate(redirectPath);
      } else if (role === "STAFF") {
        navigate("/staff");
        toast.success("Đăng nhập thành công!");
      } else if (role === "STYLIST") {
        navigate("/stylist");
        toast.success("Đăng nhập thành công!");
      } else if (role === "ADMINISTRATOR") {
        navigate("/admin");
        toast.success("Đăng nhập thành công!");
      } else if (role === "MANAGER") {
        navigate("/manager");
        toast.success("Đăng nhập thành công!");
      }
    } catch (err) {
      toast.error(err.response.data || "Lỗi đăng nhập, xin hãy thử lại!");
    }
  };

  /*End handle Login--------------------------------------------------------------------------- */
  const handleForgotPassword = async (email) => {
    try {
      setSendEmail(false);
      setLoading(true);
      const response = await api.post("/api/forgot-password", email);
      console.log(response.data);
      setSendEmail(true);
      toast.success("Hãy check email để lấy mật khẩu mới.");
    } catch (err) {
      const errorMessage =
        err.response?.data || "Có lỗi xảy ra. Hãy thực hiện lại.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthenTemplate>
      <div style={{ height: "100vh" }}>
        <h2 className="title">Đăng nhập</h2>
        <h4 className="message">
          Đăng nhập để sử dụng dịch vụ đặt lịch làm tóc.
        </h4>
        <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            className="form-item"
            rule={[
              {
                required: true,
                message: "Hãy nhập SĐT của bạn!",
              },
              {
                pattern: "^[0-9]{10}$",
                message: "SĐT phải có đủ 9 số!",
              },
            ]}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rule={[
              {
                required: true,
                message: "Hãy nhập mật khẩu của bạn!",
              },
            ]}
          >
            <Input.Password className="input" />
          </Form.Item>
          <div>
            <Link to="#" onClick={() => setIsModalVisible(true)}>
              Quên mật khẩu?
            </Link>
          </div>
          <Modal
            title="Quên mật khẩu"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            className="forgot-password-modal"
          >
            <Form onFinish={handleForgotPassword}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập email của bạn!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Nhận email đổi mật khẩu
              </Button>
            </Form>
          </Modal>
          <button type="submit" className="button">
            Đăng nhập
          </button>
          <p className="message">Đăng nhập với tài khoản Google.</p>
          <button onClick={handleLoginGoolge} className="button-google">
            Tiếp tục với
          </button>
          <div>
            <Link to="/register">Không có tài khoản? Hãy đăng kí tại đây.</Link>
          </div>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default LoginPage;

/**************************************************** */
