import { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
//import { updateUser } from "../../redux/userSlice"; // Assuming you have this action in your userSlice
import uploadFile from "../../utils/file";
import { Button, Form, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

export default function ProfileTemplate() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    sex: user.sex,
    image: user.image,
    image: user.avatarUrl,
    password: user.password,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/api/customer/${user.id}`, formData);
      if (response.status === 200) {
        dispatch(updateUser(formData));
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Failed to update user information");
    }
  };

  const handleAvatarUpload = async (field) => {
    setLoading(true);
    let imageUrl = '';

    try {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        if (file) {
          imageUrl = await uploadFile(file);
          if (!imageUrl) {
            throw new Error('Failed to upload image');
          }
        }
      }

      if (imageUrl) {
        const response = await api.put(`/users/${user.id}`, { image: imageUrl });
        if (response.status === 200) {
          dispatch(updateUser({ image: imageUrl }));
          setFormData({ ...formData, image: imageUrl });
          toast.success("Avatar updated successfully");
          setShowModal(false);
          setFileList([]);
        }
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error(error.message || "Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };
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
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChangeImage = ({ fileList: newFileList }) => setFileList(newFileList);

  
  const renderSexField = () => (
    <MDBRow className="mb-4">
      <MDBCol sm="3">
        <MDBCardText
          style={{ textAlign: "left", marginLeft: "40px", fontWeight: "bold" }}
        >
          Giới tính
        </MDBCardText>
      </MDBCol>
      <MDBCol sm="9">
        {isEditing ? (
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="form-select"
          >
            <option value=""></option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        ) : (
          <MDBCardText
            className="text-muted"
            style={{ textAlign: "left", marginLeft: "100px" }}
          >
            {user.sex}
          </MDBCardText>
        )}
      </MDBCol>
    </MDBRow>
  );

  const renderField = (field, label) => {
    if (field === "sex") {
      return renderSexField();
    }

    return (
      <MDBRow className="mb-4">
        <MDBCol sm="3">
          <MDBCardText
            style={{
              textAlign: "left",
              marginLeft: "40px",
              fontWeight: "bold",
            }}
          >
            {label}
          </MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          {isEditing ? (
            <MDBInput
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          ) : (
            <MDBCardText
              className="text-muted"
              style={{ textAlign: "left", marginLeft: "100px" }}
            >
              {field === "password" ? "********" : user[field]}
            </MDBCardText>
          )}
        </MDBCol>
      </MDBRow>
    );
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          color: "#94B49F",
        }}
      >
        <GrHomeRounded
          size={30}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <section style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
        <MDBContainer
          style={{ maxWidth: "950px", margin: "0 auto" }}
          className="py-5"
        >
          <MDBRow className="justify-content-center">
            <MDBCol lg="8">
              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  <div className="text-center mb-4">
                    <MDBCardImage
                      src={
                        user.image ||
                        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      }
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "150px", margin: "0 auto" }}
                      fluid
                    />
                    <div className="mt-3">
                      {/* <input
                        type="file"
                        id="avatar-upload"
                        style={{ display: "none" }}
                        onChange={handleAvatarUpload}
                        accept="image/*"
                      /> */}

                      <Button
                        className="border-none"
                        htmlFor="avatar-upload"
                        onClick={() => setShowModal(true)}>
                        <MDBBtn
                          rounded
                          size="sm"
                          style={{
                            backgroundColor: "#94B49F",
                            color: "white",
                            borderColor: "#94B49F",
                          }}
                        >
                          Change Avatar
                        </MDBBtn>
                      </Button>
                      <Modal
                        open={showModal}
                        onCancel={() => {
                          setShowModal(false);
                          setFileList([]);
                        }}
                        onOk={handleAvatarUpload}
                        title="Update Avatar"
                        confirmLoading={loading}
                      >
                        <Form form={form} labelCol={{ span: 24 }}>
                          <FormItem
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please upload an image' }]}
                          >
                            <Upload
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={handlePreview}
                              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                              beforeUpload={() => false} // Prevent auto upload
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                          </FormItem>
                        </Form>
                      </Modal>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    {/* <h4 className="mb-1">{user.fullName}</h4> */}
                    <MDBBtn
                      onClick={() => setIsEditing(!isEditing)}
                      style={{
                        backgroundColor: "#94B49F",
                        color: "white",
                        borderColor: "#94B49F",
                      }}
                    >
                      {isEditing ? "Cancel" : "Update"}
                    </MDBBtn>
                  </div>
                  <hr className="my-4" />
                  {renderField("fullName", "Họ và Tên")}
                  <hr className="my-4" />
                  {renderField("email", "Email")}
                  <hr className="my-4" />
                  {renderField("phone", "SĐT")}
                  <hr className="my-4" />
                  {renderField("sex", "Giới tính")}
                  <hr className="my-4" />
                  {renderField("password", "Mật khẩu")}
                  {isEditing && (
                    <div className="text-center mt-4">
                      <MDBBtn
                        onClick={handleUpdate}
                        style={{
                          backgroundColor: "#7a937f",
                          color: "white",
                          borderColor: "#7a937f",
                        }}
                      >
                        Save Changes
                      </MDBBtn>
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <h5 className="card-title text-center">
            <div>
              {user == null ? (
                navigate("/")
              ) : (
                <div>
                  <MDBBtn
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "#94B49F",
                      color: "white",
                      borderColor: "#94B49F",
                    }}
                  >
                    Log Out
                  </MDBBtn>
                </div>
              )}
            </div>
          </h5>
        </MDBContainer>
      </section>
    </div>
  );
}
