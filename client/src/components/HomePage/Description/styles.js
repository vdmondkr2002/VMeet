import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  left: {
    width: "70%",
    margin: "0 auto",
    "@media (max-width : 700px)": {
      width: "80%",
    },
  },

  right: {
    width: "50%",
    margin: "0 auto",
    "@media (max-width : 700px)": {
      width: "80%",
    },
  },

  YpQfNc: {
    fontFamily: '"Google Sans Display", Roboto, Arial, sans-serif',
    fontSize: "2.75rem",
    fontWeight: "400",
    letterSpacing: "0",
    lineHeight: "3.25rem",
    paddingBottom: "0.5em",
  },
  rH9mRb: {
    fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
    fontSize: "1.125rem",
    fontWeight: "400",
    letterSpacing: "0",
    lineHeight: "1.5rem",
    color: "var(--gm-color-caption, #5f6368)",
    maxWidth: "30rem",
    paddingBottom: "3em",
  },

  codeinput: {
    width: "100%",
    height: "50px",
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
    width: "100%",
    height: "50px",
    backgroundColor: "#00B4D8",
    "&:hover": {
      backgroundColor: "#F4943C",
    },
    color: "white",
  },
  newmeeting: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.5",
    letterSpacing: "0.05em",
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

  // root: {
  //   "& .MuiButtonBase-root": {
  //     height: "55px",
  //   },
  // },
  // codeinput: {
  //   margin: "0px 20px",
  //   "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       borderColor: "grey",
  //     },
  //     "&:hover fieldset": {
  //       borderColor: "BLACK",
  //     },
  //     "&.Mui-focused fieldset": {
  //       borderColor: "BLUE",
  //     },
  //   },
  // },
  // buttoncolor: {
  //   backgroundColor: "#e85a4f",
  //   "&:hover": {
  //     backgroundColor: "#e98074",
  //   },
  //   color: "white",
  // },
  // codearrow: {
  //   color: "green",
  // },
  // card: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   height: "auto",
  //   width: "25vw",
  //   "@media (max-width : 700px)": {
  //     height: "70vh",
  //     width: "100%",
  //   },
  // },
  // frontCard: {
  //   padding: "1rem 0rem 1rem 0rem",
  // },
  // img: {
  //   width: "100%",
  //   height: "100%",
  //   padding: "5px",
  //   borderRadius: "50%",
  //   objectFit: "cover",
  //   margin: "0 1rem 1rem 1rem",
  //   alignSelf: "center",
  //   textAlign: "center",
  //   lineHeight: "25rem",
  // },
  // main3: {
  //   padding: theme.spacing(12, 4),
  // },
  // monitor: {
  //   height: "auto",
  //   width: "80%",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  // },
}));
export default styles;
