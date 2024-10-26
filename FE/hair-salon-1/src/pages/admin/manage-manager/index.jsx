import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';

function ManageManager() {
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
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
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
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
    ];
    const formItems = (
        <>
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item label="Pasword" name="password" hidden>
                <Input />
            </Form.Item>
            <FormItem
                label="Full Name"
                name="fullName"
                rules={[
                    {
                        required: true,
                        message: "Please input Manager's name!",
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
            <Form.Item
                label="Role"
                name="role"
                initialValue="MANAGER"
                hidden
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
                path="/api/manager"
                title="Manager"
            />
        </div>
    )
}

export default ManageManager