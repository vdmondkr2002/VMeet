import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import useStyles from "./styles.js";
import Carousel from "react-material-ui-carousel";
import "./styles.css";
import descData from "./descData.js";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";
import mission from "../../assests/mission.svg";
import vision from "../../assests/vision.svg";
import value from "../../assests/values.svg";
import culture from "../../assests/culture.svg";

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
      <div className="main3">
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
                <img src={vision} alt="supervisor feature icon" />
              </li>
              <li className="red-feature-card">
                <h2>Our Mission</h2>
                <p>Make video communications frictionless and secure</p>
                <img src={mission} alt="team builder feature icon" />
              </li>
              <li className="orange-feature-card">
                <h2>Our value</h2>
                <p>Community, Customers, Company, Teammates, Selves</p>
                <img src={value} alt="karma feature icon" />
              </li>
              <li className="blue-feature-card">
                <h2>Our culture</h2>
                <p>Delivering happiness</p>
                <img src={culture} alt="calculator feature icon" />
              </li>
            </ul>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
