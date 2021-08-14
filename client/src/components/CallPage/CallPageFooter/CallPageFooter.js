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
  SET_AUDIOTRACK,
  SET_CLICKED
} from "../../../constants/actions";
import useStyles from "./styles";

const CallPageFooter = ({
  handleEndCall,
  setInfoOpen,
  setChatOpen,
  setPeopleOpen,
  infoOpen,
  chatOpen,
  peopleOpen,
  socketId
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClickVideo = async() => {

    if(user.videoTrack){
      user.videoTrack.stop();
      dispatch({type:SET_VIDEOTRACK,payload:null})
      const searchVideo = document.getElementById(socketId)
      
      dispatch({type:SET_CLICKED})
      searchVideo.srcObject = null;
      window.localStream=null;
      dispatch({ type: TOGGLE_VIDEO });
      return;
    }
    try{
      const vstream = await navigator.mediaDevices.getUserMedia({ video: true,audio:true });
      console.log(vstream);
      if(vstream && vstream.getVideoTracks().length>0){
        dispatch({type:SET_CLICKED})
        dispatch({type:SET_VIDEOTRACK,payload:vstream.getVideoTracks()[0]});
        console.log(vstream.getVideoTracks());
        const searchVideo = document.getElementById(socketId)
        searchVideo.srcObject = new MediaStream(vstream);
        const audioTrack = vstream.getAudioTracks()[0];
        const videoTrack = vstream.getVideoTracks()[0];
        dispatch({ type: SET_STREAM, payload: vstream });
        window.localStream = vstream;
        dispatch({type:SET_VIDEOTRACK,payload:videoTrack})
        dispatch({type:SET_AUDIOTRACK,payload:audioTrack})
        dispatch({ type: TOGGLE_VIDEO });
        
        if(!user.micOn){
          audioTrack.enabled = false;
        }
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