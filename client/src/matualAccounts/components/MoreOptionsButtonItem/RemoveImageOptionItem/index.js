import React from 'react'
import {makeStyles, MenuItem} from '@material-ui/core'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
const useStyles = makeStyles((theme) => ({
    Update:{
        fontFamily:'Varela Round',
        fontWeight:'bold',
        color:'#d50000',
    },
   }))

function Index({accountId, itemId, image, setOpen}) {
   
    const classes = useStyles()
   

    const [deleteItemImage,{data}] = useMutation(DELETE_ITEM_IMAGE_MUTATION, {
        variables:{ 
            accountId,
            itemId,
        },
     onCompleted:() => {}, 
         refetchQueries:[{query:GET_USER_ACCOUNT, variables:{accountId}}]})




    function handleClickOpen(e){
       e.preventDefault() 
       setOpen(false)
       deleteItemImage()   
    }


    return (
        <>
        {image && <MenuItem className={classes.Update} onClick={handleClickOpen} >הסר תמונה</MenuItem>}  
       </>
    )
}

export default Index


const DELETE_ITEM_IMAGE_MUTATION = gql`

mutation deleteIteMatualmImage($accountId:ID!, $itemId:ID!){
    deleteIteMatualmImage(accountId:$accountId, itemId:$itemId)
}

`; 



const GET_USER_ACCOUNT = gql`

    query($accountId:ID!){
        getUserMatualAccount(accountId:$accountId){
            title
            id
            owner
            list{
              id
              title
              description
              media
              amount
              createdAt
            }
        }  
      }


`;