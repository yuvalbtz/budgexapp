import styled from 'styled-components';
import {Link} from 'react-router-dom'


export const Nav = styled.nav`
  background: ${({active}) => active ? "transparent" : "#242333" };
  width:100%;
  height: 50px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:1rem;
  position:fixed; 
  top:0;
  z-index:13;
  transition:all 0.8s  ease;
  @media screen and (max-width:960px){
    background: ${({click}) => click ? "#242333" : "#242333"};
    
    
  }

`;  


export const NavbarContainer = styled.div`
display:flex;
align-items:center; 
height:80px;
z-index:0;
width:100%;
max-width:1000px;
`;

export const NavLogo = styled(Link)`
border-top: 2px solid white;
border-radius:50%;
justify-content:flex-start;
cursor:pointer;
display:flex;
margin-left:12px;
border-top:${({active}) => active === "false" ? "2px solid white" : "none"};
@media screen and (max-width:960px){
border-top:${({click}) => click === "true" ? "2px solid white" : "none"};
}
`;



export const NavTitle = styled.h2`
white-space:nowrap;
display: inline-block;
color:#F1F9FD;
padding:0 0 0 8px;
overflow:hidden; 
text-overflow: ellipsis; 
-o-text-overflow:ellipsis;
-ms-text-overflow:ellipsis; 
max-width:50%;
@media screen and (max-width:425px){
  max-width:75%;
}
 `;  

export const LinkList = styled.ul`
display:flex;
 justify-content:flex-end;
`;


export const MobileIcon  = styled.div`

display: none;


@media screen and (max-width:960px ){
  color:#F1F9FD;
  z-index:11;
  display:block;
  position:absolute;
  top:0;
  right:0;
  transform: translate(-30%, 30%);
  font-size:1.8rem;
  cursor:pointer;
 
}
`;



export const Overlay = styled.div`
@media screen and (max-width:960px ){
  position:absolute;
  top: 50px;
  left: 0;
  bottom: -100vh;
  right:0;
  background:rgba(0, 0, 0, 0.5);
  visibility: ${({click}) => click ? "visible" : "hidden"};
  transition: opacity 0.3s ease;
  opacity:${({click}) => click ? 1 : 0};
}
`;

export const NavMenu = styled.ul`
position:relative;
display:flex;
align-items:center;
justify-content:space-evenly;
text-align:center;
white-space:nowrap;
padding:0;
margin-right:10%;
width:300px;
@media screen and (max-width:960px ){
  display:flex;
  flex-direction:column-reverse;
  justify-content:flex-end;
  margin:0;
  width:150px;
  height: 100vh;
  position:absolute;
  bottom: -100vh;
  right:${({click}) => click ? "0%" : "-300px"};
  opacity:1;
  background:#242333;
  overflow-y:auto;
  transition: right 0.3s ease;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);

}

`;



export const LinkStyle = styled(Link)`

    font-weight: bold;
    list-style:none; 
    color: whitesmoke;
    display: flex;
    align-items: center;
    width: fit-content;
   
    text-decoration: none;
    padding: 0.8em;
    position:relative ;
    cursor: pointer;
    font-size:1rem;
    letter-spacing:1px;
    
    
    &::after {
      transform: translate3d(100%, 0, 0);
      transition:  transform .2s ease-in-out, opacity .21s ease-in;
      content: "";
      width: 100%;
      height: 2px;
	    background-color: white;
      position: absolute;
      right: 0;
      bottom: 0;
      opacity:0;
     
    }

    &:hover::after {
      transform: translate3d(0, 0, 0);
      opacity:1;
     
    }

    @media screen and (max-width:960px ){
      padding: 3px;
      font-size: 1.5rem;
      align-items:none;
      height:3rem;
      

      &:hover {
      color:white;
      background-color:#242333;
    }
    }

`;



export const LogoutLinkStyle = styled.div`

    font-weight: bold;
    list-style:none; 
    color: whitesmoke;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.8em;
    
    cursor: pointer;
    font-size:1rem;
    transition: all 0.1s ease-in;
    letter-spacing:1px;
    position:relative;
    
    &::after {
      transform: translate3d(100%, 0, 0);
      transition:  transform .2s ease-in-out, opacity .21s ease-in, background-color .2s ease-in-out;
      content: "";
      width: 100%;
      height: 2px;
	    background-color: white;
      position: absolute;
      right: 0;
      bottom: 0;
      opacity:0; 
      background-color:red;
     
    }

    &:hover::after {
      transform: translate3d(0, 0, 0);
      opacity:1;
      
      
     
    }

    @media screen and (max-width:960px ){
      padding: 3px;
      font-size: 1.5rem;
      align-items:none;
      height:3rem;
      
      &:hover {
      color:white;
      background-color:#242333;
    }
    }

`;


export const HelloToUser = styled.h3`
color:whitesmoke;
margin-left:12px;
@media screen and (max-width:960px ){
  white-space: normal;
  padding: 12px;
  letter-spacing: 1px;
  font-size: 1.4rem;
  margin-left:0; 
       
}


`;

