import {combineReducers} from 'redux';
import profile from './profile'
import user from './user'
import alert from './alert'
import call from './call'
import connections from './connections'
import usersInCall from './usersInCall'

export default combineReducers({profile,user,call,alert,connections,usersInCall})