import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDetails from "../UserDetails/UserDetails";
import axios from "axios";
import { UserProfileContext } from "../App";

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:4000/user", { email: username })
      .then((res) => {
        console.log('In response of userprofile');
        
        const data = res.data;
        const dates = data.dateDetails;

        var attendenceDatesArr = [];
        var timeRangeArr = [];
        var status = [];

        for (let i = 0; i < dates.length; i++) {
          attendenceDatesArr[i] = new Date(dates[i].DATE);
          timeRangeArr[i] = [dates[i].START_TIME, dates[i].END_TIME];
          status[i] = dates[i].STATUS;
        }

        sessionStorage.setItem(
          "name",
          data.data[0].NAME.substr(0, data.data[0].NAME.lastIndexOf(" "))
        );
        sessionStorage.setItem("fullName", data.data[0].NAME);
        sessionStorage.setItem(
          "attendenceDatesArr",
          JSON.stringify(attendenceDatesArr)
        );
        sessionStorage.setItem("timeRangeArr", JSON.stringify(timeRangeArr));
        sessionStorage.setItem("status", JSON.stringify(status));
        sessionStorage.setItem("email", username);

        setUserLoading(false);
      })
      .catch((error) => {
        sessionStorage.setItem("isAuthenticated", false);
        navigate("/login");
        console.log("Error:", error);
      });
  }, [username, navigate]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserDetails />
    </>
  );
};

export default UserProfile;
