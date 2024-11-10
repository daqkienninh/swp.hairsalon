import React, { useCallback, useEffect, useState } from "react";
import api from "../../../config/axios";
import { Table, Typography, Divider } from "antd";

function ManagerPage() {
  const [balance, setBalance] = useState(null);
  const [totalPrice, setTotalPrice] = useState([]);

  // Fetch balance data
  const fetchBalance = async () => {
    try {
      const response = await api.get("/api/manager/1");
      setBalance(response.data.account.balance);
      console.log("Balance:", response.data.account.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Fetch total price data and filter for approved appointments
  const fetchTotalPrice = async () => {
    try {
      const response = await api.get("/api/appointment");
      const approvedAppointments = response.data.filter(
        (appointment) => appointment.status === "APPROVED"
      );
      setTotalPrice(approvedAppointments);
      console.log("Approved Appointments:", approvedAppointments);
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchTotalPrice();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>Manager Dashboard</Typography.Title>
      <Divider />
      <Table
        columns={columns}
        dataSource={totalPrice}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default ManagerPage;
