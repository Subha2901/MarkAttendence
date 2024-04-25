import React, { useContext, useEffect } from "react";
import "./AboutUs.css";
import Logo from "../Images/Logo.png";
import Next_Logo from "../Images/MarkAttendence.png";
import { UserProfileContext } from "../App";

const AboutUs = () => {
  const { profileVisible, setProfileVisible } = useContext(UserProfileContext);

  useEffect(() => {
    console.log(profileVisible);
    if(profileVisible){
      setTimeout(() => setProfileVisible(!profileVisible), 2*60*1000);
    }
  }, [profileVisible])

  return (
    <div id='about'  className="container-fluid about-us">
      <div className="container-fluid about-text-div">
        <span className="about-text">
          <strong className="about-heading">
            Welcome to &ensp;
            <span className="web-name"> MarkYourAttendance</span>
          </strong>
          ,<br />{" "}
          {profileVisible && (
            <span>
              Streamline attendance tracking effortlessly with our intuitive
              platform. From automated reports to real-time insights, simplify
              attendance management for businesses, schools, and organizations
              of any size.
              <div className="container">Name: {sessionStorage.getItem('name')}</div>
              <div className="container">EmailId: {sessionStorage.getItem('email')}</div>
            </span>
          )}
          {!profileVisible && (
            <span>
              your ultimate solution for efficient attendance management. We
              provide an intuitive platform designed to streamline attendance
              tracking for businesses, schools, and organizations of all sizes.
              With user-friendly features and customizable options, our goal is
              to simplify the process of monitoring attendance, saving you time
              and resources. From automated reports to real-time insights, we
              empower you to effortlessly stay on top of attendance records.
              Join us and experience the convenience of modern attendance
              management.
            </span>
          )}
        </span>
      </div>
      <div className="about-img-div">
        <img
          className="about-img new_logo"
          src={Logo}
          alt="NewLogo"
          style={{ top: "20px", opacity: "0.2" }}
        />
        <img
          className="about-img new_logo"
          src={Next_Logo}
          alt="Logo"
          style={{ bottom: "40px", left: "200px" }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
