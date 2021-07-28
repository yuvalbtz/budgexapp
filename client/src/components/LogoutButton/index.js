import React from 'react'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Fab from '@material-ui/core/Fab';
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import history from '../../util/history'
import {useDispatch} from 'react-redux'
import { SET_Current_Account_Ui, SET_USER_LOGOUT } from '../../Redux/actionTypes';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  
}))



function Index() {
    const dispatch = useDispatch()
    
    const classes = useStyles()
    const [logOut, { loading }] = useMutation(USER_LOG_OUT, {
        update(_,) {
            dispatch({type:SET_Current_Account_Ui, payload:null})
            dispatch({type:SET_USER_LOGOUT})
            localStorage.clear()          
            history.push('/');
        },
       
      });
    
     function handlelogout(){
        logOut()
      }
    
    
    
    return (
        
      <li  
      onClick={handlelogout} 
      className={classes.logOutButton}>
        התנתק
      </li>        
    )
}

export default Index



const USER_LOG_OUT = gql`
mutation{
    logout
    }
`;