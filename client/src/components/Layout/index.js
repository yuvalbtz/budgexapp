import React from 'react'
import Navbar from '../Navbar'
import {Footer} from './LayoutElements'
import NotificationsPage from '../../pages/NotificationsPage'
import { useSelector } from 'react-redux'


function Index({children}) {
    const user = useSelector(state => state.userReducer.userDetails)
    return (
        <div >
         <Navbar />
          
        <main>
        {children}
        </main>
       
       {!window.location.pathname.split('/')[1] && ( <Footer>
        All Rights Reserved © {new Date().getFullYear()} - Yuval Ben Tzur
        </Footer>)}
        {user && (<NotificationsPage/>)}
       </div>
    )
}

export default Index

