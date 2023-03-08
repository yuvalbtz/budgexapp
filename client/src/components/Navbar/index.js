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
    LogoutLinkStyle,
    Overlay
  } from './NavbarElements';
import { useSelector } from 'react-redux';
 
import {makeStyles} from '@material-ui/core'

import { Link, useParams } from 'react-router-dom';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import Badge from '@material-ui/core/Badge';
import { useMutation} from '@apollo/client';
import gql from 'graphql-tag'




const useStyles = makeStyles((theme) => ({

   HelloToUser:{
       
    [theme.breakpoints.down('lg')]:{
      display:'none'
    }
},

customBadge:{
  color:theme.palette.notification.light,
  backgroundColor:theme.palette.notification.main,
  '&.MuiBadge-anchorOriginTopLeftRectangle': {
    transform:'translate(0%, 30%)',
  }
},
 
customFabBadge:{
 
  color:theme.palette.notification.light,
  backgroundColor:theme.palette.notification.main,
  '&.makeStyles-customBadge-26.MuiBadge-anchorOriginTopLeftRectangle':{
        transform:'unset',
     
      },
    },
dismiss:{
  display: 'none',  
  

 
 

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
    
   
 
    const handleOnclick  = () => {
      setClick(!click)
      
    }
    
    
    
    
    return (
        <header>
            <Nav active={scroll} click={click}>
      <NavbarContainer>
        
        
        
        {user && currentAccount && currentAccount.__typename === 'Account' &&  (<PersonRoundedIcon fontSize='large' htmlColor='#fff' style={{marginLeft:'5px'}}/>)}
        
        {user && currentAccount && currentAccount.__typename === 'MatualAccount' && (<GroupRoundedIcon fontSize='large' htmlColor='#fff' style={{marginLeft:'5px'}}/>)}

        <NavTitle >
       { params && currentAccount && params.accountId ? currentAccount.title :<Link style={{textDecoration:'none', color:'white'}} to='/'>BudgeX</Link>}   
         </NavTitle>
        
        
      
      </NavbarContainer>
     
      <MobileIcon onClick={handleOnclick}>
        {click ? <FaTimes/> :(<> {badgeCount > 0 ? (<Badge
        badgeContent={badgeCount} 
         max={99} 
        invisible={badgeCount === 0}
        classes={{ badge:badgeCount > 0 ? classes.customFabBadge : classes.dismiss}}
        anchorOrigin={{
          vertical: 'top',
         horizontal: 'left',
         }}
        ><FaBars/></Badge>) : <FaBars/>}</>)}
        </MobileIcon>
     
     <Overlay onClick={handleOnclick} click={click} />
     <NavMenu  click={click}>   
          
     {user &&  (<LogoutLinkStyle><LogOutButton/></LogoutLinkStyle>)}
     
     {user && window.location.pathname === ('/' || '/login' || '/register') && ( <LinkStyle to='/myAccounts'>
       <li>חזור לחשבון</li>
      </LinkStyle>)}
     
     {user && <Badge  badgeContent={badgeCount} max={99} 
      invisible={false}
      
      classes={{ badge:badgeCount > 0 ? classes.customBadge : classes.dismiss}}
      anchorOrigin={{
        vertical: 'top',
       horizontal: 'left',
       }}
     > <LinkStyle onClick={() => userSawNTF()} to='/notifications'>
            התראות  
          </LinkStyle></Badge>  }
     
    
     {!user && 
     (<><RegisterModalBtn/><LoginModalBtn/></>) } 
       
        <HelloToUser>
        { user ? `Hello ${user.username}` : "שלום, אורח"}  
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






