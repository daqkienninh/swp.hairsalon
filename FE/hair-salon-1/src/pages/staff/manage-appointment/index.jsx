import { Table, Select, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../config/axios';

const { Option } = Select;

function ManageAppointment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await api.get("/api/appointment");
      setData(response.data);
      setFilteredData(response.data); // Initialize filteredData with all data
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  // Update status
  const updateStatus = async (appointmentId, action) => {
    try {
      await api.put(`/api/appointment/${appointmentId}/status?action=${action}`);
      toast.success("Status updated successfully");
      fetchData(); // Refresh data to show the updated status
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  // Filter appointments by status
  const filterByStatus = (status) => {
    setStatusFilter(status);
    if (status === "") {
      setFilteredData(data); // Show all if no filter selected
    } else {
      setFilteredData(data.filter((appointment) => appointment.status === status));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tổng giá tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (status, record) => (
        <Select
          onChange={(value) => updateStatus(record.id, value)}
          style={{ width: 120 }}
          defaultValue="Select"
        >
          <Option value="APPROVE">Chấp nhận</Option>
          <Option value="REJECT">Từ chối</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#163020] mb-6">Quản lý Cuộc hẹn</h1>

      {/* Status Filter */}
      <Radio.Group
        onChange={(e) => filterByStatus(e.target.value)}
        value={statusFilter}
        className="mb-4"
      >
        <Radio.Button value="">Tất cả</Radio.Button>
        <Radio.Button value="APPROVED">Chấp nhận</Radio.Button>\
        <Radio.Button value="DONE">Hoàn thành</Radio.Button>
        <Radio.Button value="CANCELLED">Huỷ bỏ</Radio.Button>
      </Radio.Group>

      <Table
        columns={tableColumns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="shadow-lg border border-gray-200 rounded-lg"
      />
    </div>
  );
}

export default ManageAppointment;
