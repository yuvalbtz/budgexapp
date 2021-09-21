import React,{useParams} from 'react'
import {makeStyles, MenuItem} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { SET_UpdateItem_Modal_Open } from '../../../../Redux/actionTypes'

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    Update:{
        fontFamily:'Varela Round',
        fontWeight:'bold'  
      },
   }))




function Index({item}) {
  const params = useParams()
    const classes = useStyles()
   


    const dispatch = useDispatch()

    function handleClickOpen(){
     dispatch({type:SET_UpdateItem_Modal_Open, payload:item})
    }
    
    
    
    
    return (
       
      <MenuItem className={classes.Update} component={Link} to={`/matualAccounts/${params.accountId}/updateItem/${item.id}`} onClick={handleClickOpen} >עדכן פריט</MenuItem>
      
    )
}

export default Index
