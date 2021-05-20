import React from 'react'
import Layout from '../../components/Layout'
import UserTabs from '../../components/UserTabs/Index'
import { useSelector } from 'react-redux';
import Footer from '../../components/UserPageFooter'

function Index() {
   
   
  
  console.log("user page");
  
   return (
     
      <Layout>
       <UserTabs/>
     </Layout>
     
     
      
    )
}

export default Index
