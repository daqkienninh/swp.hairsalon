import { Radio, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import moment from 'moment/moment';

function StylistPage() {

  const user = useSelector((store) => store.user);
  const [stylistID, setStylistID] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchStylist = async () => {
    try {
      const response = await api.get("/api/stylist");
      console.log("Account", response.account)

      // Filter response data to only include stylists where user.id matches account.id
      const matchingStylists = response.data.filter(item => item.account.id === user.id);

      // Extract stylist IDs from matching stylists
      const ids = matchingStylists.map(item => item.id);
      if (ids.length > 0) {
        setStylistID(ids[0]); // Set stylistID if there are matching stylists
      }

      console.log("Matching Stylist IDs: ", ids);
      console.log("User ID: ", user.id);
    } catch (error) {
      toast.error(error.response?.data || "Error fetching stylists");
    }
  };

  console.log("StylistID: ", stylistID)

  // Effect to fetch appointments when stylistID changes
  useEffect(() => {
    const fetchAppointments = async () => {
      if (stylistID) { // Only fetch if stylistID is not null
        try {
          const response = await api.get(`/api/appointment/stylist/${stylistID}`);
          console.log("Appointment: ", response.data);
          setData(response.data);
          setFilteredData(response.data);
        } catch (error) {
          toast.error(error.response?.data || "Error fetching appointments");
        }
      }
    };

    fetchAppointments();
  }, [stylistID]); // Dependency array with stylistID

  useEffect(() => {
    fetchStylist();
  }, []);

  const filterByStatus = (status) => {
    setStatusFilter(status);
    if (status === "") {
      setFilteredData(data); // Show all if no filter selected
    } else {
      setFilteredData(data.filter((appointment) => appointment.status === status));
    }
  };

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
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: "Giờ",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format('HH:mm'),
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
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#163020] mb-6">Xem đặt hẹn</h1>

      {/* Status Filter */}
      <Radio.Group
        onChange={(e) => filterByStatus(e.target.value)}
        value={statusFilter}
        className="mb-4"
      >
        <Radio.Button value="">All</Radio.Button>
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

export default StylistPage;
