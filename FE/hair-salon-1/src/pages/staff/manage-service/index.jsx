import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Button, Form, Input, Modal, Table, Upload } from "antd";
import { toast } from "react-toastify";
import CRUDTemplate from "../../../components/crud-template";
import CRUDService from "../../../components/crud-template/service";

function ManageService() {
  const [fileList, setFileList] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];
  
  const formItems = (
    <>
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên dịch vụ"
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên dịch vụ!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Loại" name="type" rules={[
        {
          required: true,
          message: "Vui lòng nhập loại dịch vụ!",
        },
      ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Thời gian" name="duration" rules={[
        {
          required: true,
          message: "Vui lòng nhập thời gian dịch vụ!",
        },
      ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="description" rules={[
        {
          required: true,
          message: "Vui lòng nhập mô tả dịch vụ!",
        },
      ]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Giá dịch vụ" name="price" rules={[
        {
          required: true,
          message: "Vui lòng nhập giá dịch vụ!",
        },
      ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Giảm giá" name="discount" rules={[
        {
          required: true,
          message: "Vui lòng nhập giảm giá dịch vụ!",
        },
      ]}>
        <Input />
      </Form.Item>
    </>
  );

  return (
    <div>
      <CRUDService
        columns={columns}
        formItems={formItems}
        path="/api/service"
        title="Service"
      />
    </div>
  );
}

export default ManageService;
