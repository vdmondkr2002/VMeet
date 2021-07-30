import {SET_LINK} from '../constants/actions'

const callReducer = (callData={code:''},action)=>{
    switch(action.type){
        case SET_LINK:
            return {callData,code:action.payload};
        default:
            return callData;
    }
}

export default callReducer;