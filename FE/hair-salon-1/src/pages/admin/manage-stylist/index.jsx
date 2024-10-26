import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';

function ManageStylist() {
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
            title: "Description",
            dataIndex: "description",
            key: "description",
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
            <FormItem
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
            </FormItem>
            <Form.Item name="password" label="Password">
                <Input />
            </Form.Item>
            <Form.Item
                label="Sex"
                name="sex"
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
                path="/api/stylist"
                title="Stylist"
            />
        </div>
    )
}

export default ManageStylist