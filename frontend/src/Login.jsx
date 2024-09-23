import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Validate from "./LoginValidation";
import Icon from "./Icon";

const Login = ({ signin }) => {
  // const [email, setEmail] = useState("");
  const [passwordInputType, setPasswordInputType] = useState(false);
  const [cpasswordInputType, setCPasswordInputType] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [error, setError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({});

  useEffect(() => {
    const path = location.pathname;

    if (path == "/login") document.title = "MarkAttendence - Login";
    else document.title = "MarkAttendence - SignIn";
    console.log('Login render');
  }, [location]);

  useEffect(() => {
    console.log('Login UseEffect is runned');
    if (
      sessionStorage.getItem("isAuthenticated") == "true" ||
      localStorage.getItem("isAuthenticated") == "true"
    ) {
      console.log('in If block');
      let username = sessionStorage.getItem('email').substr(0,sessionStorage.getItem('email').lastIndexOf('@'))
      navigate(`/${username}`);
      if (sessionStorage.length === 0) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          sessionStorage.setItem(key, value);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (confirmPassword == user.password)
      setError({ ...error, confirmPassword: "" });
    else
      setError({
        ...error,
        confirmPassword: "Password and COnfirm password is not same",
      });
  }, [confirmPassword]);

  const handleChange = function (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    setError({ ...error, password: Validate(user) });
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    if (error.password == "") {
      if (!signin) {
        axios
          .post("http://localhost:4000/login", user)
          .then((res) => {
            console.log(res);
            const data = res.data;

            if (checkBox) {
              localStorage.setItem("isAuthenticated", true);
              //localStorage.setItem("name", data.data[0].NAME);
              localStorage.setItem("email", data.data[0].IDUSER);
            }

            //NewEdit
            sessionStorage.setItem("isAuthenticated", true);
            // sessionStorage.setItem("name", data.data[0].NAME);
            sessionStorage.setItem("email", data.data[0].IDUSER);
            sessionStorage.setItem("role", data.data[0].ROLE);

            if (data.data[0].ROLE == 'admin') navigate("/admin")
            else navigate(`/${data.data[0].IDUSER}`)
          })
          .catch((error) => {

            // for mobile server
            axios
          .post("http://192.168.1.7:4000/login", user)
          .then((res) => {
            console.log(res);
            const data = res.data;

            if (checkBox) {
              localStorage.setItem("isAuthenticated", true);
              //localStorage.setItem("name", data.data[0].NAME);
              localStorage.setItem("email", data.data[0].IDUSER);
            }

            //NewEdit
            sessionStorage.setItem("isAuthenticated", true);
            // sessionStorage.setItem("name", data.data[0].NAME);
            sessionStorage.setItem("email", data.data[0].IDUSER);
            sessionStorage.setItem("role", data.data[0].ROLE);
          })

          // mobile server end here
            sessionStorage.setItem("isAuthenticated", false);
            console.log("Error:", error);
            setError({
              password:
                "Please enter the correct USERNAME PASSWORD combination.",
            });
          });
      } else {
        axios
          .post("http://localhost:4000/signup", user)
          .then((res) => {
            sessionStorage.setItem("isAuthenticated", true);
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("email", user.email);
            navigate(`/${user.email}`)
          })
          .catch((error) => {
            sessionStorage.setItem("isAuthenticated", false);
            console.log("Error:", error);
          });
      }
    } else alert("Please enter valid input");
  };

  const handleCheckBox = useCallback(
    (event) => setCheckBox(event.target.checked),
    [checkBox, setCheckBox]
  );

  return (
    <div className="login-div container-fluid">
      <p className="h1 mt-3" style={{ alignContent: "center" }}>
        Please Sign In
      </p>
      <form onSubmit={handleSubmit}>
        {signin && (
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
        )}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            // aria-describedby="emailHelp"
            placeholder="Enter Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          {/* <div className="form-text invalid-feedback">{error.email}</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            {signin ? "New Psssword" : "Password"}
          </label>
          <input
            type={passwordInputType ? "text" : "password"}
            className={`form-control ${error.password ? "is-invalid" : ""}`}
            id="exampleInputPassword1"
            aria-describedby="emailHelp"
            placeholder="Enter password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <Icon
            inputType={passwordInputType}
            setInputType={setPasswordInputType}
          />

          <div id="passwordHelp" className="form-text invalid-feedback">
            {error.password}
          </div>
          {!signin && (
            <div id="emailHelp">
              <NavLink to="/forgotpassword">Forgot Password? </NavLink>
            </div>
          )}
        </div>
        {signin && (
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type={cpasswordInputType ? "text" : "password"}
              className={`form-control ${
                error.confirmPassword ? "is-invalid" : ""
              }`}
              id="exampleInputPassword2"
              aria-describedby="emailHelp"
              placeholder="Enter password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Icon
              inputType={cpasswordInputType}
              setInputType={setCPasswordInputType}
            />

            <div id="passwordHelp" className="form-text invalid-feedback">
              {error.confirmPassword}
            </div>
          </div>
        )}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={checkBox}
            onChange={handleCheckBox}
            required={signin ? true : false}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            {signin ? "Aceept all the terms and organization" : "Remember me"}
          </label>
        </div>
        <div className="container signup-div">
          <button type="submit" className="btn btn-primary btn-lg my-3">
            {signin ? "SIgnUP" : "Login"}
          </button>

          <p className="fst-normal" style={{ margin: "40px 0px 0px 20px" }}>
            {signin ? "Already a user?" : "New User"}
          </p>
          <NavLink
            to={signin ? "/login" : "/signup"}
            style={{
              display: "flex",
              alignItems: "end",
              marginBottom: "1rem",
              textDecoration: "none",
            }}
          >
            <button className="btn btn-warning">
              {signin ? "Login" : "SignUp"}
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
