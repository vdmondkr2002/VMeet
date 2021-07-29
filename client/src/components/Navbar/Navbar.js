import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link,
  Avatar,
} from "@material-ui/core";
import { HashLink } from "react-router-hash-link";
import { GoogleLogin } from "react-google-login";
import logo from "../../assests/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, logOut } from "../../actions/auth";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.profile);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    if (user.name) {
      setLoggedIn(true);
    }
  }, [user]);

  const googleSuccess = async (res) => {
    try {
      dispatch(
        googleSignIn({
          googleId: res.profileObj.googleId,
          displayName: res.profileObj.name,
          firstName: res.profileObj.givenName,
          lastName: res.profileObj.familyName,
          image: res.profileObj.imageUrl,
          email: res.profileObj.email,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const googleError = () => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  const logout = () => {
    dispatch(logOut(history));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 700 && window.innerWidth > 100
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <>
        <Link component={RouterLink} to="\" color="inherit">
          <img className={classes.image1} src={logo} alt="MeetV" />
        </Link>
        <Toolbar className={classes.toolbar}>
          <div className={classes.midNavbar}>
            <HashLink smooth to={"#feature"}>
              <Button className={classes.menuButton}>Feature</Button>{" "}
            </HashLink>
            <HashLink smooth to={"#aboutus"}>
              <Button className={classes.menuButton}>About Us</Button>{" "}
            </HashLink>
          </div>
          {loggedIn ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Avatar
                  src={user?.profile?.profilePic}
                  alt={user?.profile?.name}
                >
                  {user?.profile?.name?.charAt(0)}
                </Avatar>
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  style={{ backgroundColor: "#03045e" }}
                >
                  <Button onClick={logout}>
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: "400",
                        boxShadow: " none",
                        fontSize: "1.1rem",
                        color: "white",
                      }}
                    >
                      Logout
                    </Typography>
                  </Button>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <GoogleLogin
                clientId="771936552840-bo8590qfhbgqqp1e12fe8pllbqvkfo4g.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    style={{
                      margin: "5px",
                      color: "white",
                      backgroundColor: "#00B4D8",
                    }}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            </>
          )}
        </Toolbar>
      </>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    };
    const handleDrawerClose = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    };

    return (
      <>
        <Toolbar className={classes.parentTool}>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={classes.drawerContainer}>
              <HashLink
                smooth
                to={"#feature"}
                className={classes.menuButton}
                style={{ textDecoration: "none" }}
              >
                <MenuItem>Feature</MenuItem>
              </HashLink>

              <HashLink
                smooth
                to={"#aboutus"}
                className={classes.menuButton}
                style={{ textDecoration: "none" }}
              >
                <MenuItem>About Us</MenuItem>
              </HashLink>
            </div>
          </Drawer>
          <Link component={RouterLink} to="\" color="inherit">
            <img className={classes.image1} src={logo} alt="MeetV" />
          </Link>
        </Toolbar>

        {loggedIn ? (
          <div className={classes.mobileloginMenu}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar src={user?.profile?.profilePic} alt={user?.profile?.name}>
                {user?.profile?.name.charAt(0)}
              </Avatar>
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ color: "pink" }}
            >
              <MenuItem
                onClick={handleClose}
                style={{ backgroundColor: "#03045e" }}
              >
                <Button onClick={logout}>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "400",
                      boxShadow: " none",
                      fontSize: "1.2rem",
                      color: "white",
                    }}
                  >
                    Logout
                  </Typography>
                </Button>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className={classes.mobileloginMenu}>
            <GoogleLogin
              clientId="771936552840-bo8590qfhbgqqp1e12fe8pllbqvkfo4g.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  style={{
                    margin: "5px",
                    color: "white",
                    backgroundColor: "#00B4D8",
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </>
  );
};

export default Navbar;
