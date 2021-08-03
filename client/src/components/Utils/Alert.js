import React,{useState,useEffect} from 'react'
import {Snackbar} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ALERT } from '../../constants/actions'
const Alert = ({vertical,horizontal,openAlert,setOpenAlert}) => {
    const dispatch = useDispatch()
    const alert = useSelector(state => state.alert)
    const [msg,setMsg] = useState('')
    useEffect(()=>{
        setMsg(alert.msg)
    },[alert.msg])
    const handleClose = ()=>{
        setOpenAlert(false)
        dispatch({type:CLEAR_ALERT})
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openAlert}
                onClose={handleClose}
                autoHideDuration={5000}
                message={msg}
                key={vertical + horizontal}
            />
        </div>
    )
}

export default Alert
