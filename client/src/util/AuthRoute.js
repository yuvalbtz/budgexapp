import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';


function AuthRoute({ component: Component,...rest}) {
   console.log("cookie",document.cookie.split('id2=')[1]);
   const userf = useSelector(state => state.userReducer)
  console.log("user login",userf && userf.isAuthenticated);
  
  

return (
    <Route
      {...rest}
      render={(props) => 
        userf && (userf.isAuthenticated || localStorage.getItem("id")) ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
}

export default AuthRoute;


