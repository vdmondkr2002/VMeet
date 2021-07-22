import React, { useEffect, useState,useRef } from 'react';
import { Grid, Typography, Paper, makeStyles, IconButton ,Button} from '@material-ui/core';
import MicNoneSharpIcon from '@material-ui/icons/MicNoneSharp';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import blankImg from "../JoiningPage/VideOff.png"
import { Mic, VideocamOff } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  video1: {
    borderRadius:"20px",
    width: '650px',
  
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  video2:{
      width:"0",
  },
 
  offvideo:{
    width: '100%',
    height:"60vh",
    
  },
  gridContainer: {
    margin:"10px 20px 10px 100px",
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    border: '2px solid black',
    borderRadius: "10px",
  },
  actionBtns : {
        // marginTop:"-100px",
        // marginLeft:"320px",
        zIndex:"10",
        display:"flex",
        width:"650px",
        height:"auto",
        color:"white",
        justifyContent :"center",
        border :"1px solid black"

  }
}));

const JoiningPage = () => {
  
  const [stream,setStream] = useState(true)
  const [mute,setMute] = useState(true)
  const [videoon,setVideoOn] = useState(true)
  const classes = useStyles();
  const myVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

  }, []);

  const handleClickMute = ()=>{
      setMute(prev=>!prev)
  }

  const handleClickVideo = ()=>{
    setVideoOn(prev=>!prev)
    
    if(myVideo.current.srcObject){
        stream.getTracks().forEach(track => track.stop());
        myVideo.current.srcObject = null
    }else{
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);

            myVideo.current.srcObject = currentStream;
        });
    }
    
  }

  return (
    <Grid container className={classes.gridContainer}>
        <br />
      {stream && (
       <>
          <Grid item xs={8} md={6}  >
            <video  playsInline muted={mute} ref={myVideo} autoPlay className={videoon?(classes.video1):(classes.video2)} />
            {
                !videoon?(
                    <div style={{
                        width:"650px",
                        height:"60vh",
                        marginTop:"0px",
                        background: "#080808",
                        borderRadius:"20px",
                        // background: "-webkit-linear-gradient(to right, #ffefba, #ffffff)",  
                        // background: "linear-gradient(to right, #ffefba, #ffffff)", 

                        }} >
                        <Typography variant="h3" style={{
                            textAlign:"center",
                            paddingTop:"180px",
                            fontSize :"38px",
                            color:"white",


                        }}>Camera is Off</Typography>
                         
                    </div>
                ):null
            }
            <hr style={{borderWidth:0}}/>
            <div className={classes.actionBtns}>
                <IconButton onClick={handleClickMute}>
                {
                    !mute?(<MicNoneSharpIcon fontSize="large"  color="primary" />):(<MicOffOutlinedIcon fontSize="large"  color="primary" />)
                }
            </IconButton>
            <IconButton onClick={handleClickVideo}>
                {
                    videoon?(<VideocamIcon fontSize="large"  color="primary" />):(<VideocamOffIcon fontSize="large"  color="primary" />)
                }
            </IconButton>
            </div>
          </Grid>
          <Grid item xs={4} md={3} style={{
              borderRadius:"20px",
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
              alignItems:"center",
            
          }}>
            <Typography variant="h4" gutterBottom>Ready To Join ? </Typography>  
            <br />
            <Typography variant="h5">
                You will join when someone lets you in..
            </Typography>
            <Button color="primary">
                Join Now
            </Button>
            <br />
            <CircularProgress color="secondary" />
          </Grid>
          
     </>
        
      )}
    </Grid>
  );
};

export default JoiningPage;