import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

function ManageStaff() {
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
    ];
    const formItems = (
        <>
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            <FormItem
                label="Tên"
                name="fullName"
                rules={[
                    {
                        required: true,
                        message: "Please input Staff's name!",
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
            <Form.Item label="Password" name="password">
                <Input />
            </Form.Item>
            <Form.Item
                label="Điện thoại"
                name="phone"
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
      <div><CRUDTemplate
          columns={columns}
          formItems={formItems}
          formItemsUpdate={formItemsUpdate}
          path="/api/staff"
          title="Manage Staff"
      /></div>
  )
}

export default ManageStaff