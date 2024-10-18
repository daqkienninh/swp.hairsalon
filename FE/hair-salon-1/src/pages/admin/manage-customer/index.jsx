import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

function ManageCustomer() {

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "discount",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
  ];
  const formItems = (
    <>
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="password" hidden>
        <Input />
      </Form.Item>
      <FormItem
        label="Full Name"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input Customer's name!",
          },
        ]}
      >
        <Input />
      </FormItem>
      <FormItem
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input Email!",
          },
        ]}
      >
        <Input />
      </FormItem>
      <Form.Item
        label="Image"
        name="image"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Sex"
        name="sex"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
      >
        <Input />
      </Form.Item>
    </>
  );

  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        path="/api/customer"
        title="Customer"
      />
    </div>
  )
}

export default ManageCustomer