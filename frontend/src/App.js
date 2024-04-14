import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import "./App.css";
import UserDetails from "./UserDetails/UserDetails";
import AuthCheck from "./AuthCheck";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ChangePassword from "./ChangePassword";
import Navbar from "./Navbar/Navbar";

function App() {
  var signin = false

  useEffect(() => {
    if(signin) document.title = 'MarkAttendence - SignIn'
    else document.title = 'MarkAttendence - Login'
  }, [signin])

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login signin={false} />} />
          <Route path="/signup" element={<Login signin={true} />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<AuthCheck Component={UserDetails} />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
