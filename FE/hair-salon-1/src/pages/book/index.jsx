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
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [isVNPayAllowed, setIsVNPayAllowed] = useState(false);

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

   const fetchAvailableTime = async (stylistId, date) => {
    if (!stylistId || !date) return;
    try {
      const response = await api.get(`/api/appointment/available-times?stylistId=${stylistId}&date=${date.format("YYYY-MM-DD")}`);
      setAvailableTimes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  const handleStylistChange = (value) => {
    setSelectedStylist(value);
    fetchAvailableTime(value, selectedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableTime(selectedStylist, date);
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
    if (selectedPaymentMethod === "vnpay" && !isVNPayAllowed) {
      toast.error("Please allow booking with VNPay by ticking the checkbox");
      return;
    }

    const formattedTime = values.time; // assuming values.time is already in HH:mm format

    const appointmentData = {
      details: values.services.map((serviceId) => ({
        serviceId: serviceId, // Assuming each selected service should be listed separately
        stylistId: values.stylist,
        startTime: `${formattedTime}`,
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
    } else if (selectedPaymentMethod === "card") {
      try {
        const response = await api.post("/api/appointment", appointmentData);
        console.log(response.data)
        const appointmentId = response.data.id; // Assuming the response includes the appointment ID
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
    <div className="booking-container">
      <div className="max-w-3xl mx-auto">
        <Card
          title={<h1 className="text-2xl font-bold text-center text-green-800">Đặt lịch hẹn tại đây</h1>}
          className="booking-card shadow-lg"
        >
          <Form
            form={form}
            name="booking"
            onFinish={handleConfirmation}
            layout="vertical"
            requiredMark={false}
            className="space-y-6"
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
                onChange={handleStylistChange}
              >
                {stylists.map((stylist) => (
                  <Option key={stylist.id} value={stylist.id}>
                    {stylist.fullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Date Selection */}
            <Form.Item
              name="date"
              label="Ngày"
              rules={[{ required: true, message: "Chọn ngày" }]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current < moment().startOf("day") || current > moment().add(4, "days").endOf("day")
                }
                placeholder="Chọn ngày"
                format="DD/MM/YYYY"
                onChange={handleDateChange}
              />
            </Form.Item>

            {/* Time Selection */}
            <Form.Item
              name="time"
              label="Thời gian"
              rules={[{ required: true, message: "Please select a time range" }]}
            >
              <Radio.Group className="flex flex-wrap gap-2">
                {availableTimes.map((time) => (
                  <Radio.Button
                    key={time}
                    value={time}
                    className="flex-grow basis-1/4 text-center"
                  >
                    {moment(time).format("HH:mm")} {/* Display in HH:mm format */}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea rows={4} placeholder="Ghi chú cho cửa hàng" />
            </Form.Item>

            <Form.Item
              label="Thanh toán"
              rules={[
                { required: true, message: "Please select a payment method" },
              ]}
            >
              <Select
                placeholder="Select a payment method"
                suffixIcon={<UserOutlined />}
                onChange={handlePaymentMethodChange}
              >
                <Option value="vnpay">VNPay</Option>
                <Option value="card">Thanh toán trục tiếp</Option>
              </Select>
            </Form.Item>
            {selectedPaymentMethod === "vnpay" && (
              <Form.Item>
                <Checkbox
                  checked={isVNPayAllowed}
                  onChange={(e) => setIsVNPayAllowed(e.target.checked)}
                >
                  I allow booking with VNPay
                </Checkbox>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="booking-submit-btn w-full py-3 text-lg font-semibold"
              >
                Đặt lịch hẹn
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Booking;
