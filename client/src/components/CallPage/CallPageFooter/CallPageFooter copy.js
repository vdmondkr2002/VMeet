import React, { useEffect, useState } from "react";
import {
  Box,
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
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import InfoIcon from "@material-ui/icons/Info";
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
  peopleOpen,
  setChatOpen,
  setPeopleOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [changed, setChanged] = useState(false);
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

  // useEffect(()=>{
  // console.log("turning off")
  // console.log(user.stream)
  // myStream.current.srcObject = user.stream
  // },[user.stream])

  // const setStream = (stream)=>{
  //     console.log("inside stream")
  //     console.log(stream.getVideoTracks())
  //     // console.log(stream.getAudioTracks())
  //     myStream.current.srcObject = stream
  //     dispatch({type:SET_STREAM,payload:stream})
  // }

  const stopVideoStreams = (stream) => {
    try {
      // console.log("before")
      console.log("100");
      console.log(stream.getVideoTracks());
      console.log("102");
      stream.getVideoTracks()[0].stop();
      // stream.getVideoTracks().forEach(track=>
      //     {
      //     track.stop()
      //     console.log("hi")

      // }
      // )

      console.log("107");
      console.log("after");
      dispatch({ type: SET_STREAM, payload: stream });
      // setTimeout(()=>{
      //     console.log("turning off stream")
      //     // dispatch({type:SET_STREAM,payload:stream})
      // },6000)
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

  return (
    <>
      <Box position="absolute" bottom="0" left="0" width="100%">
        <Grid container>
          <Grid item sm="3" className={classes.leftCont}>
            <Typography variant="h6" className={classes.time}>
              {moment(time).format(" h:mm a|")}
            </Typography>
          </Grid>
          <Grid item sm="6" className={classes.midCont}>
            <Button
              className={classes.callBtns}
              color={user.micOn ? "default" : "secondary"}
              variant="contained"
            >
              <IconButton color="inherit" onClick={handleClickMute}>
                {user.micOn ? (
                  <MicNoneSharpIcon fontSize="medium" color="primary" />
                ) : (
                  <MicOffOutlinedIcon fontSize="medium" color="primary" />
                )}
              </IconButton>
            </Button>
            <Button
              className={classes.callBtns}
              color={!user.videoOn ? "secondary" : "default"}
              variant="contained"
            >
              <IconButton onClick={handleClickVideo}>
                {user.videoOn ? (
                  <VideocamIcon fontSize="medium" color="primary" />
                ) : (
                  <VideocamOffIcon fontSize="medium" color="primary" />
                )}
              </IconButton>
            </Button>
            <Button className={classes.callBtns} variant="contained">
              <IconButton>
                <PresentToAllIcon fontSize="large" color="primary" />
              </IconButton>
            </Button>
            <Button
              className={classes.callBtns}
              color="secondary"
              variant="contained"
            >
              <IconButton onClick={handleEndCall}>
                <CallEndIcon fontSize="medium" color="primary" />
              </IconButton>
            </Button>
          </Grid>
          <Grid item sm="3" className={classes.rightCont}>
            <IconButton>
              <PeopleIcon
                fontSize="large"
                color="primary"
                onClick={handlePeopleDrawerToggle}
              />
            </IconButton>
            <IconButton>
              <ChatIcon
                fontSize="large"
                color="primary"
                onClick={handleChatDrawerToggle}
              />
            </IconButton>
            <IconButton>
              <InfoIcon fontSize="large" color="primary" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CallPageFooter;
