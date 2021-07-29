import { makeStyles } from "@material-ui/core";
const styles = makeStyles((theme) => ({
  appBar: {
    background: "#03045e",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width : 900px)": {
      paddingLeft: 0,
    },
  },
  menuButton: {
    fontWeight: 700,
    marginLeft: "30px",
    color: "white !important",

    "&:hover": {
      borderBottom: "2px solid white",
      borderRadius: "0px !important",
      transform: "translateY(4px)",
    },
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "10px 10px",
    background: "#03045e",
    borderRadius: "5px",
    margin: "7px",
    fontWeigth: "500",
  },

  image1: {
    width: "100px",
    height: "60px",
    margin: "3px 5px 3px 15px",
    position: "centre",
    transition: ".5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "@media (max-width : 700px)": {
      width: "80px",
      height: "60px",
      margin: "2px",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    marginLeft: "15px",
  },
  midNavbar: {
    alignItems: "center",
    marginRight: "20px",
  },
  mobileloginMenu: {
    float: "right",
    margin: "20px",
  },
}));
export default styles;
