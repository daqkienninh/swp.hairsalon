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
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Sex",
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
                label="Full Name"
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
                label="Phone"
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
                label="Full Name"
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
                label="Phone"
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