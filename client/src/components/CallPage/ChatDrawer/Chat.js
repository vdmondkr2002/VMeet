import React from "react";
import {
  Drawer,
  IconButton,
  List,
  Divider,
  Chip,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import moment from "moment";
import useStyles from "./styles";

const Chat = ({ open, setDrawerOpen }) => {
  const classes = useStyles();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const chatData = [
    {
      senderName: profile.name,
      msgTime: moment(Date.now()).format(" h:mm a"),
      text: "Hello",
    },
    {
      senderName: profile.name,
      msgTime: moment(Date.now()).format(" h:mm a"),
      text: "Hii",
    },
    {
      senderName: profile.name,
      msgTime: moment(Date.now()).format(" h:mm a"),
      text: "Are u fine?",
    },
    {
      senderName: profile.name,
      msgTime: moment(Date.now()).format(" h:mm a"),
      text: "No i am not!!!",
    },
  ];
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h6">In Call Messages</Typography>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.subHeader}>
        <Chip label="Messages can only be seen by the people in this call" />
      </div>
      <Divider />
      <List>
        {chatData.map((msg, index) => (
          <div className={classes.msgCont} key={index}>
            <div className={classes.listIcon}>
              <Typography className={classes.senderName}>
                {msg.senderName}
              </Typography>
              <Typography variant="body2" className={classes.msgTime}>
                {msg.msgTime}
              </Typography>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Chat;
