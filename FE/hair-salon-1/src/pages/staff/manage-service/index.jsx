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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
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
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input category name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Type" name="type">
        <Input />
      </Form.Item>
      <Form.Item label="Duration" name="duration">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <Input />
      </Form.Item>
      <Form.Item label="Discount" name="discount">
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
