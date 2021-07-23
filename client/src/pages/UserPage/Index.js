import React from 'react'
import Layout from '../../components/Layout'
import UserTabs from '../../components/UserTabs/Index'
import Footer from '../../components/UserPageFooter'
import NotificationsPage from '../NotificationsPage'
import SearchAccountsBar from '../../myAccounts/components/SearchAccountsButton'
import SearchMatualAccountsBar from '../../matualAccounts/components/SearchMatualAccountsButton'
function Index() {
   
   return (
     
      <Layout>
       <UserTabs/>
     <NotificationsPage/>
     <SearchAccountsBar/>
     <SearchMatualAccountsBar/>
     </Layout>
     
     
      
    )
}

export default Index
