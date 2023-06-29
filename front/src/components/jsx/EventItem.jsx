import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AlarmIcon from "@mui/icons-material/Alarm";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

const EventItem = ({ id, title, date, deleteItem }) => {
  const deleteThisItem = () => deleteItem(id);
  return (
    <div>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={deleteThisItem}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <AlarmIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={date} />
      </ListItem>
      <Divider />
    </div>
  );
};

export default Event;
