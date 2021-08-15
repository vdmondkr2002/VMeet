import React from "react";
import {
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
  useTheme,
  Typography,
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
  const usersInCall = useSelector((state) => state.usersInCall);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
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
        {usersInCall.map(({ id, name, profilePic, videoOn }, index) => (
          <ListItem button key={id}>
            <ListItemIcon>
              <Avatar
                src={profilePic}
                className={clsx(classes.largeAvatar)}
                alt={name}
              >
                {name.charAt(0)}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
              {/* <IconButton edge="end" aria-label="delete">
                {text.micOn ? <MicNoneSharpIcon /> : <MicOffOutlinedIcon />}
              </IconButton> */}
              <IconButton edge="end" aria-label="delete" disableRipple>
                {videoOn ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default People;
