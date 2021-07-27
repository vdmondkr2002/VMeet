
import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'
import { Container,Grid,makeStyles, Paper,Avatar,Box, Typography } from '@material-ui/core'
import CallPageFooter from './CallPageFooter/CallPageFooter'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SET_STREAM } from '../../constants/actions'
import People from './PeopleDrawer/People'



const drawerWidth = 380;

const useStyles = makeStyles((theme)=>({
    // root: {
    //     display: 'flex',
    // },
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
    },
    content: {
        height:"90vh",
        flexGrow: 1,
        margin:"auto",
        // padding: theme.spacing(3),
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        
    },
    contentShift: {
        height:"90vh",
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        width:0,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
}))

const peer = null;

const CallPage = () => {
    const classes = useStyles()
    const myStream = useRef();
    const history = useHistory()
    const dispatch = useDispatch()
    const profile = useSelector(state=>state.profile)
    const user = useSelector(state=>state.user)
    
    const [peopleOpen,setPeopleOpen] = useState(false)
    
    

    
    const initWebRTC = async()=>{
        const currStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        dispatch({type:SET_STREAM,payload:currStream})

        myStream.current.srcObject = currStream;
    }

    useEffect(()=>{
        if(!user.isAdmin){
            history.push('/join')
        }
    },[])
    
    // useEffect(()=>{
    //     if(user.videoOn)
    //         initWebRTC();
    // },[])

    

   
    

    
    return (
        <div className={classes.root}>
        <Container className={clsx(classes.content,{
            [classes.contentShift]: peopleOpen,
          })}>
            <Grid container className={classes.usersCont} spacing={2}>
                <Grid item sm={6} xs={12} className={classes.userCont}>
                        <video playsInline className={user.videoOn?classes.video:classes.offvideo} muted ref={myStream} autoPlay/>
                        {
                            !user.videoOn?(
                                <Paper className={classes.userPaper}>
                                    <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                                            {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                                    </Avatar>
                                    <div className={classes.bottomline}>
                                        <Typography variant="body1">
                                            {profile.name}
                                        </Typography>
                                    </div>
                                    
                                </Paper>
                            ):null
                        }
                        
                    {/* <Paper className={classes.userPaper}> */}
                        {/* User 1 */}
                        
                    {/* </Paper> */}
                </Grid>
                <Grid item sm={6} xs={12} className={classes.userCont}>
                    {/* <Paper className={classes.userPaper}> */}
                    {/* User 2 */}
                        {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                        <video playsInline className={user.videoOn?classes.video:classes.offvideo} muted ref={myStream} autoPlay/>
                        {
                            !user.videoOn?(
                               <Paper className={classes.userPaper}>
                                    <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                                            {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                                    </Avatar>
                                </Paper>
                            ):null
                        }
                    {/* </Paper> */}
                </Grid>
                <Grid item sm={6} xs={12} className={classes.userCont}>
                    {/* <Paper className={classes.userPaper}> */}
                    {/* User 3 */}
                        {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                        <video playsInline className={user.videoOn?classes.video:classes.offvideo} muted ref={myStream} autoPlay/>
                        {
                            !user.videoOn?(
                               <Paper className={classes.userPaper}>
                                    <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                                            {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                                    </Avatar>
                                </Paper>
                            ):null
                        }
                    {/* </Paper> */}
                </Grid>
                <Grid item sm={6} xs={12} className={classes.userCont}>
                        <video playsInline className={user.videoOn?classes.video:classes.offvideo} ref={myStream} autoPlay/>
                        {
                            !user.videoOn?(
                               <Paper className={classes.userPaper}>
                                    <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                                            {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
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
            <div className={classes.drawerHeader} />
            <CallPageFooter peopleOpen={peopleOpen} setPeopleOpen={setPeopleOpen} myStream={myStream} />
        </Container>
        <People open={peopleOpen} setDrawerOpen={setPeopleOpen}/>
        </div>
    )
}

export default CallPage


// stop both mic and camera
// function stopBothVideoAndAudio(stream) {
//     stream.getTracks().forEach(function(track) {
//         if (track.readyState == 'live') {
//             track.stop();
//         }
//     });
// }

// // stop only camera
// function stopVideoOnly(stream) {
//     stream.getTracks().forEach(function(track) {
//         if (track.readyState == 'live' && track.kind === 'video') {
//             track.stop();
//         }
//     });
// }

// // stop only mic
// function stopAudioOnly(stream) {
//     stream.getTracks().forEach(function(track) {
//         if (track.readyState == 'live' && track.kind === 'audio') {
//             track.stop();
//         }
//     });
// }
