import React, { useCallback, useEffect, useState } from "react";
import Validate from "./LoginValidation";
import Icon from "./Icon";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const [error, setError] = useState({});
  const [password, setPassword] = useState({});
  const [inputType, setInputType] = useState(false);
  const [newInputType, setNewInputType] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state && location.state.email
  const state = location.state && location.state.state

  useEffect(() => {
    document.title = 'MarkAttendence - Change Password'

    if(!state)
      navigate('/forgotpassword')
  }, [])

  const handleChange = useCallback(
    (event) => {
      setPassword({
        ...password,
        [event.target.name]: event.target.value,
      });
    },
    [password]
  );

  function handleSubmit(event) {
    event.preventDefault();
    if(state && email != null){
      axios.post('http://localhost:4000/changepassword', {email: email, password: password.password})
      .then(() => navigate('/login'))
      .catch(err => console.log(err))
    }
  }

  useEffect(
    () => {
      if (password.password != password.newPassword){
        setError({
          ...error,
          password: Validate(password),
        });
      }
      else  setError({...error, password: null})
    },
    [password.password]
  );
  useEffect(() => {
    if (password.password != password.newPassword){
      setError({
        ...error,
        newPassword: "Password and NewPassword is not same.",
      });
    }
    else  setError({...error, newPassword: null})
      
  }, [password.newPassword]);
  return (
    <>
      <div className="login-div container bg-gradient">
        <p className="h1 mt-3" style={{ alignContent: "center" }}>
          Change Password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              New Password
            </label>
            <input
              type={inputType ? "text" : "password"}
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              id="exampleInputPassword"
              placeholder="Enter password"
              name="password"
              value={password.password}
              onChange={handleChange}
              required
            />
            <Icon inputType={inputType} setInputType={setInputType} />

            <div id="passwordHelp" className="form-text invalid-feedback">
              {error.password}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type={newInputType ? "text" : "password"}
              className={`form-control ${error.newPassword ? "is-invalid" : ""}`}
              id="exampleInputPassword1"
              placeholder="Enter password"
              name="newPassword"
              value={password.newPassword}
              onChange={handleChange}
              required
            />
            <Icon inputType={newInputType} setInputType={setNewInputType} />

            <div id="passwordHelp" className="form-text invalid-feedback">
              {error.newPassword}
            </div>
          </div>

          <div className="container signup-div">
          <button type="submit" className="btn btn-primary btn-lg my-3">
            Change Password
          </button>
        </div>
        </form>
        
      </div>
    </>
  );
};

export default ChangePassword;
