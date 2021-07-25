import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./styles.js";
import "./styles.css";
import { Typography, Link, Grid } from "@material-ui/core";
import mission from "../../../assests/mission.svg";
import vision from "../../../assests/vision.svg";
import value from "../../../assests/values.svg";
import culture from "../../../assests/culture.svg";
import monitor from "../../../assests/monitor-screen.png";

const AboutUs = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.main3}>
        <div style={{ paddingBottom: "20px" }}>
          <Grid
            container
            spacing={3}
            alignItems="stretch"
            justifyContent="center"
          >
            <Grid item sm={6} xs={12}>
              <div>
                <Typography variant="h2" style={{ marginBottom: "20px" }}>
                  About MEETV
                </Typography>
                <Typography variant="subtitle1">
                  MeetV is for you. We help you express ideas, connect to
                  others, and build toward a future limited only by your
                  imagination. Our frictionless communications platform is the
                  only one that started with video as its foundation, and we
                  have set the standard for innovation ever since. That is why
                  we are an intuitive, scalable, and secure choice for large
                  enterprises, small businesses, and individuals alike. Founded
                  in 2011, MeetV is publicly traded (NASDAQ:ZM) and
                  headquartered in San Jose, California.
                </Typography>
              </div>
            </Grid>
            <Grid sm={5} xs={12}>
              <div className={classes.image}>
                <img src={monitor} alt="" className={classes.monitor} />
              </div>
            </Grid>
          </Grid>
        </div>

        <div>
          <main>
            <ul className="cards-container">
              <li className="cyan-feature-card">
                <h2>Our vision</h2>
                <p>Video communications empowering people to accomplish more</p>
                <div
                  className="circle-container-icon"
                  style={{ background: "hsl(180, 62%, 55%)" }}
                >
                  <img src={vision} alt="Our vision" />
                </div>
              </li>
              <li className="red-feature-card">
                <h2>Our Mission</h2>
                <p>Make video communications frictionless and secure</p>
                <div
                  className="circle-container-icon"
                  style={{ background: "hsl(0, 78%, 62%)" }}
                >
                  <img src={mission} alt="Our Mission" />
                </div>
              </li>
              <li className="orange-feature-card">
                <h2>Our value</h2>
                <p>Community, Customers, Company, Teammates, Selves</p>
                <div
                  className="circle-container-icon"
                  style={{ background: " hsl(34, 97%, 64%)" }}
                >
                  <img src={value} alt="Our value" />
                </div>
              </li>
              <li className="blue-feature-card">
                <h2>Our culture</h2>
                <p>Delivering happiness</p>
                <div
                  className="circle-container-icon"
                  style={{ background: "hsl(212, 86%, 64%)" }}
                >
                  <img src={culture} alt="Our culture" />
                </div>
              </li>
            </ul>
          </main>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
