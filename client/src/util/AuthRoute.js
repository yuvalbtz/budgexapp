import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useParams} from 'react-router-dom';


function AuthRoute({ component: Component, userf,...rest}) {
   console.log("cookie",document.cookie.split('id2=')[1]);
   //const user = useSelector(state => state.userReducer)
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


