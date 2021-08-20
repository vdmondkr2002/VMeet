import { makeStyles } from "@material-ui/core";
const drawerWidth = 380;

const useStyles = makeStyles((theme) => ({
  joinMsg: {
    position: "absolute",
    borderRadius: "4px", 
    fontSize: "20px",
    fontWeight:"300",
    letterSpacing :"1.5px", 
    zIndex: "10",
     padding: "15px", 
     color: "white", 
     background: "#535353",
      top: "560px", 
      left: "4px"
  },
  fullScreenExit :
  {
    cursor:"pointer",
    position:"absolute",
    top:"610px",
    right:"10px",
    color:"white",
    fontSize:"40px"
  },
  fullScreenEnter :
  {
    cursor:"pointer",
    position:"absolute",
    top:"740px",
    right:"10px",
    color:"white",
    fontSize:"40px"
  },
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    maxHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#202124",
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

  vidCont: {
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
  },
  usersCont: {
    height: "100%",
  },
  userPaper: {
    display: "none",
    height: "40vh",
    borderRadius: "5%",
    position: "relative",
    borderRadius: "5px",
    zindex: "-100",
    display: "flex",
    margin: "0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  video: {
    height: "100%",
    width: "100%",
    position: "relative",
    borderRadius: "5px",
    maxHeight: "40vh",
    maxWidth: "25vw",
    zindex: "-100",
  },
  offvideo: {
    display: "none",
    height: "40vh",
    borderRadius: "5%",
    width: "25vw",
    position: "relative",
    borderRadius: "5px",
    zindex: "-100",
  },
  largeAvatar: {
    width: "20vmin",
    height: "20vmin",
  },
  userCont: {
    position: "relative",
  },
  bottomline: {
    textAlign: "left",
    position: "absolute",
    left: "0",
    margin: "auto auto 2% 5%",
    bottom: "0",
    zIndex: "1",
  },
  content: {
    textAlign: "center",
    height: "90vh",
    flexGrow: 1,
    padding: "15px 10px 0px 10px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    width: "76vw",
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
  muted: {
    color: "#fff",
    right: "10px",
    position: "absolute",
    top: "10px",
    height: "22px",
    width: "22px!important",
  },

  name: {
    color: "white",
    bottom: "10px",
    position: "absolute",
    left: "20px",
  },
}));

export default useStyles;
