import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

function ManageCustomer() {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Điện thoại",
      dataIndex: ["account", "phone"],
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: ["account", "email"],
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Điểm thành viên",
      dataIndex: "loyaltyPoint",
      key: "loyaltyPoint"
    }
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
        label="Tên"
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
        label="Giới tính"
        name="sex"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Điện thoại"
        name="phone"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Chức vụ"
        name="role"
        hidden
      >
        <Input />
      </Form.Item>
    </>
  );
  const formItemsUpdate = (
    <>
      <Form.Item name="id" label="Stylist ID">
        <Input />
      </Form.Item>

      <FormItem
        label="Tên"
        name="fullName"
      >
        <Input />
      </FormItem>
      <FormItem
        label="Email"
        name="email"
      >
        <Input />
      </FormItem>
      <FormItem
        label="Điện thoại"
        name="phone"
        hidden
      >
         <Input />
      </FormItem>
      <Form.Item name="password" label="Password">
        <Input />
      </Form.Item>
    </>
  ); 

  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        formItemsUpdate={formItemsUpdate}
        path="/api/customer"
        title="Customer"
      />
    </div>
  )
}

export default ManageCustomer