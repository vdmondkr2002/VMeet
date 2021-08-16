import {SET_USERS_JOIN,REMOVE_USERS_JOIN} from '../constants/actions'

const usersInCallReducer = (usersToJoin=[],action)=>{
    switch (action.type) {
        case SET_USERS_JOIN:
            console.log("ADDING IN QUEUE: ",action.payload)
            return usersToJoin.findIndex(user=>user.id===action.payload.id)===-1?[...usersToJoin,action.payload]:usersToJoin;
        case REMOVE_USERS_JOIN:
            console.log("Removing user"+action.payload)
            return usersToJoin.filter(user=>user.id!==action.payload)
        default:
            return usersToJoin
    }
}

export default usersInCallReducer;