import React, { useCallback, useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "antd";
import "./Attendence_list.css";
// import "./Attendence_list.sass";
// import { Tooltip } from "react-tooltip";
import axios from "axios";
import { CustomScroll } from "react-custom-scroll";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import approvedIcon from "../Images/check-mark.png";
import rejectIcon from "../Images/Reject_icon.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MoreOptions from "../MoreOptions/MoreOptions.jsx";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AlertModal from "../AlertModal.jsx";

const ITEM_HEIGHT = 48;

export default function Attendence_list(props) {
  const alertRef = useRef(null);
  // const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [tempIndex, setTempIndex] = useState();
  const role = sessionStorage.getItem("role");
  const [type, settype] = React.useState("All");
  const [selectedOption, setSelectedOption] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [statusArr, setStatusArr] = useState(
    JSON.parse(sessionStorage.getItem("status")) || []
  );
  const [approveToken, setApproveToken] = useState(false);
  const [rejectToken, setRejectToken] = useState(false);
  const [deleteToken, setDeleteToken] = useState(false);
  const moreAdminOptions = [
    "Select All",
    "Select None",
    "Approve All",
    "Reject All",
    "Delete All",
  ];
  const moreOptions = [
    "Select All",
    "Select None",
    "Delete All",
  ];

  useEffect(() => {
    if (selectedIndex.length === 0) setShow(false);
    else setShow(true);

    if (
      selectedIndex.length !== 0 &&
      !selectedIndex
        .map((item) => item.index)
        .filter(
          (item) => statusArr[item] == "approve" || statusArr[item] == "reject"
        ).length
    ) {
      setApproveToken(true);
      setRejectToken(true);
    } else {
      setApproveToken(false);
      setRejectToken(false);
    }

    if (
      selectedIndex.length !== 0 &&
      !selectedIndex
        .map((item) => item.index)
        .filter((item) => statusArr[item] == "approve").length
    ) {
      setDeleteToken(true);
    } else setDeleteToken(false);
  }, [selectedIndex, setSelectedIndex]);

  const handleChange = (event) => {
    settype(event.target.value);
  };

  var markedDates =
    JSON.parse(sessionStorage.getItem("attendenceDatesArr")) || [];

  useEffect(() => {
    if (markedDates.length > statusArr.length) {
      let updatedArr = [...statusArr];
      for (let i = statusArr.length; i < markedDates.length; i++) {
        updatedArr[i] = "pending";
      }

      setStatusArr([...updatedArr]);
    }
  }, [markedDates]);

  var timeRangeArr = JSON.parse(sessionStorage.getItem("timeRangeArr")) || [];

  const options = { day: "2-digit", month: "long", year: "numeric" };
  const handleEdit = useCallback(
    (index) => {
      setTempIndex(index);
      setOpen(true);
    },
    [tempIndex, setTempIndex]
  );

  const handleIconClick = useCallback((index, type) => {
    setSelectedIndex({
      index: index,
      date: markedDates[index],
    });

    if (type == "approve") handleApprove();
    else if (type == "reject") handleReject();
    else if (type == "delete") handleDelete();
  });

  const handleApprove = useCallback(() => {
    if (!approveToken) {
      document.getElementById("ApproveModalLauncher").click();
    } else {
      axios
        .post("http://localhost:4000/approve", {
          email: sessionStorage.getItem("email"),
          date: selectedIndex.map((item) => item.date),
        })
        .then((res) => {
          if (res.status == "200") {
            setSelectedIndex([]);
            let updatedArr = [...statusArr];
            selectedIndex.map((item) => (updatedArr[item.index] = "approve"));
            // updatedArr[index] = "approve";
            setStatusArr(updatedArr);
            console.log("Attendence Approved");
          } else alert("Server Error, please try to approve again");
        });
    }
  });

  const handleReject = useCallback(() => {
    if (!rejectToken) {
      document.getElementById("RejectModalLauncher").click();
    } else {
      axios
        .post("http://localhost:4000/reject", {
          email: sessionStorage.getItem("email"),
          date: selectedIndex.map((item) => item.date),
        })
        .then((res) => {
          if (res.status == "200") {
            setSelectedIndex([]);
            const updatedArr = [...statusArr];
            selectedIndex.map((item) => (updatedArr[item.index] = "reject"));
            setStatusArr(updatedArr);
            console.log("Attendence Rejected");
          } else alert("Server Error, please try to approve again");
        });
    }
  });

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

  const handleDelete = useCallback(() => {
    if (!deleteToken) {
      document.getElementById("DeleteModalLauncher").click();
    } else {
      axios
        .post("http://localhost:4000/delete", {
          email: sessionStorage.getItem("email"),
          date: selectedIndex.map((item) => item.date),
        })
        .then((res) => {
          if (res.status === 200) {
            setSelectedIndex([]);
            props.setIndex(props.index + selectedIndex.length);
            // timeRangeArr.splice(index, 1);
            // markedDates.splice(index, 1);

            selectedIndex
              .sort((a, b) => b.index - a.index) // Sort by index in descending order
              .map((item) => {
                markedDates.splice(item.index, 1);
                timeRangeArr.splice(item.index, 1);
              });

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
    }
  }, [tempIndex, timeRangeArr, markedDates]);

  const format = "HH:mm";

  function handleClick(index) {
    if (selectedIndex.find((item) => item.index === index)) {
      setSelectedIndex(selectedIndex.filter((value) => value.index != index));
    } else {
      setSelectedIndex([
        ...selectedIndex,
        {
          index: index,
          date: markedDates[index],
        },
      ]);
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openOptions = Boolean(anchorEl);

  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) {
      setSelectedOption(option); // Set the selected option
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (selectedOption === "Select All") {
      let newDates = [];
      for (let index = 0; index < markedDates.length; index++) {
        newDates[index] = { index: index, date: markedDates[index] };
      }
      setSelectedIndex(newDates);
    }

    if (selectedOption === "Select None") setSelectedIndex([]);
    if (selectedOption === "Approve All") handleApprove();
    if (selectedOption === "Reject All") handleReject();
    if (selectedOption === "Delete All") handleDelete();
  }, [selectedOption, setSelectedOption]);

  return (
    <div
      className="container attendence_div"
      style={{ maxHeight: "420px", width: "250px", margin: '5px' }}
    >
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        style={{
          marginBottom: "10%",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <InputLabel id="demo-select-small-label" style={{ color: "white" }}>
            Type
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={type}
            label="Type"
            onChange={handleChange}
            style={{ color: "white" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approve">Approved</MenuItem>
            <MenuItem value="reject">Rejected</MenuItem>
          </Select>
        </div>

        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={openOptions ? "long-menu" : undefined}
          aria-expanded={openOptions ? "true" : undefined}
          aria-haspopup="true"
          className="MoreOptionIcon"
          onClick={handleClickOptions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={openOptions}
          onClose={() => handleClose(null)} // Close without selecting any option
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {role !== 'admin' && (moreOptions.map((option) => (
            <MenuItem key={option} onClick={() => handleClose(option)}>
              {option}
            </MenuItem>
          )))}
          {role == 'admin' && (moreAdminOptions.map((option) => (
            <MenuItem key={option} onClick={() => handleClose(option)}>
              {option}
            </MenuItem>
          )))}
        </Menu>
        {/* {selectedOption && <p>Selected Option: {selectedOption}</p>} */}

        {/* <MoreOptions selectedOption = {selectedDates} setSelectedOption={setSelectedDates}/> */}
      </FormControl>

      <CustomScroll heightRelativeToParent="calc(100% - 20px)" allowOuterScroll>
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
          {markedDates.map(
            (date, index) =>
              (type == "All" || statusArr[index] == type) && (
                <li
                  key={index}
                  className={!show ? "fade-in" : "fade-out"}
                >
                  {show && (
                    <input
                      type="checkbox"
                      checked={selectedIndex.find(
                        (item) => item.index == index
                      )}
                      onChange={() => handleClick(index)}
                      style={{ cursor: "pointer" }}
                      className={show ? 'fade-in' : 'fade-out'}
                    />
                  )}
                  <div
                    onClick={() => handleClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      style={{
                        color: `${
                          statusArr[index] == "approve"
                            ? "green"
                            : statusArr[index] == "reject" && "red"
                        }`,
                      }}
                    >
                      {new Date(date).toLocaleDateString("en-GB", options)}
                    </span>
                    <br />
                    <small>
                      {timeRangeArr && timeRangeArr[index] && (
                        <>
                          {timeRangeArr[index][0]} - {timeRangeArr[index][1]}
                        </>
                      )}
                    </small>
                  </div>
                  {statusArr[index] == "pending" && (
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
                      onClick={() => handleEdit(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pen-fill list_edit"
                        viewBox="0 0 16 16"
                      >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                      </svg>
                    </Tooltip>
                  )}
                  {statusArr[index] != "approve" && (
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
                        onClick={() => handleIconClick(index, 'delete')}
                      >
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-6.6 5.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293z" />
                      </svg>
                    </Tooltip>
                  )}
                  {role == "admin" && statusArr[index] != "approve" && (
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      title="Approve"
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
                      <img
                        src={approvedIcon}
                        width="20"
                        height="20"
                        alt="Approved Icon"
                        className="list_edit approve_icon"
                        onClick={() => handleIconClick(index, 'approve')}
                      />
                    </Tooltip>
                  )}
                  {role == "admin" && statusArr[index] != "reject" && (
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      title="Reject"
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
                      <img
                        src={rejectIcon}
                        width="20"
                        height="20"
                        alt="Rejected Icon"
                        className="list_edit approve_icon"
                        onClick={() => handleIconClick(index, 'reject')}
                      />
                    </Tooltip>
                  )}
                </li>
              )
          )}
        </ol>
      </CustomScroll>

      <AlertModal />

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
