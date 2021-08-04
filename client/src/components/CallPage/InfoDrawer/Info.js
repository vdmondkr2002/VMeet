import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Info = ({ open, setDrawerOpen }) => {
  const classes = useStyles();

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
        <Typography variant="h6">Meeting Details</Typography>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.subHeader}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid>
            <br />
            <Typography variant="subtitle1">Joining Info</Typography>
          </Grid>

          <Grid>
            <Typography variant="body1">{window.location.href}</Typography>
          </Grid>

          <Grid>
            <br />
            <CopyToClipboard text={`${window.location.href}`}>
              <Button color="primary" startIcon={<AssignmentOutlinedIcon />}>
                <Typography variant="caption">Copy Joining Info</Typography>
              </Button>
            </CopyToClipboard>{" "}
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};

export default Info;
