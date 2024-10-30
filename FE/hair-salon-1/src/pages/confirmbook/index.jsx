import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./../../config/axios";
import {
  Card,
  Spin,
  Typography,
  Descriptions,
  Button,
  Result,
  message,
} from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const ConfirmBooking = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      console.log("Fetching appointment with ID:", appointmentId);

      if (!appointmentId) {
        console.error("AppointmentId is undefined or null");
        setError("Invalid appointment ID: ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/appointment/${appointmentId}`);
        console.log("API Response:", response.data);
        setAppointment(response.data);
      } catch (err) {
        console.error("Error fetching appointment details:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "An error occurred while fetching the appointment";
        setError(`Error: ${errorMessage}`);
        message.error(`Failed to fetch appointment: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle={error}
        extra={[
          <Button type="primary" key="home" onClick={() => navigate("/")}>
            Back to Home
          </Button>,
        ]}
      />
    );
  }

  if (!appointment) {
    return (
      <Result
        status="warning"
        title="No Data"
        subTitle="No appointment data found. Please check the appointment ID and try again."
        extra={[
          <Button type="primary" key="home" onClick={() => navigate("/")}>
            Back to Home
          </Button>,
        ]}
      />
    );
  }

  const { appointmentDetails } = appointment;
  const detail = appointmentDetails[0]; // Assuming there's only one detail per appointment

  return (
    <Card
      title={<Title level={2}>Booking Confirmation</Title>}
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Appointment ID">
          {appointment.id}
        </Descriptions.Item>
        <Descriptions.Item label="Service">
          {detail.serviceEntity.name}
        </Descriptions.Item>
        <Descriptions.Item label="Stylist">
          {detail.stylist.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Start Time">
          {moment(detail.startTime).format("MMMM D, YYYY h:mm A")}
        </Descriptions.Item>
        <Descriptions.Item label="End Time">
          {moment(detail.endTime).format("MMMM D, YYYY h:mm A")}
        </Descriptions.Item>
        <Descriptions.Item label="Total Price">
          {appointment.totalPrice.toLocaleString()} VND
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Text strong>{appointment.status}</Text>
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </Card>
  );
};

export default ConfirmBooking;
