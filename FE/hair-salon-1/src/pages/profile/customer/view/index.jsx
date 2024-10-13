import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileTemplate from "../../../../components/profile-template";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";

function ViewCustomer() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    navigate("/customer-update"); // Đảm bảo đường dẫn này khớp với route của trang UpdateCustomer
  };

  return <ProfileTemplate />;
}

export default ViewCustomer;
