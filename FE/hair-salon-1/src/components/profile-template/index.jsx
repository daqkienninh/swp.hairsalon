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
import { logout } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
//import { updateUser } from "../../redux/userSlice"; // Assuming you have this action in your userSlice

export default function ProfileTemplate() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Navigate to the homepage after logout
  };

  const [editMode, setEditMode] = useState({
    fullName: false,
    email: false,
    phone: false,
    sex: false,
  });

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    sex: user.sex,
  });

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (field) => {
    try {
      const response = await api.put(`/users/${user.id}`, {
        [field]: formData[field],
      });
      if (response.status === 200) {
        dispatch(updateUser({ [field]: formData[field] }));
        setEditMode({ ...editMode, [field]: false });
        toast.success(`${field} updated successfully`);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Failed to update user information");
    }
  };

  const renderField = (field, label) => (
    <MDBRow className="mb-4">
      <MDBCol sm="3">
        <MDBCardText>{label}</MDBCardText>
      </MDBCol>
      <MDBCol sm="7">
        {editMode[field] ? (
          <MDBInput
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        ) : (
          <MDBCardText className="text-muted">{user[field]}</MDBCardText>
        )}
      </MDBCol>
      <MDBCol sm="2">
        {editMode[field] ? (
          <MDBBtn
            rounded
            size="sm"
            onClick={() => handleUpdate(field)}
            style={{
              backgroundColor: "#94B49F",
              color: "white",
              borderColor: "#94B49F",
            }}
          >
            Save
          </MDBBtn>
        ) : (
          <MDBBtn
            rounded
            size="sm"
            onClick={() => handleEdit(field)}
            style={{
              backgroundColor: "#94B49F",
              color: "white",
              borderColor: "#94B49F",
            }}
          >
            Edit
          </MDBBtn>
        )}
      </MDBCol>
    </MDBRow>
  );

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
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center">
            <MDBCol lg="8">
              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  <div className="text-center mb-4">
                    <MDBCardImage
                      src={
                        user.avatarUrl ||
                        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      }
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "150px", margin: "0 auto" }}
                      fluid
                    />
                  </div>
                  <div className="text-center mb-4">
                    <h4 className="mb-1">{user.fullName}</h4>
                  </div>
                  <hr className="my-4" />
                  {renderField("fullName", "Full Name")}
                  <hr className="my-4" />
                  {renderField("email", "Email")}
                  <hr className="my-4" />
                  {renderField("phone", "Phone")}
                  <hr className="my-4" />
                  {renderField("sex", "Gender")}
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
