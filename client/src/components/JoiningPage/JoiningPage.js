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




const JoiningPage = () => {

  const [stream, setStream] = useState(true)
  const [mute, setMute] = useState(true)
  const [videoon, setVideoOn] = useState(true)
  const classes = useStyles();
  const myVideo = useRef();
  const myAudio = useRef();
//   const getUserAudio = () => {
//     if ( navigator.mediadevices.userMediaAvailable() ) {
//         return navigator.mediaDevices.getUserMedia( {
//             audio: {
//                 echoCancellation: true,
//                 noiseSuppression: true
//             }
//         } );
//     }

//     else {
//         throw new Error( 'User media not available' );
//     }
// }
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        console.log(currentStream)
        // myAudio.current.srcObject = currentStream;
        // console.log(myAudio)
        // getUserAudio();
        myVideo.current.srcObject = currentStream;
        console.log(myVideo)
      });

  }, []);

  const handleClickMute = () => {
    setMute(prev => !prev)
  }

  const handleClickVideo = () => {
    setVideoOn(prev => !prev)

    if (myVideo.current.srcObject) {
      stream.getTracks().forEach(track => track.stop());
      myVideo.current.srcObject = null
    } else {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);

          myVideo.current.srcObject = currentStream;
        });
    }

  }

  return (
    <Grid container  alignItems="center"className={classes.gridContainer} xs={12} >
       
      {stream && (
        <>
      

          <Grid item xs={12} sm={12} md={12} lg={6} className={classes.video} >
            
            <video playsInline muted={mute} ref={myVideo} autoPlay className={videoon ? (classes.video1) : (classes.video2)} />
            {
              !videoon ? (
                <div className={classes.camOff}  >
                  <Typography className={classes.camOffText}>Camera is Off</Typography>
                <video playsInline muted={false} style={{width:"0",height:"0"}} />
                </div>
              ) : null
            }
            <hr style={{ borderWidth: 0 }} />
            <div className={classes.actionBtns}>
                {
                !mute ? (
                 
                  <Tooltip title="Mic Off">
                  <IconButton onClick={handleClickMute} className={classes.iconBg}>
                     <MicNoneSharpIcon fontSize="large" className={classes.icon} /> 
                  </IconButton>
                  </Tooltip>
                ) :
                (   <Tooltip title="Mic On">
                  <IconButton onClick={handleClickMute} className={classes.iconBg}>
                    <MicOffOutlinedIcon fontSize="large" className={classes.icon} />
                  </IconButton>
                  </Tooltip>
                )
             } &nbsp;&nbsp;&nbsp;&nbsp;
             {
                videoon ? (
                  <Tooltip title="VideoOff">
                  <IconButton onClick={handleClickVideo} className={classes.iconBg}>
                    <VideocamIcon fontSize="large" className={classes.icon} /> 
                  </IconButton>
                  </Tooltip>
                ) :
                (   <Tooltip title="VideoOn">
                  <IconButton onClick={handleClickVideo} className={classes.iconBg}>
                    <VideocamOffIcon fontSize="large" className={classes.icon} />
                  </IconButton>
                  </Tooltip>
                )
             }
             
           
             
             
            </div>
          </Grid>
          <Grid item xs={10} sm={12} md={12} lg={4}  className={classes.descText} >
            <br /><br /><br /><br />
            <Typography variant="h4"  className={classes.readyToJoin} >Ready To Join ? </Typography>
            <br />
            <Typography variant="h6" className={classes.readyToJoinTxt}>
              You will join when someone lets you in...
            </Typography>
            <br />
            <div style={{
              display:"flex",
             
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

      )}
    </Grid>
    
  );
};

export default JoiningPage;