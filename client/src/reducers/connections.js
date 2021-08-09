import {ADD_CONN,UPDATE_CONN} from '../constants/actions'

const connectionsReducer = (connections={},action)=>{
    switch (action.type) {
        case ADD_CONN:
            return {...connections,[action.payload.socketId]:action.payload.peer}
        default:
            return connections
    }
}

export default connectionsReducer;