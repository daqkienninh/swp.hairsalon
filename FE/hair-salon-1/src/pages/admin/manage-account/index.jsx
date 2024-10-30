import React from 'react'
import CRUDTemplate from '../../../components/crud-template';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';

function ManageAccount() {
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
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Giới tính",
            dataIndex: "sex",
            key: "sex",
        },
        {
            title: "Chức vụ",
            dataIndex: "role",
            key: "role",
        },

    ];
    return (
        <div>
            <CRUDTemplate
                columns={columns}
                path="/api/account"
                title="Account"
            />
        </div>
    )
}

export default ManageAccount