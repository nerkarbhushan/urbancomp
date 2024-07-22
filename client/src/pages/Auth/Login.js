import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({ ...auth, token: res.data.token, user: res.data.user });
        // toast.success("Register Successfully..!! Please login!");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register_UC CAMP"}>
      <div className="form-container">
        <h1 className="title">Login</h1>
        <form className="regForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your emailD"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
