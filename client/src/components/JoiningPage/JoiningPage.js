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
import { SET_STREAM, TOGGLE_MIC, TOGGLE_VIDEO } from "../../constants/actions";

const JoiningPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const displayuser = useSelector((state) => state.profile);
  const myStream = useRef();
  const [changed, setChanged] = useState(false);
  // const [mute,setMute] = useState(true)
  const [time, setTime] = useState(Date.now());

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
      // dispatch({type:SET_STREAM,payload:stream})
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickVideo = () => {
    dispatch({ type: TOGGLE_VIDEO });
  };
  const handleClickMute = () => {
    dispatch({ type: TOGGLE_MIC });
  };

  const handleEndCall = () => {
    console.log("call ended");
  };

  const classes = useStyles();

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
                  <Button className={classes.btn}>Join Now</Button>
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
