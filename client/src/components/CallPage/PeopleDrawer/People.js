import React from "react";
import {
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  List,
  ListItemIcon,
  Divider,
  useTheme,
  Typography,
  Box,
  Paper,
  Avatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MicNoneSharpIcon from "@material-ui/icons/MicNoneSharp";
import MicOffOutlinedIcon from "@material-ui/icons/MicOffOutlined";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import clsx from "clsx";

const People = ({ open, setDrawerOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const peopleData = [
    { name: profile.name, micOn: user.micOn, videoOn: user.videoOn },
    { name: profile.name, micOn: user.micOn, videoOn: user.videoOn },
    { name: profile.name, micOn: user.micOn, videoOn: user.videoOn },
    { name: profile.name, micOn: user.micOn, videoOn: user.videoOn },
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
        <Typography variant="h6">People</Typography>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.subHeader}>
        <Typography variant="h6" component="p">
          In call
        </Typography>
      </div>
      <Divider />
      <List>
        {peopleData.map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Avatar
                src={profile?.profilePic}
                className={clsx(classes.largeAvatar)}
                alt={profile?.userName}
              >
                {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={text.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                {text.micOn ? <MicNoneSharpIcon /> : <MicOffOutlinedIcon />}
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                {text.videoOn ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default People;
