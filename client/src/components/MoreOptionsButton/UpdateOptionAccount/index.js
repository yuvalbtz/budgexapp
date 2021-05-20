import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import { SET_UpdateAccount_Modal_Open } from '../../../Redux/actionTypes';
const useStyles = makeStyles(() => ({

    Update:{
        fontFamily:'Varela Round',
        fontWeight:'bold'  
      }
}))


function Index({accountDetails}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    
    
    return (
        <MenuItem 
        className={classes.Update} 
        onClick={() => dispatch({type:SET_UpdateAccount_Modal_Open, payload:accountDetails})}>
            עדכן חשבון
            </MenuItem>
    )
}

export default Index