
import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'
import { Container,Grid,makeStyles, Paper,Avatar,Box, Typography } from '@material-ui/core'
import CallPageFooter from './CallPageFooter/CallPageFooter'
import clsx from 'clsx'
import { useSelector } from 'react-redux'



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
        borderRadius:"5%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    video:{
        maxHeight:"100%",
        maxWidth:"100%",
        // height:"100&",
        borderRadius:"5%"
    },
    offvideo:{
        display:"none"
    },
    largeAvatar: {
        margin: "auto",
        width: "150px",
        height: "150px"
    },
    userCont:{
        position:"relative"
    },
    bottomline:{
        position:"absolute",
        left:"5%",
        bottom:"5%",
    }
}))

const peer = null;

const CallPage = () => {
    const classes = useStyles()
    const myVideo = useRef();
    const [stream,setStream] = useState()
    const [videoon,setVideoOn] = useState(false)
    const [isAdmin,setasAdmin] = useState(true)
    const user = useSelector(state=>state.user)

    const initWebRTC = async()=>{
        const currStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        setStream(currStream)

        myVideo.current.srcObject = currStream;

    }

    
    
    useEffect(()=>{
        if(videoon)
            initWebRTC();
    },[])

   
    

    
    return (
        <Container className={classes.mainCont}>
            <Grid container className={classes.usersCont} spacing={2}>
                <Grid item sm={6} className={classes.userCont}>
                        <video playsInline className={videoon?classes.video:classes.offvideo} muted ref={myVideo} autoPlay/>
                        {
                            !videoon?(
                               <Paper className={classes.userPaper}>
                                    <Avatar src={user?.profilePic} className={clsx(classes.largeAvatar)} alt={user?.userName}>
                                            {user?.firstName?.charAt(0)} {user?.lastName?.charAt(0)}
                                    </Avatar>
                                    <div className={classes.bottomline}>
                                        <Typography variant="body">
                                            {user.name}
                                        </Typography>
                                    </div>
                                    
                                </Paper>
                            ):null
                        }
                        
                    {/* <Paper className={classes.userPaper}> */}
                        {/* User 1 */}
                        
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
                <Grid item sm={6} className={classes.userCont}>
                        <video playsInline className={videoon?classes.video:classes.offvideo} muted ref={myVideo} autoPlay/>
                        {
                            !videoon?(
                               <Paper className={classes.userPaper}>
                                    <Avatar src={user?.profilePic} className={clsx(classes.largeAvatar)} alt={user?.userName}>
                                            {user?.firstName?.charAt(0)} {user?.lastName?.charAt(0)}
                                    </Avatar>
                                </Paper>
                            ):null
                        }
                        
                    {/* <Paper className={classes.userPaper}> */}
                        {/* User 4 */}
                        {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                        
                    {/* </Paper> */}
                </Grid>
            </Grid>
            
            <CallPageFooter myVideo={myVideo} stream={stream} setStream={setStream} videoon={videoon} setVideoOn={setVideoOn}/>
        </Container>
    )
}

export default CallPage
