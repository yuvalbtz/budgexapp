import React from 'react'
import Layout from '../../components/Layout'
import UserTabs from '../../components/UserTabs/Index'
import { useSelector } from 'react-redux';
import Footer from '../../components/UserPageFooter'
import NotificationsPage from '../NotificationsPage'
function Index() {
   
   
  
  console.log("user page");
  
   return (
     
      <Layout>
       <UserTabs/>
     <NotificationsPage/>
     </Layout>
     
     
      
    )
}

export default Index
