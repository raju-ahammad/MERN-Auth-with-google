import { combineReducers } from 'redux'
import auth from './authReducers'
import token from './tokenReducers'
import users from './userReducer'

export default combineReducers({ auth, token, users })