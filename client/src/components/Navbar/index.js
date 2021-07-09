import React, {useEffect, useState} from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModalBtn from  '../LoginModal'
import RegisterModalBtn from  '../RegisterModal'
import LogOutButton from '../LogoutButton/index'
import {
    Nav,
    NavbarContainer,
    NavTitle,
    LinkList,
    MobileIcon,
    NavMenu,
    HelloToUser,
    LinkStyle
  } from './NavbarElements';
import { useDispatch, useSelector } from 'react-redux';
 
import {makeStyles} from '@material-ui/core'

import { useParams } from 'react-router-dom';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import Badge from '@material-ui/core/Badge';
import gql from 'graphql-tag'
import {useQuery, useSubscription } from '@apollo/react-hooks';
import { SET_NotificationsCount } from '../../Redux/actionTypes';

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

dismiss:{
  display: 'none'
}

}));

     

function Index(){
    
   

    const classes = useStyles()
    const user = useSelector(state => state.userReducer.userDetails)
    const user2 = useSelector(state => state.userReducer.isAuthenticated)
    const currentAccount = useSelector(state => state.uiReducer.getCurrentAccountUi)
    const badgeCount = useSelector(state => state.uiReducer.NotificationsCount.Badge)
    const params = useParams()
    
    const currentPage = window.location.pathname.split('/')[1]
    console.log("authenticated!",user2);
    console.log("from", user);

    const [click, setClick] = useState(false)
    const [scroll, setScroll] = useState(false)
    
    const [ntfCount, setNtfCount] = React.useState(0)
    const [subsCount, setSubsCount] = React.useState(0)
    
    const dispatch = useDispatch()
 
    const handleOnclick  = () => setClick(!click)
    
    

    return (
        <header>
            <Nav active={scroll} click={click}>
      <NavbarContainer>
        
        {user && !currentAccount &&  (<LogOutButton/>)}
        
        {user && currentPage === 'myAccounts' && currentAccount  && (<PersonRoundedIcon fontSize='large' htmlColor='#fff' style={{marginLeft:'5px'}}/>)}
        
        {user && currentPage === 'matualAccounts' && currentAccount  && (<GroupRoundedIcon fontSize='large' htmlColor='#fff' style={{marginLeft:'5px'}}/>)}

        <NavTitle>
       { params && currentAccount && params.accountId ? currentAccount.title : 'BudgeX'}   
         </NavTitle>
        
        
      
      </NavbarContainer>
     
      <MobileIcon onClick={handleOnclick}>
        {click ? <FaTimes/> : <FaBars/>}
        </MobileIcon>
     

     <NavMenu  click={click}>
     
     {user && <Badge  badgeContent={badgeCount} max={99} 
      invisible={false}
      color='secondary'
      classes={{ badge:badgeCount > 0 ? classes.customBadge : classes.dismiss}}
      anchorOrigin={{
        vertical: 'top',
       horizontal: 'left',
       }}
     > <LinkStyle onClick={() => dispatch({type:SET_NotificationsCount, payload:0})} to='/notifications'>
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
      
        <LinkStyle to='/setting'>
       <li>הגדרות</li>
        </LinkStyle>

       
     
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