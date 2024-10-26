import React, { useState, useEffect } from "react";
import { Form, Button, Select, DatePicker, Card, Input, message } from "antd";
import {
  ScissorOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../../config/axios";
import { toast } from "react-toastify";

const { Option } = Select;

const Booking = () => {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch services and stylists from your API
    fetchServices();
    fetchStylists();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/api/service");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchStylists = async () => {
    try {
      const response = await api.get("/api/stylist");
      setStylists(response.data);
    } catch (error) {
      console.error("Error fetching stylists:", error);
    }
  };


  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
  };
  
  const handlePaymentConfirmation = async (values) => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    console.log(selectedPaymentMethod)
    console.log(values)
    const appointmentData = {
      details: [
        {
          serviceId: values.service,
          stylistId: values.stylist,
          startTime: values.dateTime.format("YYYY-MM-DDTHH:mm:ss"
          ),
          note: values.note,
        },
      ],
    };
    console.log(appointmentData)

    if (selectedPaymentMethod === 'vnpay') {
      try {

        const response = await api.post("/api/appointment/payment", appointmentData);
        console.log(response);
        window.open(response.data)
        navigate("/")
      } catch (error) {
        console.error("Error initiating VNPay payment:", error.response?.data || error.message);

        toast.error(error.response?.data);
      }
    } else if (selectedPaymentMethod === 'card') {
      const response = await api.post("/api/appointment", appointmentData);
      console.log(response);
      navigate("/confirm-booking")
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "20px",
        color: "#1A4D2E",
      }}
    >
      <Card title="Đặt lịch hẹn tại đây" bordered={false}>
        <Form
          form={form}
          name="booking"
          onFinish={handlePaymentConfirmation}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="services" // Updated to 'services' to match your array
            label="Dịch vụ"
            rules={[
              {
                required: true,
                message: "Chọn 1 hoặc nhiều dịch vụ",
              },
            ]}
          >
            <Select
              placeholder="Bạn có thể chọn một hay nhiều dịch vụ."
              suffixIcon={<ScissorOutlined />}
              mode="multiple" // Allows multiple selections
            >
              {services.map((service) => (
                <Option key={service.id} value={service.id}>
                  {service.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="stylist"
            label="Stylist"
            rules={[
              {
                required: true,
                message: "Chọn stylist",
              },
            ]}
          >
            <Select
              placeholder="Nếu bạn không biết nên chọn ai, bạn có thể chọn ngẫu nhiên."
              suffixIcon={<UserOutlined />}
            >
              {stylists.map((stylist) => (
                <Option key={stylist.id} value={stylist.id}>
                  {stylist.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="dateTime"
            label="Thời gian"
            rules={[
              {
                required: true,
                message: "Chọn thời gian",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              style={{ width: "100%" }}
              suffixIcon={<CalendarOutlined />}
              placeholder="Bạn có thể chọn bất kỳ thời gian nào trong khung giờ 8AM-20PM."
            />
          </Form.Item>

          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={4} placeholder="Ghi chú cho cửa hàng" />
          </Form.Item>

          <Form.Item
            label="Payment"
            rules={[{ required: true, message: "Please select a payment method" }]}
          >
            <Select
              placeholder="Select a payment method"
              suffixIcon={<UserOutlined />}
              onChange={handlePaymentMethodChange}
            >
              <Option value="vnpay">VNPay</Option>
              <Option value="card">Card Payment</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "40%",
                  height: "50%",
                  backgroundColor: "#94B49F",
                  borderColor: "#94B49F",
                  color: "#163020",
                  borderRadius: "5px",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Đặt lịch hẹn
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Booking;
