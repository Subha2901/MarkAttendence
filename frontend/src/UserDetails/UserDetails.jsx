import React, { useState, useCallback, useEffect } from "react";
import "./UserDetails.css";
import { useLocation } from "react-router-dom";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import axios from "axios";
import Attendence_list from "../Attendence_list/Attendence_list";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "antd";

const UserDetails = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();
  const name = location.state && location.state.name;
  const email = location.state && location.state.email;
  var dates = location.state && location.state.dates;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [valueLength, setValueLength] = useState(value.length);
  const [timeRange, setTimeRange] = useState([]);

  const format = "HH:mm";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancelPopup = useCallback(() => {
    setValue(value.slice(0,-1));
    setOpen(false);
  }, [value]);

  const handleSubmitPopup = useCallback(() => {
    setOpen(false);
  }, [])

  var markedDates = [];
  // const userEmail = useState(email);
  useEffect(() => {
    for (let i = 0; i < dates.length; i++) {
      markedDates[i] = new Date(dates[i].date);
    }
  }, [dates])
  

  console.log('Dates', dates);
  console.log('MarkedDates', markedDates);

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue]
  );

  useEffect(() => {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    console.log(valueLength);
    if (valueLength < value.length) {
      setValueLength(value.length);
      console.log("New Date is Clicked");
      handleClickOpen();
    }
    else  setValueLength(value.length);
    
  }, [value]);

  console.log('Value' , value);

  const handleSubmit = function (event) {
    axios
      .post("http://localhost:4000/attendence", { value: value, email: email, timeRange: timeRange })
      .then((res) => {
        console.log(res);
        dates = [...dates, value]
        setValue([]);
        setTimeRange([])
      })
      .catch((error) => console.log(error));
  };

  const isHighlight = useCallback((date) => {
    for (let i = 0; i < markedDates.length; i++)
      if (markedDates[i].getTime() == date.getTime()) return true;
  }, [dates]);

  function handleChange(time, timeString) {
    setTimeRange([...timeRange, timeString])
  }

  return (
    <>
      <div className="container-fluid" style={{ textAlign: "center" }}>
        <div className="outer-box bg-gradient p-3">
          <div className="calender" style={{ padding: "40px 0px" }}>
            <h1
              className="py-3"
              style={{
                fontSize: "30px",
                fontFamily: "cursive",
                fontWeight: "700",
                color: "white",
              }}
            >
              Hi {name}, Please mark your attendence
            </h1>
            <div className="d-flex flex-row">
              <Attendence_list />
              <Calendar
                isDisabled={isHighlight}
                isHighlight={isHighlight}
                useDarkMode
                isMultiSelector
                size={420}
                fontSize={18}
                value={value}
                onChange={onChange}
              />
              {/* <Attendence_list /> */}
            </div>
          </div>
          <button className="btn btn-lg btn-danger" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        {/* <-- TimePpoup --> */}
        <Dialog
          open={open}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleSubmitPopup();
            },
          }}
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <TimePicker.RangePicker
              onChange={handleChange}
              status="error"
              variant="filled"
              format={format}
              changeOnScroll
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelPopup}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>
        {/* <-- TimePopup --> */}
      </div>
    </>
  );
};

export default UserDetails;

// import React, { useState } from 'react';
// import './index.css';
// import { Space, TimePicker } from 'antd';
// import dayjs from 'dayjs';

//   function handleChange(timeString) {
//     console.log(timeString);
//   }

//   const format = "HH:mm"

// const App = () =>
//       <TimePicker.RangePicker
//         onChange={handleChange}
//         status="error"
//         variant="filled"
//         format={format}
//         changeOnScroll
//       />;
// export default App;
