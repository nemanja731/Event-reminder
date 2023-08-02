import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "../css/CreateEvent.css";

export default function CreateEvent(props) {
  const URL = "http://localhost:9090";
  const URLaddEvent = URL + "/add-event";

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addEvent = () => {
    const userData = {
      username: username,
      password: password,
    };

    //const axios = require("axios");
    const token = "my_token";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("/api/users", config)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));

    Axios.post(URLaddEvent, userData)
      .then((response) => {
        console.log(response.data);
        // console.log(response.status, response.data);
        // console.log(response?.data);
        // console.log(response?.accessToken);
        // console.log(JSON.stringify(response));
        console.log(response.status, response.data);
        if (response.status == 200 && response.data.status === true) {
          setEmptyUsername(false);
          setEmptyPassword(false);
          setWrongUsername(false);
          setWrongPassword(false);
          setSuccess(true);
          navigate("/home");
          setUsername("");
          setPassword("");
        } else {
          setWrongUsername(true);
          setWrongPassword(true);
        }
      })
      .catch((error) => {});

    props.setList([
      ...props.list,
      {
        id: 6,
        title: title,
        date: date,
        time: time,
      },
    ]);
    props.changeStates(false, true);
  };

  return (
    <>
      <div className="div-card">
        <h1>New Event</h1>
        <div className="div-card-body">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="title-event"
          >
            <TextField
              required
              id="standard-required"
              label="Event Name"
              variant="standard"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer className="box" components={["DatePicker"]}>
              <DatePicker
                label="Choose date"
                className="picker"
                onChange={(date) => {
                  const dateString = new Date(date).toLocaleDateString();
                  setDate(dateString);
                }}
              />
            </DemoContainer>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="Choose time"
                className="picker"
                onChange={(newValue) => {
                  setTime(
                    newValue.toLocaleTimeString([], { timeStyle: "short" })
                  );
                }}
                ampm={false}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div className="delete-event">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                props.changeStates(false, true);
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </div>
          <div className="add-event">
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={addEvent}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
    </>
  );
}
