import React, { useContext, useEffect, useState } from "react";
import "./AboutUs.css";
import Logo from "../Images/Logo.png";
import Next_Logo from "../Images/MarkAttendence.png";
import { UserProfileContext } from "../App";
import axios from "axios";

const AboutUs = () => {
  const { profileVisible, setProfileVisible } = useContext(UserProfileContext);
  const [input, setInput] = useState(false);
  const [newName, setNewName] = useState(sessionStorage.getItem("name"));
  const [name, setName] = useState(sessionStorage.getItem("name"));

  useEffect(() => {
    console.log(profileVisible);
    if (profileVisible) {
      setTimeout(() => setProfileVisible(!profileVisible), 2 * 60 * 1000);
    }
  }, [profileVisible]);

  const handleName = function () {
    setInput(true);
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/namechange", {
        name: newName,
        email: sessionStorage.getItem("email"),
      })
      .then((res) => {
        if (res.status != "200") console.log("Error to change name");
        else {
          sessionStorage.setItem("name", newName);
          setName(newName);
          setInput(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="about" className="container-fluid about-us">
        <div className="container-fluid about-text-div">
          <span className="about-text">
            <strong className="about-heading">
              Welcome to &ensp;
              <span className="logo_css web-name"> MarkYourAttendance</span>
            </strong>
            ,<br />{" "}
            {profileVisible && (
              <span>
                Streamline attendance tracking effortlessly with our intuitive
                platform. From automated reports to real-time insights, simplify
                attendance management for businesses, schools, and organizations
                of any size.
                <div className="userDetails-div">
                  <span>Name: </span>
                  {input && (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                      <button type="submit" className="btn btn-sm">
                        Submit
                      </button>
                    </form>
                  )}
                  {!input && (
                    <span>
                      {name + " "}
                      <span style={{ cursor: "pointer" }} onClick={handleName}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                        </svg>
                      </span>
                    </span>
                  )}
                  <br /> <span>EmailId: </span>
                  {sessionStorage.getItem("email")}
                </div>
              </span>
            )}
            {!profileVisible && (
              <span>
                your ultimate solution for efficient attendance management. We
                provide an intuitive platform designed to streamline attendance
                tracking for businesses, schools, and organizations of all
                sizes. With user-friendly features and customizable options, our
                goal is to simplify the process of monitoring attendance, saving
                you time and resources. From automated reports to real-time
                insights, we empower you to effortlessly stay on top of
                attendance records. Join us and experience the convenience of
                modern attendance management.
              </span>
            )}
          </span>
        </div>
        <div className="container-fluid about-img-div">
          <img
            className="about-img-top new_logo"
            src={Logo}
            alt="NewLogo"
            style={{ top: "20px", opacity: "0.2" }}
          />
          <img
            className="about-img-down new_logo"
            src={Next_Logo}
            alt="Logo"
            style={{ bottom: "40px", left: "200px" }}
          />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
