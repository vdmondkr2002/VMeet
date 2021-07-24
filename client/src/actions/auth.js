import { GET_PROFILE,LOGOUT } from '../constants/actions'
import decode from 'jwt-decode'
const api = require('../api/index')


export const googleSignIn = (formData)=>async(dispatch)=>{
    try{
        console.log(formData)
        const {data} = await api.googleSignIn(formData)
        console.log(data)
        localStorage.setItem('meetToken',JSON.stringify(data))
        dispatch(loadUser())
    }catch(err){
        console.log(err)
    }
}

export const loadUser = ()=>async(dispatch)=>{
    try{
        console.log("loading user")
        if(localStorage.getItem('meetToken')){
            console.log("user found")
            const token = localStorage.getItem('meetToken')
            const decodedToken = decode(token);
            if((decodedToken.exp*1000 < new Date().getTime())){
                // dispatch({type:LOGOUT})
                localStorage.removeItem('meetToken');
            }else{
                const {data} = await api.getCurrentUser();
                dispatch({type:GET_PROFILE,payload:data})
            }
        }
    }catch(err){
        console.log(err)
    }
}

export const logOut = (history)=>async(dispatch)=>{
    dispatch({type:LOGOUT})
    localStorage.removeItem('meetToken');
    history.push('/')
    window.location.reload()
}