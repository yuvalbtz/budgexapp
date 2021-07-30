import React from 'react'
import Navbar from '../Navbar'
import {Footer} from './LayoutElements'
import gql from 'graphql-tag'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { SET_NotificationsCount } from '../../Redux/actionTypes'
import { useParams } from 'react-router'



function Index({children}) {
   const params = useParams()
    const user = useSelector(state => state.userReducer.userDetails)
    const dispatch = useDispatch()

    const {data,loading, subscribeToMore} = useQuery(GET_NOTIFICATIONS,{
      onCompleted:() => {
        dispatch({type:SET_NotificationsCount, payload: countingNotifications(data.getNotifications)})  
             console.log('filter mutation',data.getNotifications);
          }
    })
    
    
    React.useLayoutEffect(() => {
      let unsubscribe;
     unsubscribe = subscribeToMore({
       document:NOTIFICATIONS,
       updateQuery:(prev, {subscriptionData}) => {
         const updatedNTF = subscriptionData.data.addRequestToList
       
      //  dispatch({type:SET_NotificationsCount, payload: countingNotifications(updatedNTF)}) 
         
        
         console.log("from dispatch LayOut", updatedNTF);
          if (!subscriptionData){
           return Object.assign({}, prev, {
            getNotifications:prev
             });
         } 
        
         return Object.assign({}, prev, {
          getNotifications: updatedNTF
         });
        }
     })
     
     if(unsubscribe) return () => unsubscribe() 
  
    },[subscribeToMore])
   
    
  
    function countingNotifications(data){
        const notificationsCount = []
        if(user){
          
          data.forEach(item => {
           
            item.seen.includes(user.id) &&  item.from === user.id &&  item.isConfirmed.length > 0 && item.isConfirmed.forEach(id => { //user accept ntf
                
                notificationsCount.push(id)
            }) 
            
           if(!item.seen.includes(user.id) && !item.isConfirmed.includes(user.id) && item.to.includes(user.id)){ //  request sent to user
             notificationsCount.push(item.id)
          }
      })
       
      }
        
      console.log("user get ", notificationsCount.length );
      return  notificationsCount.length 
       
      }
    






    return (
        <div>
         <Navbar />
          
        <main>
        {children}
        </main>
       
       {!window.location.pathname.split('/')[1] && ( <Footer>
        All Rights Reserved © {new Date().getFullYear()} - BudgeX Team
        </Footer>)}
      
       </div>
    )
}

export default Index

const NOTIFICATIONS = gql`
subscription AddRequestToList{
  addRequestToList{
    id
    seen
    senderName
    senderImageUrl
    accountId
    isConfirmed
    isIgnored
    to
    from
    accountTitle
    body
    createdAt
    updatedAt
  }
}


`;


const GET_NOTIFICATIONS = gql`
{
  getNotifications{
    id
    seen
    senderName
    senderImageUrl
    accountId
    isConfirmed
    isIgnored
    to
    from
    accountTitle
    body
    createdAt
    updatedAt
  }
}`;