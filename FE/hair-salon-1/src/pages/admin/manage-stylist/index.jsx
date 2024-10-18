import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

function ManageStylist() {
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
            title: "Level",
            dataIndex: "level",
            key: "level",
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
            <FormItem
                label="Full Name"
                name="fullName"
                rules={[
                    {
                        required: true,
                        message: "Please input Stylist's name!",
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
                label="password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input password!",
                    },
                ]}
            >
                <Input/>
            </FormItem>
            <Form.Item
                label="Level"
                name="level"
            >
                <Input />
            </Form.Item>
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
            <FormItem
                label="Description"
                name="description"
            >
                <TextArea />
            </FormItem>
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