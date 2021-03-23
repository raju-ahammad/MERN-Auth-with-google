import { combineReducers } from 'redux'
import auth from './authReducers'
import jobPosts from './jobsReducers'
import token from './tokenReducers'
import users from './userReducer'
export default combineReducers({ auth, token, users, jobPosts })