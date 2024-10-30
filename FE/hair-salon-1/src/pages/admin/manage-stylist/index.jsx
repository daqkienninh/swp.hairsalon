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
                        message: "Please input Stylist's email!",
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
                        message: "Please input Stylist's phone!",
                    },
                ]}
            >
                <Input />
            </FormItem>
            <Form.Item name="password" label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input Stylist's Password!",
                    },
                ]}>
                <Input type="password" />
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
                label="Level"
                name="level"
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
                path="/api/stylist"
                title="Stylist"
            />
        </div>
    )
}

export default ManageStylist