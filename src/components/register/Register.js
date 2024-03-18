import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// const host = "http://localhost:5000";
const host = "https://evernote-backend-n9aq.onrender.com";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const [passhow, setPassShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${host}/register`, user);

      if (res.status === 200) {
        navigate("/registerOtp", { state: user.email });
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
    <div className="signupContainer">
      <div className="signupFormContainer">
        <div className="signupLeft">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="leftButton">
              Sign In
            </button>
          </Link>
        </div>

        <div className="signupRight">
          <form className="formContainer" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={onChange}
              required
              className="signup_input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
              required
              className="signup_input"
            />
            <div className="signup_password_input_div">
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
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
