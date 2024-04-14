import React, { useCallback, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "antd";
import "./Attendence_list.sass";
import "./Attendence_list.css";
// import { Tooltip } from "react-tooltip";
import axios from "axios";
import { CustomScroll } from "react-custom-scroll";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

export default function Attendence_list(props) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [tempIndex, setTempIndex] = useState();

  var markedDates =
    JSON.parse(sessionStorage.getItem("attendenceDatesArr")) || [];
  // console.log("MarkedDates -> ", markedDates);

  var timeRangeArr = JSON.parse(sessionStorage.getItem("timeRangeArr")) || [];
  // console.log("TimeRangeArr", timeRangeArr);

  // Format the date
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const handleEdit = useCallback(
    (index) => {
      setTempIndex(index);
      setOpen(true);
    },
    [tempIndex, setTempIndex]
  );

  useEffect(() => {
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

  const handleDelete = useCallback(
    (index) => {
      console.log(index);
      setTempIndex(index);

      axios
        .post("http://localhost:4000/delete", {
          email: sessionStorage.getItem("email"),
          date: markedDates[index],
        })
        .then((res) => {
          if (res.status === 200) {
            props.setIndex(props.index + 1);
            timeRangeArr.splice(index, 1);
            markedDates.splice(index, 1);

            sessionStorage.setItem(
              "timeRangeArr",
              JSON.stringify(timeRangeArr)
            );
            sessionStorage.setItem(
              "attendenceDatesArr",
              JSON.stringify(markedDates)
            );
          } else console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [tempIndex, timeRangeArr, markedDates]
  );

  const format = "HH:mm";

  return (
    <div className="container" style={{ maxHeight: "420px", minWidth: '250px' }}>
      <CustomScroll heightRelativeToParent="calc(100% - 20px)">
        <ol
          className="style_1"
          style={{
            textAlign: "left",
            fontSize: "14px",
            fontWeight: "100",
            color: "#fff2f285",
            paddingLeft: "45px",
          }}
        >
          {markedDates.map((date, index) => (
            <li key={index}>
              <div>
                {new Date(date).toLocaleDateString("en-GB", options)}
                <br />
                <small>
                  {timeRangeArr && timeRangeArr[index] && (
                    <>
                      {timeRangeArr[index][0]} - {timeRangeArr[index][1]}
                    </>
                  )}
                </small>
              </div>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Edit"
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pen-fill list_edit"
                  viewBox="0 0 16 16"
                  onClick={() => handleEdit(index)}
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                </svg>
              </Tooltip>
              {/* <Tooltip className="tooltip" style={{ visibility: "visible" }}>
                Edit time duration
              </Tooltip> */}
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Delete"
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar2-x-fillt list_edit"
                  viewBox="0 0 16 16"
                  onClick={() => handleDelete(index)}
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-6.6 5.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293z" />
                </svg>
              </Tooltip>
            </li>
          ))}
        </ol>
      </CustomScroll>

      {/* <-- TimePpoup --> */}
      <Dialog
        open={open}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            console.log(event.target[0].value, event.target[1].value);

            axios
              .post("http://localhost:4000/edittime", {
                email: sessionStorage.getItem("email"),
                date: markedDates[tempIndex],
                timeRange: timeRangeArr[tempIndex],
              })
              .then((res) => {
                if (res.status === 200) {
                  timeRangeArr[tempIndex] = [
                    event.target[0].value,
                    event.target[1].value,
                  ];
                  console.log(timeRangeArr);
                  sessionStorage.setItem(
                    "timeRangeArr",
                    JSON.stringify(timeRangeArr)
                  );
                } else console.log(res);
              })
              .catch((error) => {
                console.log(error);
              });
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
      {/* <-- TimePopup --> */}
    </div>
  );
}
