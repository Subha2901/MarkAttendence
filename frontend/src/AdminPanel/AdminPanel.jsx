import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
import { Link, useLocation } from "react-router-dom";
import { UserProfileContext } from "../App";

const AdminPanel = () => {
  const [userData, setUserData] = useState();
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const location = useLocation();
  const {setLoading} = useContext(UserProfileContext)

  // useEffect(() => {
  //   setName(sessionStorage.getItem("name"));
  // }, [location]);

  // useEffect(() => {
  //   document.title = `MarkAttendence - Admin`;
  // }, [name]);

  useEffect(() => {
    document.title = 'MarkAttendence - Admin'
    setLoading('Admin')
    axios
      .post("http://localhost:4000/alluser", { admin: true })
      .then((res) => {
        setUserData(res.data.data);
        console.log(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container-fluid admin-panel">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {userData &&
            userData.map((user, index) => (
              <div className="col" key={index}>
                <div className="container card">
                  <h5 className="card-header">{user.NAME}</h5>
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>Email: </strong>
                      {user.IDUSER}
                    </h5>
                    <p className="card-text">Last 7 days record</p>
                    <Link to={`http://localhost:3000/${user.IDUSER}`} >
                      Go somewhere
                    </Link>
                    {/* <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
