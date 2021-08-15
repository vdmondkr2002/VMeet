import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#202124",
  },

  leftCont: {
    display: "flex",
    alignItems: "center",
  },

  midCont: {
    display: "flex",
    justifyContent: "center",
  },
  rightCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  mainPaper: {
    padding: "0.3em",
  },

  buttonOn: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    margin: "10px 5px",
    padding: "5px",
    backgroundColor: "#434649",
    "&:hover": {
      backgroundColor: "#434649",
      border: "0.1px solid white",
    },
  },

  buttonOff: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    margin: "10px 5px",
    padding: "5px",
    backgroundColor: "#EA5044",
    "&:hover": {
      backgroundColor: "#EA5044",
      border: "0.1px solid white",
    },
  },

  time: {
    fontWeight: "bold",
    color: "#ffffff",
  },
}));

export default useStyles;
