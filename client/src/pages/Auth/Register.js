import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, latitude, longitude, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // toast.success("Register Successfully..!! Please login!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //location function
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //         toast.success("Loction fetch successfully");
  //       },
  //       (error) => {
  //         setError(error.message);
  //       }
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }
  // };
  return (
    <Layout title="Register_UC CAMP">
      <div className="form-container">
        <h1 className="title">Register</h1>
        <form className="regForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone No
            </label>
            <input
              type="Number"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLatitude" className="form-label">
              Latitude
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLatitude"
              placeholder="Enter your latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLongitude" className="form-label">
              Longitude
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLongitude"
              placeholder="Enter your longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="exampleInputLocation" className="form-label">
              Click below to get your current loaction
            </label>
            <br />
            <button className=" btn-secondary" onClick={getLocation}>
              Click here
            </button>
            {location.latitude && location.longitude && (
              <div className="mt-2 mb-2">
                <h6>Current Location</h6>
                <hr />
                <span className="m-1">Latitude: {location.latitude}</span>
                <span className="m-1">Longitude: {location.longitude}</span>
              </div>
            )}
            {error && <p>Error: {error}</p>}
          </div> */}
          <div className="mb-3">
            <label htmlFor="exampleInputAnswer" className="form-label">
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

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
