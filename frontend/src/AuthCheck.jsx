import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("isAuthenticated") === "true" ||
      localStorage.getItem("isAuthenticated") === "true"
    ) {
      if(sessionStorage.length === 0){
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          sessionStorage.setItem(key, value);
        }
      }
    }
    else {
      console.log("IsAthenticated is false");
      navigate("/login");      
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default AuthCheck;
