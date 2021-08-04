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
  SET_VIDEOTRACK,
  TOGGLE_MIC,
  TOGGLE_VIDEO,
} from "../../../constants/actions";
import useStyles from "./styles";

const CallPageFooter = ({
  myStream,
  setInfoOpen,
  setChatOpen,
  setPeopleOpen,
  infoOpen,
  chatOpen,
  peopleOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [time, setTime] = useState(Date.now());

  // useEffect(() => {
  //   console.log(user.micOn ? "mic On" : "mic Off");
  //   if (user.micOn) {
  //     initWebRTC();
  //   } else {
  //     const stream = user.stream;
  //     stopAudioStream(stream);
  //   }
  // }, [user.micOn]);

  // useEffect(() => {
  //   console.log(user.videoOn ? "video On" : "video Off");
  //   if (user.videoOn) {
  //     initWebRTC();
  //   } else {
  //     if (user.stream) {
  //       var stream = user.stream;
  //       stopVideoStreams(stream);
  //     }
  //   }
  // }, [user.videoOn]);

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

  const handleClickVideo = async() => {
    // dispatch({ type: TOGGLE_VIDEO });
    if(user.videoTrack){
      user.videoTrack.stop();
      dispatch({type:SET_VIDEOTRACK,payload:null})
      myStream.current.srcObject = null;
      dispatch({ type: TOGGLE_VIDEO });
      return;
    }
    try{
      const vstream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log(vstream);
      if(vstream && vstream.getVideoTracks().length>0){
        dispatch({type:SET_VIDEOTRACK,payload:vstream.getVideoTracks()[0]});
        console.log(vstream.getVideoTracks());
        myStream.current.srcObject = new MediaStream(vstream.getVideoTracks());
        dispatch({ type: TOGGLE_VIDEO });
      }
    }catch(err){
      console.log(err)
    }
  
  };
  const handleClickMute = () => {
    // dispatch({ type: TOGGLE_MIC });
    if(!user.audioTrack)
      return;
    if(!user.audioTrack.enabled){
      user.audioTrack.enabled = true;
    }else{
      user.audioTrack.enabled = false;
    }
    console.log(user.audioTrack)
    dispatch({type:TOGGLE_MIC})
  };

  const handleEndCall = () => {
    console.log("call ended");
  };

  const handlePeopleDrawerToggle = () => {
    setPeopleOpen((prev) => !prev);
    setChatOpen(false);
    setInfoOpen(false);
  };

  const handleChatDrawerToggle = () => {
    setChatOpen((prev) => !prev);
    setPeopleOpen(false);
    setInfoOpen(false);
  };

  const handleInfoDrawerToggle = () => {
    setInfoOpen((prev) => !prev);
    setChatOpen(false);
    setPeopleOpen(false);
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
              <IconButton
                className={user.micOn ? classes.buttonOn : classes.buttonOff}
                onClick={handleClickMute}
              >
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

              <IconButton
                className={user.videoOn ? classes.buttonOn : classes.buttonOff}
                onClick={handleClickVideo}
              >
                {user.videoOn ? (
                  <VideocamIcon fontSize="medium" style={{ color: "white" }} />
                ) : (
                  <VideocamOffIcon
                    fontSize="medium"
                    style={{ color: "white" }}
                  />
                )}
              </IconButton>

              <IconButton className={classes.buttonOn}>
                <PresentToAllIcon
                  fontSize="medium"
                  style={{ color: "white" }}
                />
              </IconButton>

              <IconButton onClick={handleEndCall} className={classes.buttonOff}>
                <CallEndIcon fontSize="medium" style={{ color: "white" }} />
              </IconButton>
            </Grid>

            <Grid item sm="3" className={classes.rightCont}>
              <IconButton>
                <InfoOutlinedIcon
                  fontSize="medium"
                  style={{ color: infoOpen ? "#00b4d8 " : "white" }}
                  onClick={handleInfoDrawerToggle}
                />
              </IconButton>
              <IconButton>
                <PeopleOutlinedIcon
                  fontSize="medium"
                  style={{ color: peopleOpen ? "#00b4d8 " : "white" }}
                  onClick={handlePeopleDrawerToggle}
                />
              </IconButton>
              <IconButton>
                <ChatIcon
                  fontSize="medium"
                  style={{ color: chatOpen ? "#00b4d8 " : "white" }}
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
