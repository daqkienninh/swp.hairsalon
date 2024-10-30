import { toast } from "react-toastify";
import AuthenTemplate from "../../components/authen-template";
import api from "../../config/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";

function ResetPassword() {
  const location = useLocation(); // Get current location object (contains the URL)
  const navigate = useNavigate();
  const handleResetPassword = async (password) => {
    try {
      console.log(location.search);
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      localStorage.setItem("token", token);
      await api.post("/api/reset-password", password);
      toast.success("Thay đổi mật khẩu thành công!");
      navigate("/login");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <AuthenTemplate>
      <div style={{ height: "100vh" }}>
        <h2 className="title">Đặt lại mật khẩu</h2>
        <Form labelCol={{ span: 24 }} onFinish={handleResetPassword}>
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rule={[
              {
                required: true,
                message: "Hãy nhập mật khẩu mới của bạn!",
              },
            ]}
          >
            <Input.Password className="input" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Hãy nhập lại mật khẩu mới." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không hợp lệ!"));
                },
              }),
            ]}
          >
            <Input.Password className="input" />
          </Form.Item>
          <button type="submit" className="button">
            Đặt lại mật khẩu
          </button>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default ResetPassword;
