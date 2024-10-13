import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";

function HomePage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {/*   để homepage service vào đây, link tạm */}

      {/*   test login logout */}
      <div>
        {user == null ? (
          <button onClick={handleLogin}>Log in</button>
        ) : (
          <div>
            <h1>Welcome {user?.fullName}</h1>
            {/* <label htmlFor="">Phone: {user?.phone}</label> */}

            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
