import {SET_MESSAGES} from '../constants/actions'

const messagesReducer = (messages=[],action)=>{
    switch (action.type) {
        case SET_MESSAGES:
            console.log("SETTING Messages : ",action.payload)
            return messages = [...messages,action.payload];
        default:
            return messages
    }
}

export default messagesReducer;