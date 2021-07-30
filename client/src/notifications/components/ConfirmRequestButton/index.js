import { useMutation } from '@apollo/client'
import { CircularProgress, ListItem } from '@material-ui/core'
import React from 'react'
import gql from 'graphql-tag'


function ConfirmRequest({setLoading,accountId, userId}){
  
  const [confirmRequest,{loading}] = useMutation(CONFIRM_REQUEST,{
    variables:{
          accountId,
          userId
      },
      onCompleted:() => setLoading(false),
      onError:(err) => console.log(err),
      refetchQueries:[{
        query:GET_USER_MATUAL_ACCOUNTS,
        variables:{
          accountId,
          userId}}]
      })
  
  
  
  return (
    <>
      <ListItem 
       style={{
           justifyContent:'center',
           backgroundColor:'green',
           color:'white'}}  
           button 
           type="button"
           name="Confirm"
           component="button"
           onClick={(e) =>{
            confirmRequest() 
            setLoading(true)
           }}>
           
       אשר
      </ListItem>
    
      </>)
   

}


function RemoveRequest({setLoading,accountId, userId}){
  
  const [removeRequest,{loading}] = useMutation(REMOVE_REQUEST,{
    variables:{
          accountId,
          userId
      },
      onCompleted:() => setLoading(false),
      onError:(err) => console.log(err),
      refetchQueries:[{
        query:GET_USER_MATUAL_ACCOUNTS,
        variables:{
          accountId,
          userId}}]
      })
  
  
  
  return (
    <>
      <ListItem 
        style={{
          justifyContent:'center', 
          backgroundColor:'red',
          color:'white'}}  
          button 
          type="submit" 
          component="button"
          name="Remove"
          onClick={(e) =>{
            removeRequest()
            setLoading(true) 
          }}>
          התעלם
         </ListItem>
    
      </>)
   

}



function Index({accountId, userId}) {
   
  const [loading, setLoading] = React.useState(false)
   
    return (
      <>
     { loading ? (<CircularProgress size={35} color='primary' style={{margin:'0 auto'}} />)
      :
    (<>
      <RemoveRequest accountId={accountId} userId={userId} setLoading={setLoading} />
      <ConfirmRequest accountId={accountId} userId={userId} setLoading={setLoading}/>
    </>)
    }
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
}


`;


const REMOVE_REQUEST = gql`
mutation removeRequest($accountId:ID!, $userId:ID!){
  removeRequest(accountId:$accountId, userId:$userId){
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