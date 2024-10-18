import React from "react";
import AuthenTemplate from "../../components/authen-template";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";

function RegisterPage() {
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      const response = await api.post("/api/register", values);
      toast.success("Success register new account");
      navigate("/login");
    } catch (err) {
      toast.error(""); // trả về lỗi từ back end
    }
  };
  return (
    <AuthenTemplate>
      <div style={{ height: "100%" }}>
        <h2 className="title">Register</h2>
        <h4 className="message">
          Please sign up your information to booking hair salon service.
        </h4>
        <Form labelCol={{ span: 24 }} onFinish={handleRegister}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: "^[0-9]{10}$",
                message: "Phone number must have 9 digits!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                max: 16,
                message: "Password must be at least 8 characters long!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
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
            <Input.Password />
          </Form.Item>
          <Form.Item label="Full Name" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <button type="primary" htmlType="submit" className="button">
            Register
          </button>
          <div>
            <Link to="/login">Already have account? Go to login page.</Link>
          </div>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default RegisterPage;
