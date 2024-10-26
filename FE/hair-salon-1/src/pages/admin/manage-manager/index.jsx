import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

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
<<<<<<<< HEAD:FE/hair-salon-1/src/pages/admin/manage-manager/index.jsx
            <Form.Item label="Pasword" name="password" hidden>
========
            <Form.Item label="Password" name="password">
>>>>>>>> origin/fe-trang:FE/hair-salon-1/src/pages/admin/manage-stylist/index.jsx
                <Input />
            </Form.Item>
            <FormItem
                label="Full Name"
                name="fullName"
                rules={[
                    {
                        required: true,
<<<<<<<< HEAD:FE/hair-salon-1/src/pages/admin/manage-manager/index.jsx
                        message: "Please input Manager's name!",
========
                        message: "Please input Customer's name!",
>>>>>>>> origin/fe-trang:FE/hair-salon-1/src/pages/admin/manage-stylist/index.jsx
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
<<<<<<<< HEAD:FE/hair-salon-1/src/pages/admin/manage-manager/index.jsx
                initialValue="MANAGER"
========
>>>>>>>> origin/fe-trang:FE/hair-salon-1/src/pages/admin/manage-stylist/index.jsx
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
<<<<<<<< HEAD:FE/hair-salon-1/src/pages/admin/manage-manager/index.jsx
                path="/api/manager"
                title="Manager"
========
                path="/api/account"
                title="Stylist"
                roles="STYLIST"
                puts="/api/stylist"
>>>>>>>> origin/fe-trang:FE/hair-salon-1/src/pages/admin/manage-stylist/index.jsx
            />
        </div>
    )
}

export default ManageManager