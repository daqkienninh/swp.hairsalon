import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Card,
  Input,
  message,
} from "antd";
import {
  ScissorOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../../config/axios";

const { Option } = Select;

const Booking = () => {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
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

  const onFinish = async (values) => {
    try {
      const appointmentData = {
        details: [
          {
            serviceId: values.service,
            stylistId: values.stylist,
            startTime: values.dateTime.format(),
            note: values.note,
          },
        ],
      };

      await api.post("/api/appointment", appointmentData);
      message.success("Booking successful!");

      // Find the selected service and stylist names
      const selectedService = services.find(
        (s) => s.id === values.service
      )?.name;
      const selectedStylist = stylists.find(
        (s) => s.id === values.stylist
      )?.name;

      navigate("/", {
        state: {
          bookingDetails: {
            service: selectedService,
            stylist: selectedStylist,
            dateTime: values.dateTime,
            note: values.note,
          },
        },
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      message.error("Booking failed. Please try again.");
    }
  };

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
  };
  
  const handlePaymentConfirmation = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const appointment = appointments.find(app => app.id === selectedAppointmentId);
    if (!appointment) {
      toast.error("Appointment not found");
      return;
    }

    if (selectedPaymentMethod === 'vnpay') {
      try {
        const response = await api.post("/api/payment/create_payment_url", {
          amount: appointment.totalPrice,
          appointmentId: selectedAppointmentId,
        });

        if (response.data && response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          throw new Error("Failed to generate payment URL");
        }
      } catch (error) {
        console.error("Error initiating VNPay payment:", error);
        toast.error(error.message || "Failed to initiate VNPay payment");
      }
    } else if (selectedPaymentMethod === 'card') {
      navigate(`/card-payment/${selectedAppointmentId}`);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "20px" }}>
      <Card title="Book Your Appointment" bordered={false}>
        <Form
          form={form}
          name="booking"
          onFinish={handlePaymentConfirmation}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: "Please select a service" }]}
          >
            <Select
              placeholder="Select a service"
              suffixIcon={<ScissorOutlined />}
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
            rules={[{ required: true, message: "Please select a stylist" }]}
          >
            <Select
              placeholder="Select a stylist"
              suffixIcon={<UserOutlined />}
            >
              {stylists.map((stylist) => (
                <Option key={stylist.id} value={stylist.id}>
                  {stylist.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="dateTime"
            label="Date and Time"
            rules={[{ required: true, message: "Please select date and time" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              style={{ width: "100%" }}
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          <Form.Item name="note" label="Additional Notes">
            <Input.TextArea
              rows={4}
              placeholder="Any special requests or notes?"
            />
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} onClick={onFinish}>
              Book Appointment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Booking;
