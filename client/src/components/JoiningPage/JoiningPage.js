import React, { useEffect, useState, useRef } from 'react';
import useStyles from "./styles"
import { Grid, Typography, Paper, makeStyles, IconButton, Button } from '@material-ui/core';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import MicNoneSharpIcon from '@material-ui/icons/MicNoneSharp';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import Tooltip from '@material-ui/core/Tooltip';

// import { Mic, VideocamOff } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { SET_STREAM, TOGGLE_MIC, TOGGLE_VIDEO } from '../../constants/actions';


const JoiningPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const myStream = useRef();
  const [changed, setChanged] = useState(false)
  // const [mute,setMute] = useState(true)
  const [time, setTime] = useState(Date.now())


  const initWebRTC = async () => {
    console.log("initWebRTC called")
    const currStream = await navigator.mediaDevices.getUserMedia({ audio: user.micOn, video: user.videoOn })
    dispatch({ type: SET_STREAM, payload: currStream })

    myStream.current.srcObject = currStream;

  }

  useEffect(() => {
    console.log(user.micOn ? "mic On" : "mic Off")
    if (user.micOn) {
      initWebRTC()
    } else {
      const stream = user.stream
      stopAudioStream(stream)
    }

  }, [user.micOn])

  useEffect(() => {
    console.log(user.videoOn ? "video On" : "video Off")
    if (user.videoOn) {
      initWebRTC()
    } else {
      if (user.stream) {
        var stream = user.stream
        stopVideoStreams(stream)
      }

    }
  }, [user.videoOn])

 
  const stopVideoStreams = (stream) => {
    try {
      console.log(stream.getVideoTracks())
      stream.getVideoTracks()[0].stop();
    } catch (err) {
      console.log(err)
    }
  }

  const stopAudioStream = async (stream) => {
    try {
      console.log("before")
      console.log(stream.getAudioTracks())
      await stream.getAudioTracks().forEach(track => {
        track.stop()
      })
      console.log("after")
      // dispatch({type:SET_STREAM,payload:stream})
    } catch (err) {
      console.log(err)
    }
  }




  const handleClickVideo = () => {
    dispatch({ type: TOGGLE_VIDEO })
  }
  const handleClickMute = () => {
    dispatch({ type: TOGGLE_MIC })
  }

  const handleEndCall = () => {
    console.log("call ended")
  }

  const classes = useStyles();



  return (
    <Grid container alignItems="center" className={classes.gridContainer} xs={12} >

      {/* {stream && ( */}
      <>


        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.video} >

          <video playsInline ref={myStream} autoPlay className={user.videoOn ? (classes.video1) : (classes.video2)} />
          {
            !user.videoOn ? (
              <div className={classes.camOff}  >
                <Typography className={classes.camOffText}>Camera is Off</Typography>
                <video playsInline muted={false} style={{ width: "0", height: "0" }} />
              </div>
            ) : null
          }
          <hr style={{ borderWidth: 0 }} />
          <div className={classes.actionBtns}>
            {
              user.micOn ? (

                <Tooltip title="Mic Off">
                  <IconButton onClick={handleClickMute} className={classes.iconBg}>
                    <MicNoneSharpIcon fontSize="large" className={classes.icon} />
                  </IconButton>
                </Tooltip>
              ) :
                (<Tooltip title="Mic On">
                  <IconButton onClick={handleClickMute} className={classes.iconBg}>
                    <MicOffOutlinedIcon fontSize="large" className={classes.icon} />
                  </IconButton>
                </Tooltip>
                )
            } &nbsp;&nbsp;&nbsp;&nbsp;
            {
              user.videoOn ? (
                <Tooltip title="VideoOff">
                  <IconButton onClick={handleClickVideo} className={classes.iconBg}>
                    <VideocamIcon fontSize="large" className={classes.icon} />
                  </IconButton>
                </Tooltip>
              ) :
                (<Tooltip title="VideoOn">
                  <IconButton onClick={handleClickVideo} className={classes.iconBg}>
                    <VideocamOffIcon fontSize="large" className={classes.icon} />
                  </IconButton>
                </Tooltip>
                )
            }




          </div>
        </Grid>
        <Grid item xs={10} sm={12} md={12} lg={4} className={classes.descText} >
          <br /><br /><br /><br />
          <Typography variant="h4" className={classes.readyToJoin} >Ready To Join ? </Typography>
          <br />
          <Typography variant="h6" className={classes.readyToJoinTxt}>
            You will join when someone lets you in...
          </Typography>
          <br />
          <div style={{
            display: "flex",

          }}>
            <Button className={classes.btn}  >
              Join Now
            </Button>
            <Button className={classes.btn} >
              Present &nbsp;
              <ScreenShareIcon />
            </Button>
          </div>

          <br />
          {/* <CircularProgress color="secondary" /> */}
        </Grid>
      </>

      {/* )} */}
    </Grid>

  );
};

export default JoiningPage;