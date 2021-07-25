import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import useStyles from "./styles.js";
import "./styles.css";
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

const Description = () => {
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
                      to="/join"
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
    </>
  );
};

export default Description;
