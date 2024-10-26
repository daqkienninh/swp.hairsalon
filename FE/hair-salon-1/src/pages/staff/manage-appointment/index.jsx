import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function ManageAppointment() {
  const [data, setData] = useState();
  // Get data
  const fetchData = async () => {
    try {
      const response = await api.get("/api/appointment");
      setData(response.data)
    } catch (error) {
      toast.error(error.response);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const tableColumns = [
    {
      title: "Service ID",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: "Stylist ID",
      dataIndex: "stylistId",
      key: "stylistId",
    },
  ]
  return (
    <div>
      <h1>Appointment</h1>
      <Table columns={tableColumns} dataSource={data}/>
    </div>
  )
}

export default ManageAppointment