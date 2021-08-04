import React from "react";
import { Drawer, IconButton, Typography, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Info = ({ open, setDrawerOpen }) => {
  const classes = useStyles();

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
      <div className={classes.drawerHeader}>
        <Typography variant="subtitle1">Meeting Details</Typography>
        <Button onClick={handleDrawerClose}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Button>
      </div>
    </Drawer>
  );
};

export default Info;
