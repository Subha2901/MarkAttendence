import React, { useState, useCallback, useEffect, useContext } from "react";
import "./UserDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { UserProfileContext } from "../App";

const UserDetails = () => {
  // const [width, setWidth] = useState(window.innerWidth);
  // const location = useLocation();
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  var dates = JSON.parse(sessionStorage.getItem("attendenceDatesArr")) || [];
  var timeRangeArr = JSON.parse(sessionStorage.getItem("timeRangeArr")) || [];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  // const checked = location.state && location.state.checked
  // const [valueLength, setValueLength] = useState(value.length);
  const [timeRange, setTimeRange] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const { setLoading } = useContext(UserProfileContext);

  if (sessionStorage.length === 0 && localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      sessionStorage.setItem(key, value);
    }
  }

  // useEffect(() => {
  //   setIndex(index + 1);
  // }, [sessionStorage.getItem("attendenceDatesArr")]);

  // useEffect(() =>{
  //   console.log(name);
  //   setName(sessionStorage.getItem('name'))
  // }, [location])

  // useEffect(() => {
  //   document.title = `MarkAttendence - ${name}`;
  // }, [name])

  useEffect(() => {
    document.title = `MarkAttendence - ${name}`;
    setLoading(name);

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      if (localStorage.length !== 0) {
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          const value = sessionStorage.getItem(key);
          localStorage.setItem(key, value);
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const format = "HH:mm";

  const handleCancelPopup = useCallback(() => {
    setValue(value.slice(0, -1));
    setOpen(false);
  }, [value]);

  // useEffect(() => console.log("TImeRange -> ", timeRange), [timeRange]);

  const onChange = useCallback(
    (val) => {
      if (val.length > value.length) setOpen(true);
      else {
        let l = value.length;
        var tempTimeRange = [...timeRange];
        alert("TempTimeRange -> " + tempTimeRange);
        for (let i = 0; i < l; i++) {
          console.log("Loop Started");
          if (value[i] !== val[i]) {
            tempTimeRange.splice(i, 1);
            // alert(i);
            // alert("Timerange 1-> " + tempTimeRange);
            setTimeRange(tempTimeRange);
            break;
          }
          if (value[l - 1 - i] !== val[l - 2 - i]) {
            tempTimeRange.splice(l - 1 - i, 1);
            // alert(l - 1 - i);
            // alert("TimeRange 2 -> " + tempTimeRange);
            setTimeRange(tempTimeRange);
            break;
          }
        }
      }
      setValue(val);
    },
    [value, setValue, timeRange]
  );

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
          sessionStorage.setItem("attendenceDatesArr", JSON.stringify(dates)),
          sessionStorage.setItem("timeRangeArr", JSON.stringify(timeRangeArr)),
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

  const isDisabled = useCallback(
    (date) => {
      for (let i = 0; i < dates.length; i++)
        if (new Date(dates[i]).getTime() == date.getTime()) return true;

      if (date.getDay() === 6 || date.getDay() === 0) return true;
      const today = new Date();
      if (date.getTime() > today.getTime()) {
        return true;
      }
    },
    [dates]
  );

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="outer-box container-fluid">
          <div className="calender container-fluid">
            <div className="d-flex flex-row desktop-view">
              <Attendence_list setIndex={setIndex} index={index} />
              <Calendar
                key={index}
                isDisabled={isDisabled}
                isHighlight={isHighlight}
                useDarkMode
                isMultiSelector
                size={420}
                fontSize={18}
                value={value}
                onChange={onChange}
              />
              <div style={{ paddingLeft: "25px" }}>
                <NewMarkedList value={value} timeRange={timeRange} />
              </div>
            </div>

            {/* mobile structure start */}

            <div className="d-flex flex-column mobile-view">
              <Calendar
                key={index}
                isDisabled={isDisabled}
                isHighlight={isHighlight}
                useDarkMode
                isMultiSelector
                size={420}
                fontSize={18}
                value={value}
                onChange={onChange}
              />
              <div className="d-flex flex-row">
                <NewMarkedList value={value} timeRange={timeRange} />
                <Attendence_list setIndex={setIndex} index={index} />
              </div>
            </div>

            {/* mobile structure end */}
          </div>
          <div className="container submit_div">
            <button
              className="btn btn-lg btn-danger"
              onClick={handleSubmit}
              style={{ zIndex: "200", position: "sticky" }}
            >
              Submit
            </button>
          </div>
        </div>

        {/* <-- TimePpoup --> */}
        <Dialog
          open={open}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              console.log(
                event.target[0].value.length,
                event.target[1].value.length
              );

              if (
                !event.target[0].value.length &&
                !event.target[1].value.length
              ) {
                return;
              }
              setTimeRange([
                ...timeRange,
                [event.target[0].value, event.target[1].value],
              ]);
              setOpen(false);
            },
          }}
        >
          <DialogTitle>Select the duration of attendence: </DialogTitle>
          <DialogContent>
            <TimePicker.RangePicker
              status="error"
              variant="filled"
              format={format}
              changeOnScroll
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelPopup}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
        {/* <-- TimePopup --> */}
      </div>
    </>
  );
};

export default UserDetails;
