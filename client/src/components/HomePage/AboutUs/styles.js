import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  main3: {
    padding: theme.spacing(12, 4),
  },

  image: {
    textAlign: "center",
    margin: theme.spacing(1, 0),
  },

  monitor: {
    height: "auto",
    width: "75%",
    margin: "auto",
    "@media (max-width : 700px)": {
      width: "100%",
    },
  },
}));
export default styles;
