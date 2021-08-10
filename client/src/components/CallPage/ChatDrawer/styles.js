import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "23vw",
    height: "86vh",
    padding: "10px",
    borderRadius: "7px",
    overflow: "hidden",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 1),
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
