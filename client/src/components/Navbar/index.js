import React, {useState} from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModalBtn from  '../LoginModal'
import RegisterModalBtn from  '../RegisterModal'
import LogOutButton from '../LogoutButton/index'
import {
    Nav,
    NavbarContainer,
    NavTitle,
    MobileIcon,
    NavMenu,
    HelloToUser,
    LinkStyle,
    LogoutLinkStyle
  } from './NavbarElements';
import { useDispatch, useSelector } from 'react-redux';
 
import {makeStyles} from '@material-ui/core'

import { useParams } from 'react-router-dom';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import Badge from '@material-ui/core/Badge';
import { SET_NotificationsCount } from '../../Redux/actionTypes';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import gql from 'graphql-tag'
import { DirectionsBoatOutlined, LensTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({

   HelloToUser:{
       
    [theme.breakpoints.down('lg')]:{
      display:'none'
    }
},

customBadge:{
  '&.MuiBadge-anchorOriginTopLeftRectangle': {
    transform:'translate(0%, 30%)',
  }
},
 
customFabBadge:{
    '&.makeStyles-customBadge-26.MuiBadge-anchorOriginTopLeftRectangle':{
        transform:'unset',
      },
    },
dismiss:{
  display: 'none',  
  '&.MuiBadge-root':{
      
  },

 
 

}

}));

     

function Index(){
    
    const classes = useStyles() 
    const user = useSelector(state => state.userReducer.userDetails)
    const currentAccount = useSelector(state => state.uiReducer.getCurrentAccountUi)
    const badgeCount = useSelector(state => state.uiReducer.NotificationsCount.Badge)
    const params = useParams()
    
    const [click, setClick] = useState(false)
    const [scroll, setScroll] = useState(false)
    
   const [userSawNTF] = useMutation(USER_SAW_NTF,{
     refetchQueries:[{query:GET_NOTIFICATIONS}],
     onCompleted:(data) => console.log('counting data', data)
   }) 
    
    const dispatch = useDispatch()
 
    const handleOnclick  = () => {
      setClick(!click)
      
    }
    
    
    const {data, subscribeToMore} = useQuery(GET_NOTIFICATIONS,{
      onCompleted:() => {
         
              console.log('filter mutation',data.getNotifications);
          } 
        })
    
        React.useLayoutEffect(() => {
          let unsubscribe;
     
         unsubscribe = subscribeToMore({
           document:NOTIFICATIONS,
           updateQuery:(prev, {subscriptionData}) => {
             const updatedNTF = subscriptionData.data.addRequestToList
           
              dispatch({type:SET_NotificationsCount, payload: countingNotifications(updatedNTF)}) 
             
            
            console.log("from dispatch", updatedNTF);
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
        <header>
            <Nav active={scroll} click={click}>
      <NavbarContainer>
        
        
        
        {user && currentAccount && currentAccount.__typename === 'Account' &&  (<PersonRoundedIcon fontSize='large' htmlColor='#fff' style={{marginLeft:'5px'}}/>)}
        
        {user && currentAccount && currentAccount.__typename === 'MatualAccount' && (<GroupRoundedIcon fontSize='large' htmlColor='#fff' style={{marginLeft:'5px'}}/>)}

        <NavTitle>
       { params && currentAccount && params.accountId ? currentAccount.title : 'BudgeX'}   
         </NavTitle>
        
        
      
      </NavbarContainer>
     
      <MobileIcon onClick={handleOnclick}>
        {click ? <FaTimes/> :(<> {badgeCount > 0 ? (<Badge
        badgeContent={badgeCount} 
         max={99} 
        invisible={badgeCount === 0}
        color='secondary'
        classes={{ badge:badgeCount > 0 ? classes.customFabBadge : classes.dismiss}}
        anchorOrigin={{
          vertical: 'top',
         horizontal: 'left',
         }}
        ><FaBars/></Badge>) : <FaBars/>}</>)}
        </MobileIcon>
     

     <NavMenu  click={click}>
     
     
     {user &&  (<LogoutLinkStyle><LogOutButton/></LogoutLinkStyle>)}
     
     
     
     {user && <Badge  badgeContent={badgeCount} max={99} 
      invisible={false}
      color='secondary'
      classes={{ badge:badgeCount > 0 ? classes.customBadge : classes.dismiss}}
      anchorOrigin={{
        vertical: 'top',
       horizontal: 'left',
       }}
     > <LinkStyle onClick={() => userSawNTF()} to='/notifications'>
            התראות  
          </LinkStyle></Badge>  }
     
     
     <LinkStyle to='/security'>
       <li>אבטחה</li>
        </LinkStyle>
     
      
       <LinkStyle to='/policy'>
       <li>מדיניות</li>
      </LinkStyle>
        
        <LinkStyle to='/aboutme'>
       <li>עלי</li>
      </LinkStyle>
      
      {/*   <LinkStyle to='/setting'>
       <li>הגדרות</li>
        </LinkStyle> */}

       
     
     {!user && 
     (<><RegisterModalBtn/><LoginModalBtn/></>) } 
       
        <HelloToUser>
        { user ? `${user.username + ' שלום'}` : "שלום, אורח"}  
        </HelloToUser>
       
        </NavMenu>
   </Nav>
        </header>
    )
}

export default Index



const USER_SAW_NTF = gql`
mutation{
  userSawNTF{
    id
    seen
    from 
    isConfirmed
    to
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




