import React from 'react'
import Layout from '../../components/Layout'
import UserTabs from '../../components/UserTabs/Index'
import SearchAccountsBar from '../../myAccounts/components/SearchAccountsButton'
import SearchMatualAccountsBar from '../../matualAccounts/components/SearchMatualAccountsButton'
function Index() {
   
   return (
     
      <Layout>
       <UserTabs/>
     <SearchAccountsBar/>
     <SearchMatualAccountsBar/>
     </Layout>
     
     
      
    )
}

export default Index
