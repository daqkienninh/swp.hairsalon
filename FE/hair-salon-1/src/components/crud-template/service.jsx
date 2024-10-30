import { Button, Form, Modal, Popconfirm, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import uploadFile from "../../utils/file";

function CRUDService({ columns, formItems, path, title }) {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
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

    const fetchData = async () => {
        try {
            const response = await api.get(path);
            setData(response.data);
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        let imageUrl = '';

        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            if (file) {
                imageUrl = await uploadFile(file);
                values.image = imageUrl;
            }
        }
        try {
            if (selectedRow) {
                await api.put(`${path}/${selectedRow.id}`, values);
                toast.success("Successfully updated");
            } else {
                await api.post(path, values);
                toast.success("Successfully created");
            }
            fetchData();
            form.resetFields();
            setShowModal(false);
            setSelectedRow(null);
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedRow) return;
        try {
            await api.delete(`${path}/${selectedRow.id}`);
            toast.success("Delete successfully");
            fetchData();
            setSelectedRow(null);
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const handleRowSelect = (record) => {
        setSelectedRow(selectedRow?.id === record.id ? null : record);
        form.setFieldsValue(selectedRow?.id === record.id ? {} : record);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <button className="flex flex-col items-center">
            <PlusOutlined />
            <div className="mt-2">Tải ảnh lên</div>
        </button>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#163020] mb-3 ml-3">Dịch vụ</h1>

            <Table
                columns={[
                    ...columns,
                    {
                        title: "Hình ảnh",
                        dataIndex: "image",
                        key: "image",
                        render: (image) => <img src={image} alt="" width={100} />,
                    },
                ]}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                rowSelection={{
                    type: "radio",
                    onSelect: handleRowSelect,
                    selectedRowKeys: selectedRow ? [selectedRow.id] : [],
                }}
            />
            <div className="flex justify-end mt-4 gap-2">
                <button
                    type="primary"
                    onClick={() => {
                        setShowModal(true);
                        setSelectedRow(null); // Reset selected row for "Create New"
                        form.resetFields(); // Clear form for new entry
                    }}
                    className="w-40 h-10 bg-[#94B49F] hover:bg-[#CEE5D0] text-[#163020] border-0 rounded-lg text-base cursor-pointer transition-colors duration-300 ease-in-out"
                >
                    Tạo mới
                </button>

                <Button
                    type="primary"
                    onClick={() => setShowModal(true)}
                    disabled={!selectedRow}
                    className="w-40 h-10 bg-[#94B49F]  text-[#163020] border-0 rounded-lg text-base cursor-pointer transition-colors duration-300 ease-in-out"
                >
                    Chỉnh sửa
                </Button>

                <Popconfirm
                    title="Bạn có chắc sẽ xoá dịch vụ này?"
                    onConfirm={handleDelete}
                    okText="Có"
                    cancelText="Không"
                    disabled={!selectedRow}
                >
                    <Button
                        type="primary"
                        danger
                        disabled={!selectedRow}
                        className="w-40 h-10 text-base cursor-pointer transition-colors duration-300 ease-in-out"
                    >
                        Xoá
                    </Button>
                </Popconfirm>
            </div>

            <Modal
                open={showModal}
                onCancel={() => setShowModal(false)}
                onOk={() => form.submit()}
                title={selectedRow ? `Chỉnh sửa` : `Tạo mới`}
                confirmLoading={loading}
            >
                <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
                    {formItems}
                    <FormItem
                        label="Hình ảnh"
                        name="image"
                        rules={[{ required: true, message: "Vui lòng tải ảnh!" }]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => true}
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
