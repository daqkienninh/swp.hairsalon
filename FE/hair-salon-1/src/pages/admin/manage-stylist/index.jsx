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
            title: "Tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Giới tính",
            dataIndex: "sex",
            key: "sex",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Cấp độ",
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
                label="Tên"
                name="fullName"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập Tên Stylist",
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
                        message: "Vui lòng nhập Email của Stylist",
                    },
                ]}
            >
                <Input />
            </FormItem>
            <FormItem
                label="Điện thoại"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập Điện thoại Stylist",
                    },
                ]}
            >
                <Input />
            </FormItem>
            <Form.Item name="password" label="Password"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập Password",
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
                label="Tên"
                name="fullName"
            >
                <Input />
            </FormItem>
            <FormItem
                label="Cấp độ"
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
                path="/api/stylist"
                title="Stylist"
            />
        </div>
    )
}

export default ManageStylist