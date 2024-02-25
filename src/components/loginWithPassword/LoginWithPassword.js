import React, { useState } from "react";
import "./loginWithPassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// const host = "http://localhost:5000";
const host = "https://evernote-backend-n9aq.onrender.com";

const LoginWithPassword = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const [passhow, setPassShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${host}/loginWithPassword`, user);

      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.authtoken);
        navigate("/dashboard");
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
              className="input"
            />
            <div className="password_input_div">
              <input
                type={!passhow ? "password" : "text"}
                placeholder="Password"
                name="password"
                onChange={onChange}
                minLength={8}
                required
              />
              <div className="showpass" onClick={() => setPassShow(!passhow)}>
                {!passhow ? "Show" : "Hide"}
              </div>
            </div>
            <button type="submit" className="submitButton">
              Sign In
            </button>
          </form>
          <Link to="/login">Login with OTP</Link>
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
};

export default LoginWithPassword;
