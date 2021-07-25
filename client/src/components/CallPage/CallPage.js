
import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'
import { Container, Grid, makeStyles, Paper } from '@material-ui/core'
import CallPageFooter from './CallPageFooter/CallPageFooter'



const useStyles = makeStyles((theme) => ({
    mainCont: {
        height: "100vh",
    },
    vidCont: {
        maxWidth: "100%",
        height: "100%",
        objectFit: "cover"
    },
    usersCont: {
        height: "100%"
    },
    userPaper: {
        maxWidth: "100%",
        height: "100%",
        borderRadius: "5%"
    },
    video: {
        maxWidth: "100%",
        height: "100&",
        borderRadius: "5%"
    }
}))

const peer = null;

const CallPage = () => {
    const classes = useStyles()
    const myVideo = useRef();

    const videoAvailable = false;
    const audioAvailable = false;

        const getPermissions = async () => {

            try {
                await navigator.mediaDevices.getUserMedia({ video: true })
                    .then(() => videoAvailable = true)
                    .catch(() => videoAvailable = false)
                await navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(() => audioAvailable = true)
                    .catch(() => audioAvailable = false)
                if (videoAvailable || audioAvailable) {
                    navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })
                        .then((stream) => {
                            window.localStream = stream
                            myVideo.current.srcObject = stream
                        })
                        .then((stream) => { })
                        .catch((e) => console.log(e))
                }

            }
            catch (err) {
                console.log(err)
            }
        }

    const [features,setFeatures] = useState({
            audio: false,
            video: false,
        })

const getMedia = async => {
    setFeatures({
        video : videoAvailable,
        audio:audioAvailable,
    
    })
}




useEffect(() => {
    getPermissions();
    getMedia();
}, [])


const [stream, setStream] = useState()
const [videoon, setVideoOn] = useState(true)
const [isAdmin, setasAdmin] = useState(true)

// const initWebRTC = async()=>{
//     const currStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
//     setStream(currStream)
//     myVideo.current.srcObject = currStream;
// }




const handleVid = () => {
    setFeatures({ video : !video } , () => getUserMedia())
}
const handleAud = () => {
    setFeatures({ audio : !audio } , () => getUserMedia())
}


return (
    <Container className={classes.mainCont}>

        <button onClick={handleVid}>
            {video === true ? (CamOn) : (camOff)}
        </button>

        <button onClick={handleAud}>
            <h4>
            {audio === true ?  AudOn : AudOff }
            </h4>
           
        </button>

        <Grid container className={classes.usersCont} spacing={2}>
            <Grid item sm={6}>
                {/* <Paper className={classes.userPaper}> */}
                {/* User 1 */}
                <video playsInline className={classes.video} muted ref={myVideo} autoPlay />
                {/* </Paper> */}
            </Grid>
            <Grid item sm={6}>
                {/* <Paper className={classes.userPaper}> */}
                {/* User 2 */}
                {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                <video playsInline className={classes.video} muted ref={myVideo} autoPlay />

                {/* </Paper> */}
            </Grid>
            <Grid item sm={6}>
                {/* <Paper className={classes.userPaper}> */}
                {/* User 3 */}
                {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                <video playsInline className={classes.video} muted ref={myVideo} autoPlay />

                {/* </Paper> */}
            </Grid>
            <Grid item sm={6}>
                {/* <Paper className={classes.userPaper}> */}
                {/* User 4 */}
                {/* <video playsInline muted ref={myVideo} autoPlay/> */}
                <video playsInline className={classes.video} muted ref={myVideo} autoPlay />

                {/* </Paper> */}
            </Grid>
        </Grid>

        <CallPageFooter myVideo={myVideo} features={features} stream={stream} setStream={setStream} videoon={videoon} setVideoOn={setVideoOn} />
    </Container>
)
}

export default CallPage
