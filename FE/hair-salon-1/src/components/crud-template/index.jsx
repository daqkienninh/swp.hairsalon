import { Button, Form, Modal, Popconfirm, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

function CRUDTemplate({ columns, formItems, formItemsUpdate, path, title }) {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Fetch data
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

  // Handle form submission for create/update
  const handleSubmit = async (values) => {
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
      if (values.id) {
        await api.put(`${path}/${values.id}`, values);
        toast.success("Successfully Updated");
      } else {
        await api.post(path, values);
        toast.success("Successfully Created");
      }
      fetchData();
      form.resetFields();
      setShowModal(false);
      setShowModalUpdate(false);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await api.delete(`${path}/${id}`);
      toast.success("Deleted successfully");
      fetchData();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // Table columns with management actions
  const tableColumns = [
    ...columns,
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="" width={100} className="rounded" />,
    },
    {
      title: "Quản lý",
      dataIndex: "id",
      key: "id",
      render: (id, value) => (
        <>
          {path !== "/api/account" && path !== "/api/manager" && path !== "/api/customer" && (
            <Button
              type="primary"
              onClick={() => {
                setShowModalUpdate(true);
                form.setFieldsValue(value.account);
              }}
              className="mr-2 bg-[#94B49F] text-[#163020]"
            >
              Chỉnh sửa
            </Button>
          )}
          {path !== "/api/account" && path !== "/api/manager" && path !== "/api/customer" && (
            <Popconfirm
              title="Delete"
              description="Do you really want to delete?"
              onConfirm={() => handleDelete(id)}
            >
              <Button type="primary" danger>
                Xoá
              </Button>
            </Popconfirm>
          )}
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
    <div className="flex flex-col items-center">
      <PlusOutlined />
      <div className="mt-2">Tải ảnh lên</div>
    </div>
  );

  return (
    <div>


      <h1 className="text-2xl font-bold text-[#163020] mb-3 ml-3">{title}</h1>

      <Table columns={tableColumns} dataSource={data} pagination={{ pageSize: 10 }} />

      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
        title={title}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          {formItems}
          <FormItem label="Hình ảnh" name="image">
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

      <Modal
        visible={showModalUpdate}
        onCancel={() => setShowModalUpdate(false)}
        onOk={() => form.submit()}
        title={title}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          {formItemsUpdate}
          <FormItem label="Hình ảnh" name="image">
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
      <div className="flex justify-end mt-2">
        {path !== "/api/customer" && path !== "/api/account" && (
          <Button
            type="primary"
            onClick={() => setShowModal(true)}
            className="w-40 h-10 bg-[#94B49F] hover:none text-[#163020] border-0 rounded-lg text-base cursor-pointer my-2 transition-colors duration-300 ease-in-out"
          >
            Tạo mới
          </Button>
        )}
      </div>
    </div>
  );
}

export default CRUDTemplate;
