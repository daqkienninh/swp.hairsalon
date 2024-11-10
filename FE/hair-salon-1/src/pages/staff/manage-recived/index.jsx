import React, { useEffect, useState } from 'react';
import api from '../../../config/axios';
import { Table } from 'antd';

function ManageRecived() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page = 1) => {
    try {
      const response = await api.get(`api/reward/rewardClaimed?page=${page - 1}&size=${pagination.pageSize}`);
      const { content, totalElements, pageNumber } = response.data;

      setData(content);
      setPagination({
        ...pagination,
        current: pageNumber + 1,
        total: totalElements,
      });
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchData(pagination.current);
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current);
  };

  const tableColumns = [
    {
      title: "Tên khách hàng",
      dataIndex: ["customer", "fullName"],
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["customer", "account", "phone"],
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: ["customer", "account", "email"],
      key: "email",
    },
    {
      title: "Tên phần quà",
      dataIndex: ["reward", "name"],
      key: "name",
    },
  ];

  return (
    <div>
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handleTableChange,
        }}
        className="shadow-lg border border-gray-200 rounded-lg"
      />
    </div>
  );
}

export default ManageRecived;
