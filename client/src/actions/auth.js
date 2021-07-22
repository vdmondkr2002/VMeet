import { GET_PROFILE } from '../constants/actions'

const api = require('../api/index')


export const googleSignIn = (formData)=>async(dispatch)=>{
    try{
        console.log(formData)
        const {data} = await api.googleSignIn(formData)
        // localStorage.setItem('meetToken',data.token)
        dispatch({type:GET_PROFILE,payload:data})
    }catch(err){
        console.log(err)
    }
}