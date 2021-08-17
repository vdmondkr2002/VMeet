import React,{useState} from "react";
import {
  Drawer,
  IconButton,
  List,
  Divider,
  Chip,
  Typography,
  Input,
  Button
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector,useDispatch} from "react-redux";
import moment from "moment";
import { SET_MESSAGE_DATA } from "../../../constants/actions"
import useStyles from "./styles";

const Chat = ({ open, setDrawerOpen ,sendMessage , username}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const messageData = useSelector((state) => state.messageData);
  
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMessage = (e) =>{
    dispatch({type:SET_MESSAGE_DATA,payload :{message : e.target.value,sender:username}});
    setTimeout(() => {
      console.log(messageData);
    },5000)
  }
  const submitMessage = () => {
      sendMessage();
  }
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
      <div>
          <Input placeholder="Message" onChange={e => handleMessage(e)} />
				  <Button variant="contained" color="primary" onCLick={submitMessage}>Send</Button>
      </div>
    </Drawer>
  );
};

export default Chat;
