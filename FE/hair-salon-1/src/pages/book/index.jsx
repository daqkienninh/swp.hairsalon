import React, { useEffect, useState } from "react";
import {
  Card,
  DatePicker,
  Form,
  Select,
  Button,
  Input,
  TimePicker,
  Radio,
} from "antd";
import {
  ScissorOutlined,
  UserOutlined,
  CalendarOutlined,
  CloseOutlined,
  CreditCardOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "./../../config/axios";
import "./index.css";
import moment from "moment";
import { toast } from "react-toastify";
const { Option } = Select;

function Booking() {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
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
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  // Restrict date selection to only the next three days
  const disabledDate = (current) => {
    return (
      current < moment().startOf("day") ||
      current > moment().add(4, "days").endOf("day")
    );
  };

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
  };

  const handleConfirmation = async (values) => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const appointmentData = {
      details: values.services.map((serviceId) => ({
        serviceId: serviceId, // Assuming each selected service should be listed separately
        stylistId: values.stylist,
        startTime: values.date.format("YYYY-MM-DD") + "T" + values.time + ":00",
        note: values.note,
      })),
    };

    if (selectedPaymentMethod === "vnpay") {
      try {
        const response = await api.post(
          "/api/appointment/payment",
          appointmentData
        );
        window.open(response.data);
        navigate("/");
      } catch (error) {
        console.error(
          "Error initiating VNPay payment:",
          error.response?.data || error.message
        );
        toast.error(error.response?.data);
      }
    } else if (selectedPaymentMethod === "cash") {
      try {
        const response = await api.post("/api/appointment", appointmentData);
        const appointmentId = response.data.appointmentId; // Assuming the response includes the appointment ID
        navigate(`/confirm-booking/${appointmentId}`);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        toast.error(error.response?.data);
      }
    }
  };
  useEffect(() => {
    fetchServices();
    fetchStylists();
  }, []);
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
          onFinish={handleConfirmation}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="services"
            label="Dịch vụ"
            rules={[{ required: true, message: "Chọn 1 hoặc nhiều dịch vụ" }]}
          >
            <Select
              placeholder="Bạn có thể chọn một hay nhiều dịch vụ."
              suffixIcon={<ScissorOutlined />}
              mode="multiple"
              tagRender={(props) => {
                const { value, onClose } = props;
                const service = services.find((s) => s.id === value);
                return (
                  <div className="custom-tag">
                    {service?.name}
                    <CloseOutlined
                      className="custom-tag-close"
                      onClick={onClose}
                    />
                  </div>
                );
              }}
            >
              {services.map((service) => (
                <Option key={service.id} value={service.id}>
                  <div className="flex justify-between w-full">
                    {service.name}
                    <span className="text-gray-500 text-sm ml-10 font-semibold">
                      {service.price.toLocaleString()}đ
                    </span>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="stylist"
            label="Stylist"
            rules={[{ required: true, message: "Chọn stylist" }]}
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
            name="date"
            label="Ngày"
            rules={[{ required: true, message: "Chọn ngày" }]}
          >
            <DatePicker
              disabledDate={disabledDate}
              placeholder="Chọn ngày"
              format="DD-MM-YYYY"
            />
          </Form.Item>
          <Form.Item
            name="time"
            label="Available Time"
            rules={[{ required: true, message: "Please select a time range" }]}
          >
            <Radio.Group>
              {Array(12)
                .fill(null)
                .map((_, index) => {
                  const startTime = moment()
                    .startOf("day")
                    .add(8 + index, "hours");

                  return (
                    <Radio.Button
                      key={startTime.format("HH:mm")}
                      value={startTime.format("HH:mm")}
                    >
                      {startTime.format("HH:mm")}
                    </Radio.Button>
                  );
                })}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={4} placeholder="Ghi chú cho cửa hàng" />
          </Form.Item>

          <Form.Item
            label="Payment"
            rules={[
              { required: true, message: "Please select a payment method" },
            ]}
          >
            <Select
              placeholder="Select a payment method"
              suffixIcon={<UserOutlined />}
              onChange={handlePaymentMethodChange}
            >
              <Option value="vnpay" label={<span><CreditCardOutlined /> VNPay</span>}>
                <span className="flex items-center gap-2">
                  <CreditCardOutlined /> VNPay
                </span>
              </Option>
              <Option value="cash" label={<span><DollarOutlined /> Card Payment</span>}>
                <span className="flex items-center gap-2">
                  <DollarOutlined /> Card Payment
                </span>
              </Option>
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
}

export default Booking;
