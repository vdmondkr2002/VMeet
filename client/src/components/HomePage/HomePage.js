import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import useStyles from "./styles.js";
import "./styles.css";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";

const HomePage = () => {
  const classes = useStyles();
  const [code, setcode] = useState(" ");

  const handleChange = () => (event) => {
    setcode(event.target.value);
  };

  // const handleClickShowPassword = () => {
  //   setcode({ ...code, showPassword: !code.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

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
                placeholder="Enter a code or link"
                s
                onChange={handleChange("code")}
                startAdornment={
                  <InputAdornment position="start">
                    <KeyboardIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      {code === " " ? (
                        <ArrowForwardIcon disabled />
                      ) : (
                        <ArrowForwardIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* <TextField
              id="outlined-start-adornment"
              placeholder="Enter a code or link"
              className={classes.textField}
              value={code.code}
              onChange={handleChange("code")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <KeyboardIcon />
                  </InputAdornment>
                ),
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {code.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              variant="outlined"
            /> */}
          </div>
        </div>
        <div className="right">Right</div>
      </div>
    </>
  );
};

export default HomePage;
