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
    HelloToUser
  } from './NavbarElements';
import { useSelector } from 'react-redux';
 
import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({

   HelloToUser:{
       
    [theme.breakpoints.down('lg')]:{
      display:'none'
    },
    
   
   }



}));

     








 function Index(){
    
   

    const classes = useStyles()
    const user = useSelector(state => state.userReducer.userDetails)
    const user2 = useSelector(state => state.userReducer.isAuthenticated)
    const currentAccount = useSelector(state => state.uiReducer.getCurrentAccountUi)
    
    
    console.log("authenticated!",user2);
    console.log("from", user);

    const [click, setClick] = useState(false)
    const [scroll, setScroll] = useState(false)
    
    const changNav = () => {
      if(window.scrollY >= 80){
        setScroll(true)
      }else{
           setScroll(false)
          
          }
      }
    
   useEffect(() => {
      changNav()
  
     window.addEventListener("scroll", changNav)
      
     return function cl(){window.removeEventListener("scroll", changNav)}  
       
    },[])
  
    const handleOnclick  = () => setClick(!click)
    
    
   
    
    
    return (
        <header>
            <Nav active={scroll} click={click}>
      <NavbarContainer>
        
        {user && (<LogOutButton/>)}
        


        <NavTitle>
       { currentAccount ? currentAccount.title : 'BudgeX'}   
         </NavTitle>
        
        <LinkList>
       
        </LinkList>
      
      </NavbarContainer>
     
      <MobileIcon onClick={handleOnclick}>
        {click ? <FaTimes/> : <FaBars/>}
        </MobileIcon>
     

     <NavMenu  click={click}>
      
        <HelloToUser>
        { user ? `${user.username + ' שלום'}` : "שלום, אורח"}  
        </HelloToUser>
     
     {!user && (<><RegisterModalBtn/>
        
        <LoginModalBtn/></>) } 
        </NavMenu>
   </Nav>
        </header>
    )
}

export default Index
