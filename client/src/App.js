import React,{useEffect} from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import SimpleReactLightbox from "simple-react-lightbox";
import AuthRoute from './util/AuthRoute'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage/Index'
import PageNotFound from './pages/PageNotFound'
import SingleAccount from './pages/SingleAccountPage'
import SingleMatualAccount from './pages/SingleMatualAccountPage'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSelector, useDispatch} from 'react-redux'
import { SET_USER, SET_USER_LOGOUT } from './Redux/actionTypes';
import history from './util/history';
import SplashScreen from './components/SplashScreen'


function App() {
  document.body.style.overflow = "hidden"
  /*  console.log = () => {} */
 
  const {data, loading} = useQuery(GET_USER_STATE);
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer)
  
  

useEffect(() => {
  
 if(data){
   if(data.getUserState){
    dispatch({type:SET_USER, payload:data.getUserState})
  }else{
    dispatch({type:SET_USER_LOGOUT})
    localStorage.clear()
    history.push('/')
   }
    dispatch({type:SET_USER, payload:data.getUserState})
 
  }else if(!document.cookie.split('id2=')[1] || !localStorage.getItem("id")){
    dispatch({type:SET_USER_LOGOUT})
    localStorage.clear()
    history.push('/')
  }
  console.log(data);
  
  },[data])   
 
  
  
  
  if(loading){
    return (<SplashScreen/>)
  }else if(!data){
   localStorage.clear()
    history.push('/')
  }

console.log("APP", user);



  return (
    <SimpleReactLightbox>
    <div className="App">
   
     <Switch>
     <Route exact path="/" component={HomePage}/>

     <Route exact path="/login" component={HomePage}/>
     <Route exact path="/register" component={HomePage}/>
     
    
    {/* notifications Route */}
    <AuthRoute exact path='/notifications' userf={user} component={UserPage} />
    
   

    {/* profile Routs */}
     <AuthRoute exact path='/profile' userf={user} component={UserPage} />
     <AuthRoute exact path='/profile/edit' userf={user} component={UserPage} />
    

     {/* my Accounts Routs */}
     <AuthRoute exact path='/myAccounts' userf={user} component={UserPage} />
     <AuthRoute exact path='/myAccounts/addAccount' userf={user} component={UserPage}/>
     <AuthRoute exact path='/myAccounts/deleteAccount/:accountId' userf={user} component={UserPage}/>
     <AuthRoute exact path='/myAccounts/updateAccount/:accountId' userf={user} component={UserPage}/>
     <AuthRoute exact path='/myAccounts/search' userf={user} component={UserPage}/>

     <AuthRoute exact path='/myAccounts/:accountId' userf={user} component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/addItem' userf={user} component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/updateItem/:itemId' userf={user} component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/deleteItem/:itemId' userf={user} component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/statis' userf={user} component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/showImage' userf={user} component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/search' userf={user} component={SingleAccount}/>


     {/* my matualAccounts Routs */}
     <AuthRoute exact path='/matualAccounts' userf={user} component={UserPage} />
     <AuthRoute exact path='/matualAccounts/addAccount' userf={user} component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/deleteAccount/:accountId' userf={user} component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/updateAccount/:accountId' userf={user} component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/LeaveAccount/:accountId' userf={user} component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/search' userf={user} component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/:accountId/ShowAccountFreinds' userf={user} component={UserPage}/>

     <AuthRoute exact path='/matualAccounts/:accountId' userf={user} component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/addItem' userf={user} component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/updateItem/:itemId' userf={user} component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/deleteItem/:itemId' userf={user} component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/statis' userf={user} component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/showImage' userf={user} component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/search' userf={user} component={SingleMatualAccount}/>
    
    
     <Route component={PageNotFound}/>
     </Switch>
   </div>
   </SimpleReactLightbox>
  );
}

export default App;

const GET_USER_STATE = gql`
{
    getUserState{
      email
      id
      username
      profileImageUrl
    }
  }


`;
