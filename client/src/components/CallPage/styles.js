import { makeStyles } from "@material-ui/core";
const drawerWidth = 380;

const useStyles = makeStyles((theme) => ({
  main: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
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
    height: "90vh",
    flexGrow: 1,
    margin: "auto",
    // padding: theme.spacing(3),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    height: "90vh",
    width: `calc(100% - ${drawerWidth}px)`,
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
