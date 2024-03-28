import React, { useState } from "react";
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
          console.log("Response:", res);
          console.log(res.data.data[0].NAME);
          console.log(res.data.dateDetails);
          navigate('/user', {state: {name: res.data.data[0].NAME, email: res.data.data[0].IDUSER, dates: res.data.dateDetails}});
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
    else alert('Please enter valid input')
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
