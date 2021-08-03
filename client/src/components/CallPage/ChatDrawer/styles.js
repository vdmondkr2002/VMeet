import { makeStyles } from "@material-ui/core";
const drawerWidth = 380;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: 800,
  },
  drawerPaper: {
    width: drawerWidth,
    height: "90%",
  },
  innerPaper: {
    height: "99%",
    borderRadius: "40px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  subHeader: {
    display: "flex",

    alignItems: "center",
    padding: theme.spacing(1, 1),
    justifyContent: "center",
  },
  listIcon: {
    width: "100%",
    display: "flex",
    alignItems: "baseline",
  },
  msgCont: {
    padding: "0.6rem",
  },
  senderName: {
    fontWeight: "bold",
    color: "#000",
    paddingRight: "0.5rem",
  },
}));

export default useStyles;
