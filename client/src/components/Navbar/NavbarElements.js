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
z-index:1;
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

display:flex;
flex-direction:column;
justify-content:flex-end;
color:#F1F9FD;
padding:0px 0px 0px 12px;
margin:0;
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
  transform: translate(-60%, 40%);
  font-size:1.8rem;
  cursor:pointer;
 
}
`;


export const NavMenu = styled.ul`
position:relative;
display:flex;
align-items:center;
text-align:center;
white-space:nowrap;
padding:0;
margin:15%;
justify-content:space-between;
width:300px;
@media screen and (max-width:960px ){
  display:flex;
  flex-direction:column-reverse;
  justify-content:flex-end;
  margin:0;
  width:40%;
  height:95vh;
  position:absolute;
  left:${({click}) => click ? "60%" : "1000px" };
  top:${({click}) => click ? "100%" : "-1000px"};;
  opacity:1;
  background:#242333;
  overflow-y:auto;
  padding:0px 0 0px 0;
  transition: all 0.2s ease;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  
}

`;



export const LinkStyle = styled(Link)`

    font-weight: bold;
    
    color: whitesmoke;
    display: flex;
    align-items: center;
    
    text-decoration: none;
    padding: 0 1rem 0rem 1rem;
    height: 100%;
    cursor: pointer;
    font-size: 1rem;
    transition:all 0.2s ease;
    &:hover {
      border-bottom:1px solid white;
      }

    @media screen and (max-width:960px ){
      padding: 0;
      font-size: 2rem;
      align-items:none;
      height:8rem;
      &:hover {
      border-top:1px solid white;
      border-radius:50%;
      transform: translate(0px,-12px);
      
    }
    }

`;

export const HelloToUser = styled.h3`
color:whitesmoke;

@media screen and (max-width:960px ){
    top:2%;
    right:16%;
    white-space:nowrap;
    display:'none'
       
}




`;

