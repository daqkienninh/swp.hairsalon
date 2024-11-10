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
import uploadFile from "../../utils/file";
import { Form, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

export default function ProfileTemplate({ path, pathapi }) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    sex: user.sex,
    image: user.image,
    password: user.password,
  });

  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length) {
      handlePreview(newFileList[0]);
    }
  };

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      console.log("Updated Form Data:", updatedFormData);
      const response = await api.put(`${pathapi}/${user.id}`, updatedFormData);
      if (response.status === 200) {
        dispatch(updateUser(updatedFormData));
        setIsEditing(false);
        toast.success("Cập nhật thông tin thành công.");
      } else {
        console.error("Error updating user info:", response);
        toast.error("Không thể cập nhật thông tin.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Không thể cập nhật thông tin.");
    } finally {
      setLoading(false);
    }
  };

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
          onClick={() => navigate(`${path}`)}
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
                    <MDBBtn
                      onClick={() => setShowModal(true)}
                      rounded
                      size="sm"
                      style={{
                        backgroundColor: "#94B49F",
                        color: "#163020",
                        borderColor: "#94B49F",
                        marginTop: "10px",
                      }}
                    >
                      Đổi ảnh
                    </MDBBtn>
                    <Modal
                      open={showModal}
                      onCancel={() => {
                        setShowModal(false);
                        setFileList([]);
                      }}
                      onOk={handleUpdate}
                      title="Update Avatar"
                      confirmLoading={loading}
                    >
                      <Form form={form} labelCol={{ span: 24 }}>
                        <FormItem
                          label="Image"
                          name="image"
                          rules={[
                            {
                              required: true,
                              message: "Hãy tải hình ảnh của bạn lên.",
                            },
                          ]}
                        >
                          <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChangeUpload}
                            beforeUpload={() => false} // Prevent auto upload
                          >
                            {fileList.length >= 1 ? null : (
                              <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                            )}
                          </Upload>
                        </FormItem>
                      </Form>
                    </Modal>
                  </div>
                  <div className="text-center mb-4">
                    <MDBBtn
                      onClick={() => setIsEditing(!isEditing)}
                      style={{
                        backgroundColor: "#94B49F",
                        color: "#163020",
                        borderColor: "#94B49F",
                      }}
                    >
                      {isEditing ? "Hủy" : "Thay đổi thông tin"}
                    </MDBBtn>
                  </div>
                  {/* <hr className="my-4" />
                  {renderField("image", "Ảnh")} */}
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
                          color: "#163020",
                          borderColor: "#7a937f",
                        }}
                      >
                        Lưu
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
                      color: "#163020",
                      borderColor: "#94B49F",
                    }}
                  >
                    Đăng xuất
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
