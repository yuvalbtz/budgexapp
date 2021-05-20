import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import {uiReducer} from './uiReducer'
export const rootReducers = combineReducers({userReducer,uiReducer});