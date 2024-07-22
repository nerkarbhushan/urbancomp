import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  // const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  // const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"ForgotPassword_UC CAMP"}>
      <div className="form-container">
        <h1 className="title">Rest Password</h1>
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
            <label htmlFor="exampleInputEmail" className="form-label">
              Which is favourite sports
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
