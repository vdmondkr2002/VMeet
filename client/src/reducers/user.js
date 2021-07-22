import {GET_PROFILE} from '../constants/actions'

const userReducer = (userData={},action)=>{
    switch (action.type) {
        case GET_PROFILE:
            return action.payload;
        default:
            return userData
    }
}

export default userReducer;