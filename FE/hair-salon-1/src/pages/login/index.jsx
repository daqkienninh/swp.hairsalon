import React from "react";
import AuthenTemplate from "../../components/authen-template";
import { Button, Form, Input } from "antd";
import { googleProvider } from "../../config/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

function LoginPage() {
  const navigate = useNavigate(); // Function link to another location


  const handleLoginGoolge = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  /*End Handle LoginGoogle ------------------------------------------------------------------ */

  const dispatch = useDispatch(); // Store data to redux
  const handleLogin = async (values) => {
    try {
      const response = await api.post("/api/login", values);
      console.log(response);
      const {role, token} = response.data;
      dispatch(login(response.data));
      localStorage.setItem("token", token);
      if (role == 'CUSTOMER') { // Customize the role
        navigate("/dashboard");
        toast.success("Login successfully");
      }else {
        navigate("/")
        toast.success("Login successfully");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  /*End handle Login--------------------------------------------------------------------------- */


  return (
    <AuthenTemplate>
      <div style={{ height: "100vh" }}>
        <h2 className="title">Login</h2>
        <h4 className="message">Please login to booking hair salon service.</h4>
        <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
          <Form.Item
            label="Phone"
            name="phone"
            className="form-item"
            rule={[
              {
                required: true,
                message: "Pleas input your phone number",
              },
              {
                pattern: "^[0-9]{10}$",
                message: "Phone number must have 9 digits!",
              },
            ]}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className="form-item"
            rule={[
              {
                required: true,
                message: "Pleas input password",
              },
            ]}
          >
            <Input.Password className="input" />
          </Form.Item>
          <div>Forget your password? Click here to change it!</div>
          <button type="primary" htmlType="submit" className="button">
            Login
          </button>
          <p className="message">You can log in with another accounts.</p>
          <button onClick={handleLoginGoolge} className="button-google">
            Continue with
          </button>
          <div>
            <Link to="/register">
              Don't have account? Register new account!
            </Link>
          </div>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default LoginPage;

/**************************************************** */
