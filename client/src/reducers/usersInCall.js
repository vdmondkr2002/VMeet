import {SET_USERS, SET_USER_LEFT, SET_VIDEO_OFF, SET_VIDEO_ON} from '../constants/actions'

const usersInCallReducer = (usersInCall=[],action)=>{
    switch (action.type) {
        case SET_USERS:
            console.log("SETTING USER: ",action.payload)
            return usersInCall.findIndex(user=>user.id===action.payload.id)===-1?[...usersInCall,action.payload]:usersInCall;
        case SET_VIDEO_OFF:
            return usersInCall.map(user=>user.id===action.payload?{...user,videoOn:false}:user)
        case SET_VIDEO_ON:
            return usersInCall.map(user=>user.id===action.payload?{...user,videoOn:true}:user)
        case SET_USER_LEFT:
            
            return usersInCall.filter(user=>user.id!==action.payload)
        default:
            return usersInCall
    }
}

export default usersInCallReducer;