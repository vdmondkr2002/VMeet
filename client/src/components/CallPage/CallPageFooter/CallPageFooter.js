
import React, { useEffect, useRef, useState } from 'react'
import { Box, Paper,makeStyles, Grid,IconButton, Button,Typography } from '@material-ui/core'
import MicNoneSharpIcon from '@material-ui/icons/MicNoneSharp';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CallEndIcon from '@material-ui/icons/CallEnd';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import InfoIcon from '@material-ui/icons/Info';

import moment from 'moment'

const useStyles = makeStyles((theme)=>({
    mainPaper:{
        padding:"0.3em"
    },
    callBtns:{
        margin:"0.2em",
        padding:"0",
        borderRadius:"75%",
        minWidth:"auto"
    },
    leftCont:{
        display:"flex",
        alignItems:"center"
    },
    time:{
        fontWeight:"bold"
    },
    midCont:{
        display:"flex",
        justifyContent:"center"
    },
    rightCont:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
}))

const CallPageFooter = ({myVideo,stream,setStream,videoon,setVideoOn}) => {
    const classes = useStyles()
    const [mute,setMute] = useState(true)
    const [time,setTime] = useState(Date.now())
    
    const initWebRTC = async()=>{
        const currStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        setStream(currStream)

        myVideo.current.srcObject = currStream;

    }

    const handleClickMute = ()=>{
        setMute(prev=>!prev)
    }
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(Date.now())
        }, 60000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const handleClickVideo = ()=>{
        setVideoOn(prev=>!prev)
        if(myVideo.current.srcObject){
            stream.getTracks().forEach(track => track.stop());
            myVideo.current.srcObject = null
        }else{
            initWebRTC()
        }
    }

    const handleEndCall = ()=>{
        console.log("call ended")
    }

    return (
        <Box position="absolute" bottom="0" left="0" width="100%">
            {/* <Paper className={classes.mainPaper}> */}
                <Grid container>
                    <Grid item sm="3" className={classes.leftCont}>
                        <Typography variant="h6" className={classes.time}>
                            {moment(time).format(' h:mm a|')}
                        </Typography>
                    </Grid>
                    <Grid item sm="6" className={classes.midCont}>
                        <Button className={classes.callBtns} color={mute?"secondary":"default"} variant="contained">
                        <IconButton color="inherit" onClick={handleClickMute}>
                            {
                            !mute?(<MicNoneSharpIcon fontSize="medium"  color="primary" />):(<MicOffOutlinedIcon fontSize="medium"  color="primary" />)
                            }
                        </IconButton>
                        </Button>
                        <Button className={classes.callBtns} color={!videoon?"secondary":"default"} variant="contained">
                        <IconButton onClick={handleClickVideo}>
                            {
                                videoon?(<VideocamIcon fontSize="medium"  color="primary" />):(<VideocamOffIcon fontSize="medium"  color="primary" />)
                            }
                        </IconButton>
                        </Button>
                        <Button className={classes.callBtns} variant="contained">
                        <IconButton>
                            <PresentToAllIcon fontSize="large" color="primary"/>
                        </IconButton>
                        </Button>
                        <Button className={classes.callBtns} color="secondary" variant="contained">
                            <IconButton onClick={handleEndCall}>
                                <CallEndIcon fontSize="medium" color="primary"/>
                            </IconButton>
                        </Button>
                    </Grid>
                    <Grid item sm="3" className={classes.rightCont}>
                        <IconButton>
                            <PeopleIcon fontSize="large" color="primary"/>
                        </IconButton>
                        <IconButton>
                            <ChatIcon fontSize="large" color="primary"/>
                        </IconButton>
                        <IconButton>
                            <InfoIcon fontSize="large" color="primary"/>
                        </IconButton>
                    </Grid>
                </Grid>
            {/* </Paper> */}
        </Box>
    )
}

export default CallPageFooter
