import React, { useContext, useEffect } from 'react';
import { Route, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { SET_USER_LOGOUT } from '../Redux/actionTypes';
import UserTabs from '../pages/UserPage/Index'
function AuthRoute({ component: Component, userf,...rest}) {
   const dispach = useDispatch()
   console.log("cookie",document.cookie.split('id2=')[1]);
   //const user = useSelector(state => state.userReducer)
  console.log("user login",userf.isAuthenticated);
  
  

 return (
    <Route
      {...rest}
      render={(props) => 
       userf.isAuthenticated || localStorage.getItem("id") ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
}

export default AuthRoute;


