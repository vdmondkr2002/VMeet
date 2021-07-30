import { SET_LINK } from '../constants/actions';
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