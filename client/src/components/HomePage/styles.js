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
}));
export default styles;
