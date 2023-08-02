import React, { useState, forwardRef } from "react";
import EventItem from "./EventItem";
import List from "@mui/material/List";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";
import "../css/ListEvents.css";

export default function ListEvents(props) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const handleCloseDecline = () => {
    setOpen(false);
  };

  const openDialog = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const deleteItem = () => {
    setOpen(false);

    const eventData = {
      ID: deleteId,
      headers: { Authorization: `Bearer ${props.accessToken}` },
    };

    Axios.delete(props.URLdeleteEvent, eventData)
      .then((response) => {
        console.log(response.status, response.data);
        if (response.status == 202) {
          //navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        Axios.post(props.URLrefresh, props.refreshToken)
          .then((response) => {
            console.log(response.status, response.data);
            if (response.status == 202) {
              props.settingAccessToken(response.accessToken);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });

    props.settingOffset(0);
    //props.setList(props.list.filter((item) => item.id != deleteId));
    Axios.get(
      props.URLgetFiveEvents +
        "?limit=" +
        props.limit +
        "&offset=" +
        props.offset
    )
      .then((response) => {
        console.log(response.status, response.data);
        if (response.status == 202) {
          props.setList(response.newList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="div-list-card">
        <div className="div-list">
          <div className="div-list-header">
            <h1>Events</h1>
            <div className="new-event">
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={() => {
                  props.changeStates(true, false);
                }}
              >
                <EditIcon />
              </Fab>
            </div>
          </div>
          <List
            sx={{
              width: 400,
              minHeight: 0,
              padding: 0,
              bgcolor: "background.paper",
            }}
          >
            {props.list.map((item) => (
              <EventItem
                sx={{ padding: 100 }}
                key={item.id}
                id={item.id}
                title={item.title}
                //date={item.date + ", " + item.time + "h"}
                date={item.date}
                deleteItem={openDialog}
              />
            ))}
          </List>
          <div className="buttons">
            <div className="left-button">
              <IconButton
                aria-label="left"
                size="large"
                className="arrow-button"
                onClick={() => {
                  if (props.offset > 0) props.settingOffset(props.offset - 1);
                  Axios.get(
                    props.URLgetFiveEvents +
                      "?limit=" +
                      props.limit +
                      "&offset=" +
                      props.offset
                  )
                    .then((response) => {
                      console.log(response.status, response.data);
                      if (response.status == 202) {
                        props.setList(response.newList);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                <ArrowCircleLeftIcon sx={{ fontSize: 65, color: blue[800] }} />
              </IconButton>
            </div>
            <div className="right-button">
              <IconButton
                aria-label="right"
                size="large"
                className="arrow-button"
                onClick={() => {
                  props.settingOffset(props.offset + 1);
                  Axios.get(
                    props.URLgetFiveEvents +
                      "?limit=" +
                      props.limit +
                      "&offset=" +
                      props.offset
                  )
                    .then((response) => {
                      console.log(response.status, response.data);
                      if (response.status == 202) {
                        if (response.newList == null)
                          props.settingOffset(props.offset - 1);
                        props.setList(response.newList);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                <ArrowCircleRightIcon sx={{ fontSize: 65, color: blue[800] }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleCloseDecline}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete event? Event will be deleted
            permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDecline}>Decline</Button>
          <Button onClick={deleteItem} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
