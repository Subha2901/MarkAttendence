import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Validate from "./LoginValidation";

const Signup = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState('')
  const [error, setError] = useState({});
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = function (e) {
    setUser({
      ...user,
      [e.target.name]: [e.target.value],
    });

    setError(Validate(user));
  };

  useEffect(() => {
    if(localStorage.getItem('isAuthenticated') === 'true') navigate('/');
    else  navigate('/signup')
  },[])

  const handleSubmit = function (event) {
    event.preventDefault();
    if (error.email == "" && error.password == "") {
      axios
        .post("http://localhost:4000/signup", user)
        .then((res) => {
          localStorage.setItem('isAuthenticated', true)
          localStorage.setItem('name', user.name)
          localStorage.setItem('email', user.email)
          navigate('/')
        })
        .catch((error) => {
          localStorage.setItem('isAuthenticated', false)
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
    <div className="login-div container">
      <p className="h1 mt-3" style={{ alignContent: "center" }}>
        Please Sign In
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
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
            value={user.value}
            onChange={handleChange}
            required
          />
          <div id="passwordHelp"className="form-text">{error.password}</div>
        </div>
        <div
          className="mb-3 form-check"
          style={{ fontSize: "20px", paddingTop: "10px" }}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            required
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Aceept all the terms and organization.
          </label>
        </div>

        <div className="container signup-div">
          <button type="submit" className="btn btn-primary btn-lg my-3">
            SignUp
          </button>

          <p className="fst-normal" style={{ margin: "40px 0px 0px 20px" }}>
            Already a user?
          </p>
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "end",
              marginBottom: "1rem",
              textDecoration: "none",
            }}
          >
            <button className="btn btn-warning">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
