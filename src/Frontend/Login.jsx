import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const rootadmin = "hansi@gmail.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (email === "") {
      toast.error("Enter your Email");
      return;
    } else if (password.length < 9) {
      toast.error("Password should be at least 9 characters long");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:3002/api/v1/auth/login", {
        email,
        password,
      });
  
      if (res.data.success && res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("uid", res.data.uid);
        localStorage.setItem("stna", res.data.stna);
        localStorage.setItem("email", res.data.email);
  
        if (res.data.role === "admin") {
          toast.success("Logged in successfully.");
          navigate("/profile");
          window.location.reload();
        } else if (res.data.email === rootadmin) {
          navigate("/h");
        } else {
          toast.success("Logged in successfully.");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 500);
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found. Please register first.");
          // Delay navigation by 2 seconds to allow the toast to display
          setTimeout(() => {
            navigate("/register");
          }, 2000);
        } else if (error.response.status === 401) {
          toast.error("Invalid password.");
        } else {
          toast.error("An error occurred during login.");
        }
      } else {
        console.error("Login error:", error);
        toast.error("Network error or server is down.");
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "400px", height: "300px" }}>
        <div className="card-body">
          <h5 className="card-title text-center">LOGIN</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="form-control "
              style={{ width: "100px" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;