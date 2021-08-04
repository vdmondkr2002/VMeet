import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Button,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import MicNoneSharpIcon from "@material-ui/icons/MicNoneSharp";
import MicOffOutlinedIcon from "@material-ui/icons/MicOffOutlined";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import CallEndIcon from "@material-ui/icons/CallEnd";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import ChatIcon from "@material-ui/icons/Chat";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_STREAM,
  TOGGLE_MIC,
  TOGGLE_VIDEO,
} from "../../../constants/actions";
import useStyles from "./styles";

const CallPageFooter = ({
  myStream,
  setInfoOpen,
  setChatOpen,
  setPeopleOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    console.log(user.micOn ? "mic On" : "mic Off");
    if (user.micOn) {
      initWebRTC();
    } else {
      const stream = user.stream;
      stopAudioStream(stream);
    }
  }, [user.micOn]);

  useEffect(() => {
    console.log(user.videoOn ? "video On" : "video Off");
    if (user.videoOn) {
      initWebRTC();
    } else {
      if (user.stream) {
        var stream = user.stream;
        stopVideoStreams(stream);
      }
    }
  }, [user.videoOn]);

  const stopVideoStreams = (stream) => {
    try {
      console.log("100");
      console.log(stream.getVideoTracks());
      console.log("102");
      stream.getVideoTracks()[0].stop();
      console.log("107");
      console.log("after");
      dispatch({ type: SET_STREAM, payload: stream });
    } catch (err) {
      console.log(err);
    }
  };

  const stopAudioStream = async (stream) => {
    try {
      console.log("before");
      console.log(stream.getAudioTracks());
      await stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
      console.log("after");
      dispatch({ type: SET_STREAM, payload: stream });
    } catch (err) {
      console.log(err);
    }
  };

  const initWebRTC = async () => {
    console.log("initWebRTC called");
    const currStream = await navigator.mediaDevices.getUserMedia({
      audio: user.micOn,
      video: user.videoOn,
    });
    dispatch({ type: SET_STREAM, payload: currStream });

    myStream.current.srcObject = currStream;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClickVideo = () => {
    dispatch({ type: TOGGLE_VIDEO });
  };
  const handleClickMute = () => {
    dispatch({ type: TOGGLE_MIC });
  };

  const handleEndCall = () => {
    console.log("call ended");
  };

  const handlePeopleDrawerToggle = () => {
    setPeopleOpen((prev) => !prev);
  };
  const handleChatDrawerToggle = () => {
    setChatOpen((prev) => !prev);
  };

  const handleInfoDrawerToggle = () => {
    setInfoOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item sm="3" className={classes.leftCont}>
              <Typography variant="body1" className={classes.time}>
                {moment(time).format(" h:mm a |")}
              </Typography>
            </Grid>

            <Grid item sm="6" className={classes.midCont}>
              <Button
                className={user.micOn ? classes.buttonOn : classes.buttonOff}
                variant="contained"
              >
                <IconButton onClick={handleClickMute}>
                  {user.micOn ? (
                    <MicNoneSharpIcon
                      fontSize="medium"
                      style={{ color: "white" }}
                    />
                  ) : (
                    <MicOffOutlinedIcon
                      fontSize="medium"
                      style={{ color: "white" }}
                    />
                  )}
                </IconButton>
              </Button>
              <Button
                className={user.videoOn ? classes.buttonOn : classes.buttonOff}
                variant="contained"
              >
                <IconButton onClick={handleClickVideo}>
                  {user.videoOn ? (
                    <VideocamIcon
                      fontSize="medium"
                      style={{ color: "white" }}
                    />
                  ) : (
                    <VideocamOffIcon
                      fontSize="medium"
                      style={{ color: "white" }}
                    />
                  )}
                </IconButton>
              </Button>
              <Button className={classes.buttonOn} variant="contained">
                <IconButton>
                  <PresentToAllIcon
                    fontSize="medium"
                    style={{ color: "white" }}
                  />
                </IconButton>
              </Button>
              <Button className={classes.buttonOff} variant="contained">
                <IconButton onClick={handleEndCall}>
                  <CallEndIcon fontSize="medium" style={{ color: "white" }} />
                </IconButton>
              </Button>
            </Grid>

            <Grid item sm="3" className={classes.rightCont}>
              <IconButton>
                <InfoOutlinedIcon
                  fontSize="large"
                  style={{ color: "white" }}
                  onClick={handleInfoDrawerToggle}
                />
              </IconButton>
              <IconButton>
                <PeopleOutlinedIcon
                  fontSize="large"
                  style={{ color: "white" }}
                  onClick={handlePeopleDrawerToggle}
                />
              </IconButton>
              <IconButton>
                <ChatIcon
                  fontSize="large"
                  style={{ color: "white" }}
                  onClick={handleChatDrawerToggle}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CallPageFooter;
