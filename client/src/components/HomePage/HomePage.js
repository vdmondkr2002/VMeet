import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import useStyles from "./styles.js";
import Carousel from "react-material-ui-carousel";
import "./styles.css";
import descData from "./descData.js";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { Typography, Link, Grid, Paper } from "@material-ui/core";
import mission from "../../assests/mission.svg";
import vision from "../../assests/vision.svg";
import value from "../../assests/values.svg";
import culture from "../../assests/culture.svg";
import monitor from "../../assests/monitor-screen.png";

const HomePage = () => {
  const classes = useStyles();
  const [code, setcode] = useState("");

  const handleChange = (event) => {
    setcode(event.target.value);
  };

  const Item = (props) => {
    return (
      <div className={`${classes.card} ${classes.frontCard}`}>
        <img src={props.item.img} alt="image" className={classes.img} />
        <Typography component="span" align="center" variant="h5">
          {props.item.heading}
        </Typography>
        <Typography
          component="span"
          align="center"
          variant="subtitle1"
          style={{ padding: "0 0.25rem" }}
        >
          {props.item.subHeading}
        </Typography>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="main1">
        <div className="left">
          <div className="YpQfNc">
            Premium video meetings. Now free for everyone.
          </div>
          <div className="rH9mRb">
            We re-engineered the service we built for secure business meetings,
            Google Meet, to make it free and available for all.
          </div>
          <div class="iOSzxe" className={classes.root}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<VideoCallIcon />}
              className={classes.buttoncolor}
            >
              <Typography>New Meeting</Typography>
            </Button>

            <FormControl variant="outlined" className={classes.codeinput}>
              <OutlinedInput
                value={code}
                onChange={handleChange}
                placeholder="Enter a code or link"
                startAdornment={
                  <InputAdornment position="start">
                    <KeyboardIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      disabled={!code}
                      className={classes.codearrow}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="right">
          <Carousel
            indicators={true}
            animation="fade"
            autoPlay={true}
            interval={10000}
            stopAutoPlayOnHover={false}
            navButtonsAlwaysInVisible={true}
          >
            {descData.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </Carousel>
        </div>
      </div>

      <div className="main2">Main 2</div>

      <div className={classes.main3}>
        <div style={{ paddingBottom: "20px" }}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item sm={7} xs={12}>
              <div>
                <Typography variant="h2">About Zoom</Typography>
                <Typography variant="subtitle1">
                  Zoom is for you. We help you express ideas, connect to others,
                  and build toward a future limited only by your imagination.
                  Our frictionless communications platform is the only one that
                  started with video as its foundation, and we have set the
                  standard for innovation ever since. That is why we are an
                  intuitive, scalable, and secure choice for large enterprises,
                  small businesses, and individuals alike. Founded in 2011, Zoom
                  is publicly traded (NASDAQ:ZM) and headquartered in San Jose,
                  California.
                </Typography>
              </div>
            </Grid>
            <Grid item sm={5} xs={12}>
              <div>
                <img src={monitor} alt="" className={classes.monitor} />
              </div>
            </Grid>
          </Grid>
        </div>

        <div>
          {/* <header>
            <h1>
              Reliable, efficient delivery
              <br />
              <strong>Powered by Technology</strong>
            </h1>
            <p>
              Our Artificial Intelligence powered tools use millions of project
              data points to ensure that your project is successful
            </p>
          </header> */}
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
        <Link to="/join">
          <Button>Joining Page</Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
