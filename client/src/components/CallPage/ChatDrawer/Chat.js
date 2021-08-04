import React from "react";
import {
  Drawer,
  IconButton,
  List,
  Divider,
  Chip,
  Typography,
  Paper,
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
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Paper className={classes.innerPaper}>
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
          {/* {chatData.map((text, index) => (
            <ListItem button key={text.name}>
              <ListItemIcon>
                <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                    {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                </Avatar></ListItemIcon>
              <ListItemText primary={text.name} />
              <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                      {text.micOn?<MicNoneSharpIcon/>:<MicOffOutlinedIcon/>}
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                      {text.videoOn?<VideocamIcon/>:<VideocamOffIcon/>}
                  </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))} */}
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
      </Paper>
    </Drawer>
  );
};

export default Chat;
