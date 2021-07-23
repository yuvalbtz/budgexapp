import { useMutation } from '@apollo/client'
import { CircularProgress, ListItem } from '@material-ui/core'
import React from 'react'
import gql from 'graphql-tag'

function Index({accountId, userId}) {
    
    const [ConfirmRequest,{loading}] = useMutation(CONFIRM_REQUEST,{
        variables:{
              accountId,
              userId
          },
          onCompleted:() => console.log("notification"),
          onError:(err) => console.log(err),
          refetchQueries:[{
            query:GET_USER_MATUAL_ACCOUNTS,
            variables:{accountId,
            userId}}]
          })
    
    
    
    
    return (
        <>
           {loading ? (<CircularProgress size={35} style={{margin:'0 auto', color:'red'}} />)
           : (<ListItem style={{
            justifyContent:'center', 
            backgroundColor:'red',color:'white'}}  
            button type="submit" 
            component="button"
            onClick={() => ConfirmRequest()}>
             בטל הצטרפות מחשבון זה
            </ListItem>  )}
           
              
        </>
    )
}

export default Index

const CONFIRM_REQUEST = gql`

mutation confirmRequest($accountId:ID!, $userId:ID!){
    confirmRequest(accountId:$accountId, userId:$userId){
    id
    senderName
    senderImageUrl
    accountTitle
    accountId
    from
    to
    body
    seen
    isConfirmed
    isIgnored
    createdAt
    updatedAt
    }
}`;


const GET_USER_MATUAL_ACCOUNTS = gql`
{
  getUserMatualAccounts{
    id
    createdAt
    updatedAt
    owner
    ownerName
    title
    members {
      userId
      isConfirmed
      isIgnored
    
  }
}
}
`;