import { makeStyles } from "@material-ui/core";

const styles = makeStyles(() => ({
  footer: {
    position: "center",
    background: "#403C44",
  },

  image1: {
    width: "50%",
    margin: "0px 10px ",
    position: "centre",
  },

  link: {
    listStyleType: "none",
    textAlign: "center",
    paddingInlineStart: "0px",
    transition: "1s",
  },

  linkName: {
    color: "#E2F0F9",
    transition: "0.5s",
    "&:hover": {
      color: "#E2F0F9",
      textShadow: "0 0 5px #E2F0F9",
    },
  },

  name: {
    color: "#F4943C",
    "&:hover": {
      color: "#E2F0F9",
    },
  },

  touch: {
    fontSize: "25px",
    fontWeight: "bold",
    padding: "0 0 30px 0",
    "@media (max-width : 700px)": {
      padding: "10px 0 5px 0",
    },
  },

  Icon: {
    margin: "10px 10px 10px 10px",
    fontSize: "40px",
    transform: "scale(.9)",
    zIndex: "-1",
    color: "#eae7dc",
    transition: ".5s",
    "&:hover::before": {
      transform: "scale(1.1)",
    },

    "&:hover": {
      textShadow: "0 0 5px #eae7dc",
      transform: "scale(1.3)",
    },
    "@media (max-width : 700px)": {
      margin: "0px 10px 10px 10px",
    },
  },

  displayInline: {
    display: "inline",
  },
}));
export default styles;
