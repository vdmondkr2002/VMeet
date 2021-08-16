import {SET_LINK,SET_ADMINID} from '../constants/actions'

const callReducer = (callData={code:''},action)=>{
    switch(action.type){
        case SET_LINK:
            return {callData,code:action.payload};
        case SET_ADMINID:
            return {callData,adminId:action.payload};
        default:
            return callData;
    }
}

export default callReducer;