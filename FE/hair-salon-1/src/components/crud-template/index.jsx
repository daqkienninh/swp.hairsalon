import { Button, Form, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function CRUDTemplate({ columns, formItems, path, title }) {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Get data
  const fetchData = async () => {
    try {
      const response = await api.get(path);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create or update
  const handleSubmit = async (values) => {
    console.log(values); // print data user send

    try {
      setLoading(true);
      // if value already has id => Update
      if (values.id) {
        console.log(values.id);
        const response = await api.put(`${path}/${values.id}`, values);
        toast.success("Successfully Update");
      } else {
        const response = await api.post(path, values);
        toast.success("Successfully Create");
      }
      fetchData(); // load data again
      form.resetFields(); // xoa data vua nhap trong form
      setShowModal(false); // dong modal
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await api.delete(`${path}/${id}`);
      toast.success("Delete successfully");
      fetchData();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // Table template
  const tableColums = [
    ...columns,
    {
      title: "Manage",
      dataIndex: "id",
      key: "id",
      render: (id, value) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(value);
            }}
          >
            Edit
          </Button>
          <br />
          <Popconfirm
            title="Delete"
            description="Do you really want to delete?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Create new</Button>
      <Table columns={tableColums} dataSource={data} />
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
        title={title}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default CRUDTemplate;
