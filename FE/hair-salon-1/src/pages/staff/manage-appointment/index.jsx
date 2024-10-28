import { Table, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../config/axios';

const { Option } = Select;

function ManageAppointment() {
  const [data, setData] = useState([]);

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await api.get("/api/appointment");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  // Update status
  const updateStatus = async (appointmentId, newStatus) => {
    try {
      await api.put(`/api/appointment/${appointmentId}/status`, { status: newStatus });
      toast.success("Status updated successfully");
      fetchData(); // Refresh data to show the updated status
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableColumns = [
    {
      title: "Appointment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue={status || "Approve"}
          onChange={(value) => updateStatus(record.id, value)}
          style={{ width: 120 }}
        >
          <Option value="APPROVED">Approve</Option>
          <Option value="IN-PROCESS">In Process</Option>
          <Option value="DONE">Done</Option>
        </Select>
      ),
    },
    {
      title: "Loyalty Points Awarded",
      dataIndex: "loyaltyPointsAwarded",
      key: "loyaltyPointsAwarded",
    },
  ];

  return (
    <div>
      <h1>Appointment</h1>
      <Table columns={tableColumns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default ManageAppointment;
