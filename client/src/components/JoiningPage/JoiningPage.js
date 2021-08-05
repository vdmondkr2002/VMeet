import React, { useEffect, useState, useRef } from "react";
import useStyles from "./styles";
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Link,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import MicNoneSharpIcon from "@material-ui/icons/MicNoneSharp";
import MicOffOutlinedIcon from "@material-ui/icons/MicOffOutlined";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assests/logo.png";
import { SET_STREAM, TOGGLE_MIC, TOGGLE_VIDEO,SET_AUDIOTRACK,SET_VIDEOTRACK } from "../../constants/actions";

const JoiningPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myStream = useRef();
  const user = useSelector((state) => state.user);
  const displayuser = useSelector((state) => state.profile);
  
  const [changed, setChanged] = useState(false);
  const [time, setTime] = useState(Date.now());

  const initWebRTC = async () => {
    console.log("initWebRTC called");
    const currStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    dispatch({ type: SET_STREAM, payload: currStream })
    const audioTrack = currStream.getAudioTracks()[0];
    const videoTrack = currStream.getVideoTracks()[0];
    dispatch({type:SET_VIDEOTRACK,payload:videoTrack})
    dispatch({type:SET_AUDIOTRACK,payload:audioTrack})
    myStream.current.srcObject = currStream;
  };

  useEffect(()=>{
    initWebRTC()
  },[])

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

  // const stopVideoStreams = (stream) => {
  //   try {
  //     console.log(stream.getVideoTracks());
  //     stream.getVideoTracks()[0].stop();

  //     // setTimeout(()=>{
  //     //     console.log("turning off stream")
  //     //     // dispatch({type:SET_STREAM,payload:stream})
  //     // },6000)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const stopAudioStream = async (stream) => {
  //   try {
  //     console.log("before");
  //     console.log(stream.getAudioTracks());
  //     await stream.getAudioTracks().forEach((track) => {
  //       track.stop();
  //     });
  //     console.log("after");
  //     // dispatch({type:SET_STREAM,payload:stream})
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleClickVideo = async() => {
    if(user.videoTrack){
      user.videoTrack.stop();
      dispatch({type:SET_VIDEOTRACK,payload:null})
      // myStream.current.srcObject = null;
      dispatch({ type: TOGGLE_VIDEO });
      return;
    }
    try{
      const vstream = await navigator.mediaDevices.getUserMedia({ video: true,audio:true });
      console.log(vstream);
      if(vstream && vstream.getVideoTracks().length>0){
        console.log(vstream.getVideoTracks());
        
        myStream.current.srcObject = new MediaStream(vstream);
        const audioTrack = vstream.getAudioTracks()[0];
        const videoTrack = vstream.getVideoTracks()[0];
        dispatch({ type: SET_STREAM, payload: vstream });
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


  

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Grid>
                <Link component={RouterLink} to="\" color="inherit">
                  <img className={classes.image1} src={logo} alt="MeetV" />
                </Link>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  style={{
                    marginRight: "10px",
                    color: "white",
                  }}
                >
                  {displayuser?.name}
                </Typography>
                <Avatar
                  src={displayuser?.profilePic}
                  alt={displayuser?.name}
                ></Avatar>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Grid
            container
            alignItems="center"
            className={classes.gridContainer}
            xs={12}
          >
            {/* {stream && ( */}
            <>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                className={classes.video}
              >
                <div>
                  <video
                    playsInline
                    ref={myStream}
                    autoPlay
                    className={user.videoOn ? classes.video1 : classes.video2}
                  />
                  {!user.videoOn ? (
                    <div className={classes.camOff}>
                      <Typography className={classes.camOffText}>
                        Camera is Off
                      </Typography>
                      <video
                        playsInline
                        muted={false}
                        style={{ width: "0", height: "0" }}
                      />
                    </div>
                  ) : null}
                </div>

                <hr style={{ borderWidth: 0 }} />

                <div className={classes.actionBtns}>
                  {user.micOn ? (
                    <Tooltip title="Mic Off">
                      <IconButton
                        onClick={handleClickMute}
                        className={classes.iconBg}
                        style={{
                          backgroundColor: "black",
                          opacity: 0.5,
                          borderColor: "white",
                        }}
                      >
                        <MicNoneSharpIcon
                          fontSize="large"
                          className={classes.icon}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Mic On">
                      <IconButton
                        onClick={handleClickMute}
                        className={classes.iconBg}
                      >
                        <MicOffOutlinedIcon
                          fontSize="large"
                          className={classes.icon}
                        />
                      </IconButton>
                    </Tooltip>
                  )}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {user.videoOn ? (
                    <Tooltip title="VideoOff">
                      <IconButton
                        onClick={handleClickVideo}
                        className={classes.iconBg}
                        style={{
                          backgroundColor: "black",
                          opacity: 0.5,
                          borderColor: "white",
                        }}
                      >
                        <VideocamIcon
                          fontSize="large"
                          className={classes.icon}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="VideoOn">
                      <IconButton
                        onClick={handleClickVideo}
                        className={classes.iconBg}
                      >
                        <VideocamOffIcon
                          fontSize="large"
                          className={classes.icon}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </Grid>
              <Grid
                item
                xs={10}
                sm={12}
                md={12}
                lg={4}
                className={classes.descText}
              >
                <br />
                <br />
                <br />
                <br />
                <Typography variant="h5" className={classes.readyToJoin}>
                  Ready To Join?
                </Typography>
                <br />
                <Typography variant="subtitle1">
                  You will join when someone lets you in
                </Typography>
                <br />
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {/* <Button className={classes.btn}>Join Now</Button> */}
                  <Button
                    className={classes.btn}
                    style={{
                      backgroundColor: "white",
                      color: "#1a73e8",
                      boxShadow: "1px 0px 10px grey",
                    }}
                  >
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
        </div>
      </div>
    </>
  );
};

export default JoiningPage;
