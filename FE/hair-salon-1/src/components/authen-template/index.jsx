import { useNavigate } from "react-router-dom";
import "./index.css";
import { GrHomeRounded } from "react-icons/gr";

function AuthenTemplate({ children }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Navigate to the home page
  };
  return (
    <div className="authen-template">
      <div className="authen-template_image"></div>
      <div className="authen-template_form">{children}</div>
      <button onClick={handleClick} className="home-icon">
        <GrHomeRounded />
      </button>
    </div>
  );
}

export default AuthenTemplate;
