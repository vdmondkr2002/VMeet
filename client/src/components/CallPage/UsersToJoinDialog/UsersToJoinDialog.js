import React from "react";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  withStyles,
  Avatar,
  ListItemText,
  ListItem,
  ListItemIcon,
  Box,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { useSelector, useDispatch } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { REMOVE_USERS_JOIN, SET_ADMITID } from "../../../constants/actions";

const UsersToJoinDialog = ({ open, setOpen }) => {
  const usersToJoin = useSelector((state) => state.usersToJoin);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdmit = () => {
    dispatch({
      type: SET_ADMITID,
      payload: { id: usersToJoin[0].id, allow: true },
    });
    setOpen(false);
    dispatch({ type: REMOVE_USERS_JOIN, payload: usersToJoin[0].id });
  };

  const handleDeny = () => {
    dispatch({
      type: SET_ADMITID,
      payload: { id: usersToJoin[0].id, allow: false },
    });
    setOpen(false);
    dispatch({ type: REMOVE_USERS_JOIN, payload: usersToJoin[0].id });
  };

  return (
    <div>
      {usersToJoin.length > 0 ? (
        <Dialog
          maxWidth="xs"
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title">
            <Typography variant="subtitle1">
              Someone wants to join this call
            </Typography>
          </DialogTitle>
          <DialogContent>
            <ListItem>
              <ListItemIcon>
                <Avatar
                  src={usersToJoin[0].profilePic}
                  alt={usersToJoin[0].name}
                >
                  {usersToJoin[0].name.charAt(0)}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={usersToJoin[0].name} />
            </ListItem>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeny} style={{ textTransform: "none" }}>
              <Typography variant="subtitle" color="primary" component="div">
                Deny Entry
              </Typography>
            </Button>
            <Button onClick={handleAdmit} style={{ textTransform: "none" }}>
              <Typography variant="subtitle" color="primary">
                Admit
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};

export default UsersToJoinDialog;
