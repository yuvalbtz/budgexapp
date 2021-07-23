import React,{useContext} from 'react'
import Navbar from '../Navbar'
import {Footer} from './LayoutElements'
import {useSelector} from 'react-redux'
import { Container } from '@material-ui/core'


function Index({children}) {
   
    const user = useSelector(state => state.userReducer.userDetails)
   
  
   
    return (
        <div>
         <Navbar />
          
        <main>
        {children}
        </main>
       
       {!window.location.pathname.split('/')[1] && ( <Footer>
        All Rights Reserved © {new Date().getFullYear()} - TeamBudget
        </Footer>)}
      
       </div>
    )
}

export default Index
