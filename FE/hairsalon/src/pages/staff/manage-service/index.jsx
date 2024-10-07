import React, { useEffect, useState } from 'react'
import api from '../../../config/axios'
import { Button, Form, Input, Modal, Table } from 'antd'
import { toast } from 'react-toastify'

function ManageService() {

    const [service, setService] = useState()
    const [loading, setLoading] = useState (false)
    const [form] = Form.useForm()
    const [showModal, setShowModal] = useState(false)

    // get data
    const fetchData = async ()=> {
        try {
            const response = await api.get("/api/category")
            setService(response.data)
        } catch (error) {
            console.log(error)
            toast.error(error.response.service);
        }
    }

    useEffect (() => {
        fetchData()
    }, [])

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
    ]

/*------------------------------------------------------------------ */

    // create
    const handleSubmit = async (values) => {
        console.log(values)
        try {
            setLoading(true)
            const response = await api.post("/api/category", values)
            toast.success("Successfully saved")
            fetchData()
            form.resetFields()
            setShowModal(false)
        } catch (error) {
            toast.error(error.response.service)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

/*------------------------------------------------------------------- */

    // delete
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/category/${id}`)
            toast.success("Delete successfully")
            fetchData()
        } catch (error) {
            toast.error(error.response.service)
        }
    }

  return (
    <div>
        <Button onClick={() => setShowModal(true)}>Add New Service</Button>
        <Table columns={columns} dataSource={service}/>
        <Modal
            open = {showModal}
            onCancel={() => setShowModal(false)}
            onOk={() => form.submit()}
            title = "Service"
            confirmLoading = {loading}
        >
            <Form form={form} labelCol={{span: 24}} onFinish={handleSubmit}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input category name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input.TextArea />
                </Form.Item>
            </Form>
            
        </Modal>
    </div>
  )
}

export default ManageService