import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    height: "auto",
    width: "auto",
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

export default useStyles;
