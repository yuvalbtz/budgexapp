import React from 'react'
import Navbar from '../Navbar'
import {Footer} from './LayoutElements'
import NotificationsPage from '../../pages/NotificationsPage'


function Index({children}) {
   
    return (
        <div>
         <Navbar />
          
        <main>
        {children}
        </main>
       
       {!window.location.pathname.split('/')[1] && ( <Footer>
        All Rights Reserved © {new Date().getFullYear()} - Yuval Ben Tzur
        </Footer>)}
        <NotificationsPage/>
       </div>
    )
}

export default Index

