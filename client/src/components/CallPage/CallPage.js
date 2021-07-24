
import React, { useEffect, useRef, useState } from 'react'
import { Container,makeStyles } from '@material-ui/core'
import CallPageFooter from './CallPageFooter/CallPageFooter'

const useStyles = makeStyles((theme)=>({
    mainCont:{
        height:"100vh",
    }
}))
const CallPage = () => {
    const classes = useStyles()
    const myVideo = useRef();
    const [stream,setStream] = useState(true)


    

    
    return (
        <Container className={classes.mainCont}>
            <CallPageFooter/>
        </Container>
    )
}

export default CallPage
