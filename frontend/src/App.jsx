import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import "./App.css";
import UserDetails from "./UserDetails/UserDetails";
import AuthCheck from "./AuthCheck";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ChangePassword from "./ChangePassword";
import Navbar from "./Navbar/Navbar";
import AboutUs from "./AboutUs/AboutUs";
import Footer from "./Footer/Footer";
import { CustomScroll } from "react-custom-scroll";
import UserProfile from "./UserProfile/UserProfile";

export const UserProfileContext = createContext(); 

function App() {
  var signin = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    
    <div className="container-fluid App">
      <UserProfileContext.Provider
        value={{ profileVisible, setProfileVisible, loading, setLoading }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login signin={false} />} />
            <Route path="/signup" element={<Login signin={true} />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/" element={<AuthCheck Component={UserProfile} />} />
            <Route path="/:username" element={<AuthCheck Component={UserProfile} />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
        <AboutUs />
      </UserProfileContext.Provider>
      <Footer />
    </div>
    
  );
}

export default App;
