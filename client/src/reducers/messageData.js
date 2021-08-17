import {SET_MESSAGE_DATA} from '../constants/actions'

const messageDataReducer = (messageData={message:"",sender:""},action)=>{
    switch (action.type) {
        case SET_MESSAGE_DATA:
            console.log("SETTING MessageData : ",action.payload)

            return messageData = action.payload;
        default:
            return messageData
    }
}

export default messageDataReducer;