
import React, { useEffect, useRef, useState } from 'react'
import { Box, Paper,makeStyles, Grid,IconButton, Button } from '@material-ui/core'
import MicNoneSharpIcon from '@material-ui/icons/MicNoneSharp';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CallEndIcon from '@material-ui/icons/CallEnd';

const useStyles = makeStyles((theme)=>({
    mainPaper:{
        padding:"0.3em"
    },
    callBtns:{
        margin:"0.2em",
        padding:"0",
        borderRadius:"75%",
        minWidth:"auto"
    }
}))

const CallPageFooter = () => {
    const classes = useStyles()
    const [mute,setMute] = useState(true)
    const [videoon,setVideoOn] = useState(true)
    
    
    const handleClickMute = ()=>{
        setMute(prev=>!prev)
    }

    const handleClickVideo = ()=>{
        setVideoOn(prev=>!prev)
    }

    const handleEndCall = ()=>{
        console.log("call ended")
    }

    return (
        <Box position="absolute" bottom="0" left="0" width="100%">
            <Paper className={classes.mainPaper}>
                <Grid container>
                    <Grid item sm="4">

                    </Grid>
                    <Grid item sm="8">
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
                    <Grid item sm="4">

                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default CallPageFooter
