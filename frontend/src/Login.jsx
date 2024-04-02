import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Validate from "./LoginValidation";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === 'true') navigate("/");
    else navigate("/login");
  }, []);

  const handleChange = function (event) {
    setUser({
      ...user,
      [event.target.name]: [event.target.value],
    });

    setError(Validate(user));
  };

  // const userDetails = {
  //   email: email,
  //   password: password,
  // };

  const handleSubmit = function (event) {
    event.preventDefault();
    if (error.email == "" && error.password == "") {
      axios
        .post("http://localhost:4000/login", user)
        .then((res) => {
          console.log(res);

          const data = res.data;
          const dates = data.dateDetails;

          var attendenceDatesArr = [];
          var timeRangeArr = [];

          // console.log(dates[0].DATE);
          // console.log(dates[0].START_TIME);
          // console.log(dates[0].END_TIME);
  

          for (let i = 0; i < dates.length; i++) {
            attendenceDatesArr[i] = new Date(dates[i].DATE);
            timeRangeArr[i] = ([dates[i].START_TIME, dates[i].END_TIME ]);
            // timeRangeArr[i][1] = dates[i].END_TIME;
          }

          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("name", data.data[0].NAME);
          localStorage.setItem("email", data.data[0].IDUSER);
          localStorage.setItem(
            "attendenceDatesArr",
            JSON.stringify(attendenceDatesArr)
          );
          localStorage.setItem("timeRangeArr", JSON.stringify(timeRangeArr));
          navigate("/");
        })
        .catch((error) => {
          localStorage.setItem("isAuthenticated", false);
          console.log("Error:", error);
        });
    } else alert("Please enter valid input");
  };

  // const handleLogout = function(event){
  //     axios.post('http://localhost:4000/logout')
  //         .then(res => console.log(res))
  //         .then(err => console.log(err))
  // }

  return (
    <div className="login-div container bg-gradient">
      <p className="h1 mt-3" style={{ alignContent: "center" }}>
        Please Sign In
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <div id="emailHelp" className="form-text">
            {error.email}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter password"
            aria-describedby="passwordHelp"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <div id="passwordHelp" className="form-text">
            {error.password}
          </div>
        </div>

        <div
          className="mb-3 form-check"
          style={{ fontSize: "20px", paddingTop: "10px" }}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <div className="container signup-div">
          <button type="submit" className="btn btn-primary btn-lg my-3">
            Login
          </button>

          <p className="fst-normal" style={{ margin: "40px 0px 0px 20px" }}>
            Already a user?
          </p>
          <Link
            to="/signup"
            style={{
              display: "flex",
              alignItems: "end",
              marginBottom: "1rem",
              textDecoration: "none",
            }}
          >
            <button className="btn btn-warning">SignUp</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
