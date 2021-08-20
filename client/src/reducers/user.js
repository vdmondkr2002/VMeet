import {GET_PROFILE,LOGOUT,SET_ISADMIN,SET_STREAM,TOGGLE_MIC,TOGGLE_VIDEO,SET_AUDIOTRACK,SET_VIDEOTRACK,SET_SOCKETID,SET_CLICKED, SET_ADMITID,SET_MULTIPLES_ADMITS} from '../constants/actions'

const userReducer = (userData={isAdmin:false,stream:null,micOn:true,videoOn:true,audioTrack:null,videoTrack:null,socketId:null,clicked:0,toAdmitId:{},admitIds:[]},action)=>{
    switch (action.type) {
        case SET_STREAM:
            return {...userData,stream:action.payload}
        case SET_ISADMIN:
            return {...userData,isAdmin:true}
        case SET_AUDIOTRACK:
            return {...userData,audioTrack:action.payload}
        case SET_VIDEOTRACK:
            return {...userData,videoTrack:action.payload}
        case SET_SOCKETID:
            console.log(action.payload)
            return {...userData,socketId:action.payload}
        case TOGGLE_MIC:
            const micOn = userData.micOn;
            return {...userData,micOn:!micOn};
        case TOGGLE_VIDEO:
            const videoOn = userData.videoOn;
            return {...userData,videoOn:!videoOn};
        case SET_CLICKED:
            const clicked = userData.clicked;
            return {...userData,clicked:clicked+1}
        case SET_ADMITID:
            return {...userData,toAdmitId:action.payload}
        case SET_MULTIPLES_ADMITS:
            return {...userData,admitIds:action.payload}
        case LOGOUT:
            return {};
        default:
            return userData
    }
}

export default userReducer;