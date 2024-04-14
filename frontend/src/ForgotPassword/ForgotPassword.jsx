import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Login.css";
import Icon from "../Icon";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [otp, setOtp] = useState("");
  const [inputType, setInputType] = useState(false);

  useEffect(() => {
    if (hasError) setHasError(false);
    if (checked) setChecked(false);
    setOtp("");
  }, [email]);

  useEffect(() => {
    if(hasError)  setHasError(false)
  }, [otp])

  function handleSubmit(event) {
    event.preventDefault();
    if (!checked) {
      axios
        .post("http://localhost:4000/emailcheck", { email: email })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setHasError(false);
            setError("");
            setChecked(true);
          } else {
            setHasError(true);
            setError(
              "This email is not registered with us. Please first register this email."
            );
            setChecked(false);
          }
        })
        .catch((err) => {
          if (err.status === 404) {
            setHasError(true);
            setError(
              "There is server connection issue. Please try to submit again."
            );
            setChecked(false);
          } else {
            console.log("Not registered");
            setHasError(true);
            setError(
              "This email is not registered with us. Please first register this email."
            );
            setChecked(false);
          }
        });
    } else {
      axios
        .post("https://localhost:4000/otpcheck", { otp: otp })
        .then((res) => {
          if (res.status === 200) {
            setHasError(false);
            setError("");
          } else {
            setHasError(true);
            setError("Please enter correct OTP.");
          }
        })
        .catch((err) => {
          setHasError(true);
          setError("Please enter the correct otp and try again.");
        });
    }
  }

  function handleOtp(event) {
    setOtp(event.target.value.replace(/\D/g, ""));
  }

  return (
    <>
      <div className="login-div container bg-gradient">
        <p className="h1 mt-3" style={{ alignContent: "center" }}>
          Forgot password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${
                !checked && hasError ? "is-invalid" : ""
              }`}
              id="exampleInputEmail1"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-text invalid-feedback">{error}</div>
          </div>
          {checked && (
            <div className="mb-3">
              <label htmlFor="exampleInputOtp" className="form-label">
                OTP
              </label>
              <input
                type={inputType ? "text" : "password"}
                className={`form-control ${
                  checked && hasError ? "is-invalid" : ""
                }`}
                id="exampleInputOtp"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleOtp}
                minLength="6"
                maxLength="6"
              />
              <div className="form-text invalid-feedback">{error}</div>
              <Icon inputType={inputType} setInputType={setInputType} />
            </div>
          )}
          <div className="container signup-div">
            <button type="submit" className="btn btn-primary btn-lg my-3">
              Continue
            </button>

            <p className="fst-normal" style={{ margin: "40px 0px 0px 20px" }}>
              Remember the password?
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
    </>
  );
};

export default ForgotPassword;
