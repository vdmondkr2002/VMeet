import React from "react";
import {
  makeStyles,
  Button,
  Dialog,
  Typography,
  IconButton,
  withStyles,
  Box
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  small: {
    textTransform: "none",
    color: "black",
  },
}));

const DialogTitle = (props) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const MeetDialog = ({ open, setOpen, code }) => {
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Here's is the link to your meeting:
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Copy this link or code and send it to people you want to have a meet with.
            Be sure to save it, so that you can use it later to:
          </Typography>
          <Typography>Copy this Code:</Typography>
          <CopyToClipboard text={`${code}`}>
            <Button
              variant="contained"
              fullWidth
              endIcon={<AssignmentOutlinedIcon fontSize="large" />}
            >
              <Typography variant="body1" className={classes.small}>
                {code}
              </Typography>
            </Button>
          </CopyToClipboard>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">OR</Typography>
          </Box>
          
          <Typography>Copy this Link:</Typography>
          <CopyToClipboard text={`http://localhost:3000/${code}`}>
            <Button
              variant="contained"
              fullWidth
              endIcon={<AssignmentOutlinedIcon fontSize="large" />}
            >
              <Typography variant="body1" className={classes.small}>
                http://localhost:3000/{code}
              </Typography>
            </Button>
          </CopyToClipboard>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetDialog;
