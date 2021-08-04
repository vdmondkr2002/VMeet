import {GET_PROFILE,LOGOUT,SET_ISADMIN,SET_STREAM,TOGGLE_MIC,TOGGLE_VIDEO} from '../constants/actions'

const userReducer = (userData={isAdmin:false,stream:null,micOn:true,videoOn:true},action)=>{
    switch (action.type) {
        case SET_STREAM:
            return {...userData,stream:action.payload}
        case SET_ISADMIN:
            return {...userData,isAdmin:true}
        case TOGGLE_MIC:
            const micOn = userData.micOn;
            return {...userData,micOn:!micOn};
        case TOGGLE_VIDEO:
            const videoOn = userData.videoOn;
            return {...userData,videoOn:!videoOn};
        case LOGOUT:
            return {};
        default:
            return userData
    }
}

export default userReducer;