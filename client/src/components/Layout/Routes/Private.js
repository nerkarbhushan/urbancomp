import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../components/Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      await axios
        .get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`)
        .then((res) => {
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
