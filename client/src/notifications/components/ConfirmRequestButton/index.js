import { useMutation } from '@apollo/client'
import { ListItem } from '@material-ui/core'
import React from 'react'
import gql from 'graphql-tag'
import { useSelector } from 'react-redux';
function Index({accountId, userId}) {
   
   
    const user = useSelector(state => state.userReducer.userDetails)
   
   
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
        <ListItem 
        style={{
            justifyContent:'center',
            backgroundColor:'green',
            color:'white'}}  
            button 
            type="button"
            component="button"
            onClick={() => ConfirmRequest()}
            >
        אשר
       </ListItem> 
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
}


`;


const GET_NOTIFICATIONS = gql`
{
  getNotifications{
    id
    body
    accountTitle
    senderName
    senderImageUrl
    isIgnored
    isConfirmed
    seen
    accountId
    to
    from
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