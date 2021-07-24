import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    "& .MuiButtonBase-root": {
      height: "55px",
    },
  },

  codeinput: {
    margin: "0px 20px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "BLACK",
      },
      "&.Mui-focused fieldset": {
        borderColor: "BLUE",
      },
    },
  },

  buttoncolor: {
    backgroundColor: "#e85a4f",
    "&:hover": {
      backgroundColor: "#e98074",
    },
    color: "white",
  },

  codearrow: {
    color: "green",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "auto",
    width: "25vw",
    "@media (max-width : 700px)": {
      height: "70vh",
      width: "100%",
    },
  },
  frontCard: {
    padding: "1rem 0rem 1rem 0rem",
  },

  img: {
    width: "100%",
    height: "100%",
    padding: "5px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "0 1rem 1rem 1rem",
    alignSelf: "center",
    textAlign: "center",
    lineHeight: "25rem",
  },
}));
export default styles;
