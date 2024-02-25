import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// const host = "http://localhost:5000";
const host = "https://evernote-backend-n9aq.onrender.com";

function Login() {
  const [user, setUser] = useState({ email: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${host}/loginWithOtp`, user);

      if (res.status === 200) {
        navigate("/loginOtp", { state: user.email });
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <div className="loginLeft">
          <form className="formContainer" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
              required
              className="login_input"
            />
            <button type="submit" className="submitButton">
              Send OTP
            </button>
          </form>
          <Link to="/loginWithPassword">Login with Password</Link>
        </div>

        <div className="loginRight">
          <h1>New Here</h1>
          <Link to="/register">
            <button type="button" className="rightButton">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
