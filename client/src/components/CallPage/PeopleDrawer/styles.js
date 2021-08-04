import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "25vw",
    flexShrink: 0,
    height: 800,
  },
  drawerPaper: {
    width: "25vw",
    height: "90vh",
    zIndex: -100,
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
    justifyContent: "flex-start",
  },
}));

export default useStyles;
