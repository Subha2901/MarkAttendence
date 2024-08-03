import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPanel from "./AdminPanel/AdminPanel";
import axios from "axios";

const AuthCheck = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
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
    } else {
      console.log("IsAthenticated is false");
      navigate("/login");
    }
  }, [navigate, username]);

  return <div>{username == "admin" ? <AdminPanel /> : <Component />}</div>;
};

export default AuthCheck;
