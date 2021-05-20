import React, {createContext} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useDispatch, useSelector} from 'react-redux'
import { SET_USER } from '../Redux/actionTypes';
import SplashScreen from '../components/SplashScreen'
import history from '../util/history';


const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});



function AuthProvider(props) {

 
const dispatch = useDispatch()
const user = useSelector(state => state)


  const {data, loading} = useQuery(GET_USER_STATE,{onError:(err) => console.log(err)});



  
if(loading){
  return (<SplashScreen/>)
}else{
  console.log("first render!", data);
}


  
  return (
    <AuthContext.Provider
      value={{ user: user}}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

const GET_USER_STATE = gql`
query{
    getUserState{
      email
      id
      username
    }
  }


`;

