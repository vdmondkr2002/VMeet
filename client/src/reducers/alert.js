import {CLEAR_ALERT, SET_ALERT} from '../constants/actions'

const alertReducer = (alert={msg:''},action)=>{
    switch(action.type){
        case SET_ALERT:
            return {...alert,msg:action.payload.msg};
        case CLEAR_ALERT:
            return {};
        default:
            return alert;
    }
}

export default alertReducer;