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
            title: "Tên",
            dataIndex: "fullName",
            key: "fullName",
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
                        message: "Please input Manager's name!",
                    },
                ]}
            >
                <Input />
            </FormItem>
            <Form.Item label="Pasword" name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input Manager's name!",
                    },
                ]}>
                <Input />
            </Form.Item>
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
                rules={[
                    {
                        required: true,
                        message: "Please input Phone!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Chức vụ"
                name="role"
                initialValue="MANAGER"
                hidden
            >
                <Input />
            </Form.Item>
        </>
    );

    const formItemsUpdate = (
        <>
            <Form.Item name="id" label="Manager ID">
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
                hidden
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
                path="/api/manager"
                title="Manager"
            />
        </div>
    )
}

export default ManageManager