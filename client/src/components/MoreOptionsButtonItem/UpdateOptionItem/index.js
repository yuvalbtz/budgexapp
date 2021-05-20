import React from 'react'
import {makeStyles, MenuItem} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { SET_UpdateItem_Modal_Open } from '../../../Redux/actionTypes'

const useStyles = makeStyles((theme) => ({
    Update:{
        fontFamily:'Varela Round',
        fontWeight:'bold'  
      },
   }))




function Index({item}) {
    
    const classes = useStyles()
   


    const dispatch = useDispatch()

    function handleClickOpen(){
        dispatch({type:SET_UpdateItem_Modal_Open, payload:item})
    }
    
    
    
    
    return (
       
      <MenuItem className={classes.Update} onClick={handleClickOpen} >עדכן פריט</MenuItem>
      
    )
}

export default Index
