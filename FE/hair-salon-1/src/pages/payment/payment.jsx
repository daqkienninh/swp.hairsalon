import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../config/axios";

function Payment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);
  console.log(user);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/appointment");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlePayment = async (appointmentId) => {
    try {
      const appointment = appointments.find((app) => app.id === appointmentId);
      if (!appointment) {
        throw new Error("Appointment not found");
      }

      const response = await api.post("/api/payment/create_payment_url", {
        amount: appointment.totalPrice,
        appointmentId: appointmentId,
      });

      if (response.data && response.data.paymentUrl) {
        // Redirect the user to the VNPay payment URL
        window.location.href = response.data.paymentUrl;
      } else {
        throw new Error("Failed to generate payment URL");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error(error.message || "Failed to initiate payment");
    }
  };

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Stylist",
      dataIndex: "stylist",
      key: "stylist",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, record) => (
        <Button
          type="primary"
          onClick={() => handlePayment(id)}
          disabled={record.status === "PAID"}
        >
          {record.status === "PAID" ? "Paid" : "Pay"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>My Appointments</h2>
      <Table
        columns={columns}
        dataSource={appointments}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
}

export default Payment;
