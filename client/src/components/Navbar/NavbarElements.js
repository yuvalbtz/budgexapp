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
  transition: 0.8s all ease;
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
  height:100vh;
  position:absolute;
  right:0;
  top:${({click}) => click ? "100%" : "-1000px"};
  opacity:1;
  background:#242333;
  overflow-y:auto;
  transition: all 0.3s ease;
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
    padding: 1em 1em 1em 1em;
    
    cursor: pointer;
    font-size:1rem;
    transition:all 0.3s ease;
    &:hover {
     background-color:white;
     color:#242333;
     
    }

    @media screen and (max-width:960px ){
      padding: 3px;
      font-size: 1.5rem;
      align-items:none;
      height:3rem;
      
      &:hover {
      border:2px solid white;
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
    padding: 1em 1em 1em 1em;
    
    cursor: pointer;
    font-size:1rem;
    transition:all 0.3s ease;
    &:hover {
     background-color:white;
     color:red;
     
    }

    @media screen and (max-width:960px ){
      padding: 3px;
      font-size: 1.5rem;
      align-items:none;
      height:3rem;
      
      &:hover {
      border:2px solid white;
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

