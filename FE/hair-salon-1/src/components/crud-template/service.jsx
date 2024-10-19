import { Button, Form, Modal, Popconfirm, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import uploadFile from "../../utils/file";

function CRUDService({ columns, formItems, path, title }) {
    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    // Get data
    const fetchData = async () => {
        try {
            const response = await api.get(path);
            console.log(response.data)
            setData(response.data)
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

        setLoading(true);
        let imageUrl = '';

        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            if (file) {
                imageUrl = await uploadFile(file);
                values.image = imageUrl;
                if (!imageUrl) {
                    throw new Error('Failed to upload image');
                }
            }
        }
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
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => {
                return <img src={image} alt="" width={100}></img>;
            },
        },
        {
            title: "Manage Service",
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
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
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
                    {formItems},
                    <FormItem
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => false} // Prevent auto upload
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
}

export default CRUDService;
