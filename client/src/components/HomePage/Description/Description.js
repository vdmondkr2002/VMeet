import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import useStyles from "./styles.js";
import Carousel from "react-material-ui-carousel";
import descData from "./descData.js";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { Typography, Grid, Paper } from "@material-ui/core";

const Description = () => {
  const classes = useStyles();
  const history = useHistory();
  const [code, setcode] = useState("");

  const handleChange = (event) => {
    setcode(event.target.value);
  };

  const handleJoin = () =>{
    history.push("/join");
  }

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
      <div style={{ margin: "10px auto" }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sm={6} xs={12}>
            <div className={classes.left}>
              <div className={classes.YpQfNc}>
                Premium video meetings. Now free for everyone.
              </div>
              <div className={classes.rH9mRb}>
                We re-engineered the service we built for secure business
                meetings, Google Meet, to make it free and available for all.
              </div>

              <Grid
                container
                spacing={3}
                alignItems="stretch"
                justifyContent="flex-start"
              >
                <Grid item sm={6} xs={12}>
                  <Button
                    fullwidth
                    variant="contained"
                    startIcon={<VideoCallIcon style={{ fontSize: "27px" }} />}
                    className={classes.buttoncolor}
                  >
                    <Typography className={classes.newmeeting}>
                      New Meeting
                    </Typography>
                  </Button>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <FormControl variant="outlined" className={classes.codeinput} >
                    <OutlinedInput
                      style={{ width: "100%", height: "50px" }}
                      value={code}
                      onChange={handleChange}
                      placeholder="Enter a code"
                      startAdornment={
                        <InputAdornment position="start">
                          <KeyboardIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleJoin}
                            disabled={!code}
                            className={classes.codearrow}
                          >
                            <ArrowForwardIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className={classes.right}>
              <Carousel
                indicators={true}
                animation="fade"
                autoPlay={true}
                interval={10000}
                stopAutoPlayOnHover={false}
                navButtonsAlwaysInvisible={true}
              >
                {descData.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </Carousel>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Description;
