import React, { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Paper, makeStyles, IconButton, Button } from '@material-ui/core';
import MicNoneSharpIcon from '@material-ui/icons/MicNoneSharp';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { Mic, VideocamOff } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  btn:{
    color: "white",
    backgroundColor: "blue",
    padding: "10px 15px ",
    borderRadius: "30px",
    margin:"5px",
    boxShadow:"1px 0px 10px grey"
  },
  video1: {
    borderRadius: "20px",
    width: '650px',

    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
    [theme.breakpoints.down('md')]: {
      width: '650px',
      marginLeft:"200px",
    },
  },
  video2: {
    width: "0",
  },

  offvideo: {
    width: '100%',
    height: "60vh",

  },
  gridContainer: {
    margin: "10px 20px 10px 100px",
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    border: '2px solid black',
    borderRadius: "10px",
  },
  actionBtns: {
    // marginTop:"-100px",
    // marginLeft:"320px",
    display: "flex",
    width: "650px",
    height: "auto",
    color: "white",
    justifyContent: "center",
    [theme.breakpoints.down('md')]: {
      width: "1100px",
    },
    

  },
  descText:{
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
        position:"absolute",
        top:"700px",
        left:"500px"
    },
    [theme.breakpoints.down('xs')]: {
      width:"400px",
      position:"absolute",
      top:"700px",
      left:"500px"
    },
  },
  camOff :{
    width: "650px",
    height: "60vh",
    margin: "0 !important",
    background: "#080808",
    borderRadius: "20px",
    // background: "-webkit-linear-gradient(to right, #ffefba, #ffffff)",  
    // background: "linear-gradient(to right, #ffefba, #ffffff)", 
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width:"600px",
      height:"60vh" ,
      maxWidth:"900px !important"
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width:"600px",
      height:"60vh" ,
      padding:"0",
      maxWidth:"900px !important"
    },
  },
    camOffText:{
      textAlign: "center",
      padding:"70px",
      fontSize: "38px",
      color: "white",
    }
}));

const JoiningPage = () => {

  const [stream, setStream] = useState(true)
  const [mute, setMute] = useState(true)
  const [videoon, setVideoOn] = useState(true)
  const classes = useStyles();
  const myVideo = useRef();
  const myAudio = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        console.log(currentStream)
        // myAudio.current.srcObject = currentStream;
        // console.log(myAudio)
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

          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center" alignItems="center">
            
            <video playsInline muted={mute} ref={myVideo} autoPlay className={videoon ? (classes.video1) : (classes.video2)} />
            {
              !videoon ? (
                <div className={classes.camOff}  >
                  <Typography variant="h3" className={classes.camOffText}>Camera is Off</Typography>
                <video playsInline muted={false} style={{width:"0",height:"0"}} />
                </div>
              ) : null
            }
            <hr style={{ borderWidth: 0 }} />
            <div className={classes.actionBtns}>
              <IconButton onClick={handleClickMute}>
                {
                  !mute ? (<MicNoneSharpIcon fontSize="large" color="primary" />) : (<MicOffOutlinedIcon fontSize="large" color="primary" />)
                }
              </IconButton>
              <IconButton onClick={handleClickVideo}>
                {
                  videoon ? (<VideocamIcon fontSize="large" color="primary" />) : (<VideocamOffIcon fontSize="large" color="primary" />)
                }
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={10} sm={12} md={12} lg={4}  className={classes.descText} >
            <br /><br /><br /><br />
            <Typography variant="h4" gutterBottom>Ready To Join ? </Typography>
            <br />
            <Typography variant="h5">
              You will join when someone lets you in..
            </Typography>
            <br />
            <div style={{
              display:"flex",
             
            }}>
              <Button className={classes.btn}  outlined>
                Join Now
              </Button>
              <Button className={classes.btn} outlined>
                Present
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