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
            title: "Sex",
            dataIndex: "sex",
            key: "sex",
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
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
                label="Sex"
                name="sex"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone"
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
                label="Role"
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
                label="Full Name"
                name="fullName"
            >
                <Input />
            </FormItem>
            <FormItem
                label="Level"
                name="level"
            >
                <Input />
            </FormItem>'
            <FormItem
                label="Email"
                name="email"
                hidden
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