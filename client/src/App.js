import React,{useEffect} from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom';
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
   console.log = () => {}
 
  const {data, loading} = useQuery(GET_USER_STATE);
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.userReducer)
  

useEffect(() => {
  
 if(data){
   if(data.getUserState){
    dispatch({type:SET_USER, payload:data.getUserState})
  }else if(!document.cookie.split('id2=')[1] || !localStorage.getItem("id")){
    dispatch({type:SET_USER_LOGOUT})
    localStorage.clear()
    history.push('/')
   }
 }
 
 console.log(data);
  
  },[data,dispatch])   
 
  
  
  
  if(loading){
    return (<SplashScreen/>)
  }else if(!data){
   localStorage.clear()
    history.push('/')
  }

console.log("APP", user);



  return (
    
    <div className="App">
   
     <Switch>
     <Route exact path="/" component={HomePage}/>

     <Route exact path="/login" component={HomePage}/>
     <Route exact path="/register" component={HomePage}/>
     
    
    {/* notifications Route */}
    <AuthRoute exact path='/notifications'  component={UserPage} />
    
   

    {/* profile Routs */}
     <AuthRoute exact path='/profile'  component={UserPage} />
     <AuthRoute exact path='/profile/edit'  component={UserPage} />
    

     {/* my Accounts Routs */}
     <AuthRoute exact path='/myAccounts' component={UserPage} />
     <AuthRoute exact path='/myAccounts/addAccount' component={UserPage}/>
     <AuthRoute exact path='/myAccounts/deleteAccount/:accountId' component={UserPage}/>
     <AuthRoute exact path='/myAccounts/updateAccount/:accountId' component={UserPage}/>
     <AuthRoute exact path='/myAccounts/search'  component={UserPage}/>

     <AuthRoute exact path='/myAccounts/:accountId'  component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/addItem'  component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/updateItem/:itemId'  component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/deleteItem/:itemId'  component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/statis'  component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/showImage' component={SingleAccount} />
     <AuthRoute exact path='/myAccounts/:accountId/search'  component={SingleAccount}/>


     {/* my matualAccounts Routs */}
     <AuthRoute exact path='/matualAccounts'  component={UserPage} />
     <AuthRoute exact path='/matualAccounts/addAccount'  component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/deleteAccount/:accountId'  component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/updateAccount/:accountId'  component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/LeaveAccount/:accountId'  component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/search'  component={UserPage}/>
     <AuthRoute exact path='/matualAccounts/:accountId/ShowAccountFreinds'  component={UserPage}/>

     <AuthRoute exact path='/matualAccounts/:accountId'  component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/addItem'  component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/updateItem/:itemId'  component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/deleteItem/:itemId'  component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/statis'  component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/showImage'  component={SingleMatualAccount} />
     <AuthRoute exact path='/matualAccounts/:accountId/search'  component={SingleMatualAccount}/>
    
    
     <Route component={PageNotFound}/>
     </Switch>
   </div>
 
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
