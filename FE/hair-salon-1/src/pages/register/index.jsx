import AuthenTemplate from "../../components/authen-template";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useState } from "react";

function RegisterPage() {
  const [loading, setLoading] = useState(false); // set loading

  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      // values.role("CUSTOMER");
      setLoading(true); // set loading, khi vừa submit thì form sẽ loading để không thể xảy ra spam
      const response = await api.post("/api/register", values);
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      toast.error("Không thể đăng kí tài khoản! Hãy thử lại."); // trả về lỗi từ back end
    } finally {
      setLoading(false); // sau khi tất cả xong finally thì sẽ dừng loading
    }
  };
  return (
    <AuthenTemplate>
      <div>
        <h2 className="title">Đăng kí</h2>
        <h4 className="message">
          Đăng kí thông tin của bạn để sử dụng dịch vụ đặt lịch hẹn.
        </h4>
        <Form labelCol={{ span: 24 }} onFinish={handleRegister}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Hãy nhập SĐT của bạn!" },
              {
                pattern: "^[0-9]{10}$",
                message: "SĐT phải có 9 số!",
              },
            ]}
          >
            <Input className="input-register" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Hãy nhập mật khẩu!" },
              {
                min: 8,
                max: 16,
                message: "Mật khẩu phải dài từ 8 đến 16 kí tự!",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="input-register" />
          </Form.Item>
          <Form.Item
            label="Xác nhận lại mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Hãy xác nhận lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password className="input-register" />
          </Form.Item>
          <Form.Item label="Họ và Tên" name="fullName">
            <Input className="input-register" />
          </Form.Item>
          <Form.Item
            label="Email của bạn"
            name="email"
            rules={[
              { required: true, message: "Hãy nhập Email của bạn!" },
              {
                type: "email",
                message: "Hãy nhập Email hợp lệ!",
              },
            ]}
          >
            <Input className="input-register" />
          </Form.Item>
          <button
            type="submit"
            className="button"
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Đang đăng kí..." : "Đăng kí"}
          </button>
          <div>
            <Link to="/login">Bạn đã có tài khoản? Đăng nhập tại đây.</Link>
          </div>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default RegisterPage;
