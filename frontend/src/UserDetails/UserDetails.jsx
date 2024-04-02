import React, { useState, useCallback, useEffect } from "react";
import "./UserDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
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
import NewMarkedList from "../NewMarkedList/NewMarkedList";

const UserDetails = () => {
  // const [width, setWidth] = useState(window.innerWidth);
  // const location = useLocation();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  var dates = JSON.parse(localStorage.getItem("attendenceDatesArr")) || [];
  var timeRangeArr = JSON.parse(localStorage.getItem("timeRangeArr")) || [];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [valueLength, setValueLength] = useState(value.length);
  const [timeRange, setTimeRange] = useState([]);
  const navigate = useNavigate();

  const format = "HH:mm";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancelPopup = useCallback(() => {
    setValue(value.slice(0, -1));
    setOpen(false);
  }, [value]);

  const handleSubmitPopup = useCallback(() => {
    setOpen(false);
  }, []);

  // const updateTimeRange = useCallback((val) => {
  //   let l = value.length;
  //   var tempTimeRange = [...timeRange];
  //   alert('TempTimeRange -> '+ tempTimeRange);
  //   for (let i = 0; i < l; i++) {
  //     console.log('Loop Started');
  //     // console.log(val, value);
  //     // console.log(val[i], value[i]);
  //     // console.log(tempTimeRange);
  //     if (value[i] !== val[i]) {
  //       tempTimeRange.splice(i,1);
  //       alert(i)
  //       alert('Timerange 1-> '+ tempTimeRange);
  //       setTimeRange(tempTimeRange)
  //       break;
  //     }
  //     if (value[l - 1 - i] !== val[l - 2 - i]) {
  //       tempTimeRange.splice(l-1-i,1);
  //       alert(l-1-i)
  //       alert('TimeRange 2 -> '+ tempTimeRange);
  //       setTimeRange(tempTimeRange)
  //       break;
  //     }
  //   }
  // }, [timeRange])

  useEffect(() => console.log("TImeRange -> ", timeRange), [timeRange]);

  const onChange = useCallback(
    (val) => {
      if (val.length > value.length) setOpen(true);
      else {
        let l = value.length;
        var tempTimeRange = [...timeRange];
        alert("TempTimeRange -> " + tempTimeRange);
        for (let i = 0; i < l; i++) {
          console.log("Loop Started");
          // console.log(val, value);
          // console.log(val[i], value[i]);
          // console.log(tempTimeRange);
          if (value[i] !== val[i]) {
            tempTimeRange.splice(i, 1);
            alert(i);
            alert("Timerange 1-> " + tempTimeRange);
            setTimeRange(tempTimeRange);
            break;
          }
          if (value[l - 1 - i] !== val[l - 2 - i]) {
            tempTimeRange.splice(l - 1 - i, 1);
            alert(l - 1 - i);
            alert("TimeRange 2 -> " + tempTimeRange);
            setTimeRange(tempTimeRange);
            break;
          }
        }
      }
      setValue(val);
    },
    [value, setValue, timeRange]
  );

  // useEffect(() => {
  //   console.log(valueLength);
  //   if (valueLength < value.length) {
  //     setValueLength(value.length);
  //     console.log("New Date is Clicked");
  //     handleClickOpen();
  //   } else setValueLength(value.length);
  // }, [value]);

  // console.log("Value", value);
  // console.log("Dates -> ", dates);

  const handleSubmit = function (event) {
    axios
      .post("http://localhost:4000/attendence", {
        value: value,
        email: email,
        timeRange: timeRange,
      })
      .then((res) => {
        console.log(res);
        for (let i = 0; i < value.length; i++) {
          dates.push(new Date(value[i]));
        }
        timeRangeArr = [...timeRangeArr, ...timeRange];

        Promise.all([
          localStorage.setItem("attendenceDatesArr", JSON.stringify(dates)),
          localStorage.setItem("timeRangeArr", JSON.stringify(timeRangeArr)),
        ]).then(() => {
          setValue([]);
          setTimeRange([]);
        });
      })
      .catch((error) => console.log(error));
  };

  const isHighlight = useCallback(
    (date) => {
      for (let i = 0; i < dates.length; i++)
        if (new Date(dates[i]).getTime() == date.getTime()) return true;
    },
    [dates]
  );

  const handleChange = (time, timeString) => {
    setTimeRange([...timeRange, timeString]);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid" style={{ textAlign: "center" }}>
        <div className="outer-box bg-gradient p-3">
          <div className="calender" style={{ padding: "40px 0px" }}>
            <div className="container header-div">
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
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>

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
              <NewMarkedList value={value} timeRange={timeRange} />
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
