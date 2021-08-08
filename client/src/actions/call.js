import { SET_ALERT, SET_ISADMIN, SET_LINK } from '../constants/actions';
const api = require('../api/index')


export const createLink = ()=>async(dispatch)=>{
    try{
        const {data} = await api.createLink();
        console.log(data)
        dispatch({type:SET_LINK,payload:data.code})
    }catch(err){
        console.log(err)
    }
}

export const joinCall1 = (history,code,userId)=>async(dispatch)=>{
    try{
        console.log("Hello")
        const {data}=await api.joinCall1(code);
        
        console.log(data)
        if(data.adminId===userId){
            dispatch({type:SET_ISADMIN})
        }
        history.push(`/join/${code}`);
    }catch(err){ 
        // console.log(err.data.msg)
        if(err.response){
            const data = err.response.data
            dispatch({type:SET_ALERT,payload:{msg:data.msg}})
        }
    }
}