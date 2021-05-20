import {SET_USER, SET_USER_LOGOUT} from '../actionTypes'


        
const InitialState = {
    isAuthenticated:false,
    userDetails:null
}



export function userReducer( state=InitialState, action){
          switch(action.type){
             case SET_USER:
                 return{
                     ...state,
                     isAuthenticated:true,
                     userDetails:action.payload,
                 }
                 case SET_USER_LOGOUT:
                 return{
                     ...state,
                     isAuthenticated:false,
                     userDetails:null,
                 }

                 default:
                     return state;
          }
}



