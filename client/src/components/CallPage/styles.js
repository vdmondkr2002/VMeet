import { makeStyles } from "@material-ui/core";
const drawerWidth = 380;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    maxHeight: "100vh",
    overflow: "hidden",
  },
  btn: {
    color: "white",
    backgroundColor: "#1a73e8",
    padding: "12px ",
    borderRadius: "30px",
    position: "absolute",
    top: "400px",
    right: "530px",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  myVid: {
    width: "400px",
    border: "5px solid rgb(26, 115, 232)",
    borderRadius: "20px",
    margin: "10px",
  },
  vidCont: {
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
  },
  usersCont: {
    height: "100%",
  },
  userPaper: {
    maxWidth: "100%",
    height: "100%",
    borderRadius: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    maxHeight: "100%",
    maxWidth: "100%",
    // height:"100&",
    borderRadius: "5%",
  },
  offvideo: {
    display: "none",
  },
  largeAvatar: {
    margin: "auto",
    width: "150px",
    height: "150px",
  },
  userCont: {
    position: "relative",
  },
  bottomline: {
    position: "absolute",
    left: "5%",
    bottom: "5%",
  },
  content: {
    height: "70vh",
    flexGrow: 1,
    margin: "auto",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    height: "80vh",

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    width: 0,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
}));

export default useStyles;
