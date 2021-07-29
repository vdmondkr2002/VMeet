import React from "react";
import useStyles from "./styles.js";
import { HashLink } from "react-router-hash-link";
import logo from "../../assests/logo.png";
import { Typography, Link, Grid, Button } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.footer}>
        <Grid container alignItems="stretch">
          <Grid item sm={4} xs={12}>
            <Typography align="center">
              <Link href="#" color="inherit">
                <img className={classes.image1} src={logo} alt="MeetV" />
              </Link>
              <br />
              <Typography
                style={{
                  fontSize: "15px",
                  color: "#ffffff",
                }}
                align="center"
              >
                Make video communications frictionless and secure
              </Typography>
            </Typography>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Typography className={classes.touch} align="center">
              Get in Touch
              <br />
            </Typography>
            <Typography align="center">
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                color="inherit"
              >
                <FacebookIcon className={classes.Icon} />
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                color="inherit"
              >
                <InstagramIcon className={classes.Icon} />
              </Link>
              <Link
                href="https://github.com/sagarmude7/Bookxchanger"
                target="_blank"
                color="inherit"
              >
                <GitHubIcon className={classes.Icon} />
              </Link>
              <Link href="http://linkedin.com/" target="_blank" color="inherit">
                <LinkedInIcon className={classes.Icon} />
              </Link>
              <Link
                href="mailto:bookxchanger@gmail.com"
                target="_blank"
                color="inherit"
              >
                <EmailIcon className={classes.Icon} />
              </Link>
            </Typography>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Typography
              style={{ fontSize: "20px", fontWeight: "bold", color: "#ffffff" }}
              align="center"
            >
              Quick Links
            </Typography>
            <Typography align="center">
              <li style={{ listStyleType: "none", textAlign: "center" }}>
                <ul className={classes.link}>
                  <HashLink smooth to={"#description"}>
                    <Button className={classes.linkName}>
                      Join / New Meeting
                    </Button>{" "}
                  </HashLink>
                </ul>
                <ul className={classes.link}>
                  <HashLink smooth to={"#feature"}>
                    <Button className={classes.linkName}>Feature</Button>{" "}
                  </HashLink>
                </ul>
                <ul className={classes.link}>
                  <HashLink smooth to={"#aboutus"}>
                    <Button className={classes.linkName}>About Us</Button>{" "}
                  </HashLink>
                </ul>
              </li>
            </Typography>
          </Grid>
        </Grid>

        <div>
          <Typography
            align="center"
            style={{
              fontSize: "13px",
              position: "Centre",
              padding: "5px 0 5px 0",
              background: "black",
              color: "white",
            }}
          >
            {"Copyright © "}
            <Link
              color="inherit"
              to="/"
              component={RouterLink}
              key="Home"
              className={classes.name}
            >
              VMeet
            </Link>{" "}
            {new Date().getFullYear()}
            {". "}
            {"All Rights Reserved"}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Footer;
