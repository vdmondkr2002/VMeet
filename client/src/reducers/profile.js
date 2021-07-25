import {GET_PROFILE,LOGOUT} from '../constants/actions'

const userReducer = (userData={},action)=>{
    switch (action.type) {
        case GET_PROFILE:
            return action.payload;
        case LOGOUT:
            return {};
        default:
            return userData
    }
}

export default userReducer;