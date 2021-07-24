
import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'
import { Container,Grid,makeStyles, Paper } from '@material-ui/core'
import CallPageFooter from './CallPageFooter/CallPageFooter'



const useStyles = makeStyles((theme)=>({
    mainCont:{
        height:"100vh",
    },
    vidCont:{
       maxWidth:"100%",
       height:"100%",
       objectFit:"cover"
    },
    usersCont:{
        height:"100%"
    },
    userPaper:{
        maxWidth:"100%",
        height:"100%",
        borderRadius:"5%"
    },
    video:{
        maxWidth:"100%",
        height:"100&",
        borderRadius:"5%"
    }
}))

const peer = null;

const CallPage = () => {
    const classes = useStyles()
    const myVideo = useRef();
    const [stream,setStream] = useState()
    const [videoon,setVideoOn] = useState(true)
    const [isAdmin,setasAdmin] = useState(true)

    const initWebRTC = async()=>{
        const currStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        setStream(currStream)

        myVideo.current.srcObject = currStream;

    }

    
    
    useEffect(()=>{
        initWebRTC();
    },[])

   
    

    
    return (
        <Container className={classes.mainCont}>
            <Grid container className={classes.usersCont} spacing={2}>
                <Grid item sm={6}>
                    {/* <Paper className={classes.userPaper}> */}
                        {/* User 1 */}
                        <video playsInline className={classes.video} muted ref={myVideo} autoPlay/>
                    {/* </Paper> */}
                </Grid>
                <Grid item sm={6}>
                    {/* <Paper className={classes.userPaper}> */}
                    {/* User 2 */}
                        {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                        <video playsInline className={classes.video} muted ref={myVideo} autoPlay/>

                    {/* </Paper> */}
                </Grid>
                <Grid item sm={6}>
                    {/* <Paper className={classes.userPaper}> */}
                    {/* User 3 */}
                        {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                        <video playsInline className={classes.video} muted ref={myVideo} autoPlay/>

                    {/* </Paper> */}
                </Grid>
                <Grid item sm={6}>
                    {/* <Paper className={classes.userPaper}> */}
                        {/* User 4 */}
                        {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                        <video playsInline className={classes.video} muted ref={myVideo} autoPlay/>

                    {/* </Paper> */}
                </Grid>
            </Grid>
            
            <CallPageFooter myVideo={myVideo} stream={stream} setStream={setStream} videoon={videoon} setVideoOn={setVideoOn}/>
        </Container>
    )
}

export default CallPage
