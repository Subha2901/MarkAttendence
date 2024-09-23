import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPanel from "./AdminPanel/AdminPanel";

const AuthCheck = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(localStorage);
    if (
      sessionStorage.getItem("isAuthenticated") === "true" ||
      localStorage.getItem("isAuthenticated") === "true"
    ) {
      if (sessionStorage.length === 0) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          sessionStorage.setItem(key, value);
        }
      }

      let email = sessionStorage.getItem("email");
      if (username == "admin" && sessionStorage.getItem("role") == "admin") {
        navigate("/admin");
      } else if (
        username != email &&
        sessionStorage.getItem("role") != "admin"
      ) {
        navigate(`/${email}`);
      } else {
        navigate(`/${username}`);
      }

      setLoading(false);
    } else {
      console.log("IsAthenticated is false");
      navigate("/login");
    }
  }, [navigate, username]);

  if (loading) return <div>Loading...</div>;
  return <div>{username == "admin" ? <AdminPanel /> : <Component />}</div>;
};

export default AuthCheck;
