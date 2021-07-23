import React from 'react'
import Navbar from '../Navbar'
import {Footer} from './LayoutElements'



function Index({children}) {
   
   
  
   
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
