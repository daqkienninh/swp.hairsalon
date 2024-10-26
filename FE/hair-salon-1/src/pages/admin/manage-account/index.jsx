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
            title: "Role",
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