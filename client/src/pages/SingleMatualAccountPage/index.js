import React from 'react'
import Layout from '../../components/Layout'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles} from '@material-ui/core/styles';
import { Container, IconButton} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddItemModal from '../../matualAccounts/components/AddItemModal';
import UpdateItemModal from '../../matualAccounts/components/UpdateItemModal';
import {SET_Current_Account_Ui } from '../../Redux/actionTypes';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {animateScroll} from 'react-scroll'
import Badge from '@material-ui/core/Badge';
import StatisticButton from '../../matualAccounts/components/SingleAccountStatisButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import NumericLabel from 'react-pretty-numbers';
import Tooltip from '@material-ui/core/Tooltip';
import SingleItem from '../../matualAccounts/components/SingleItemMatualAccount'
import history from '../../util/history';
import { Link,useParams } from 'react-router-dom';
import ImageModal from '../../matualAccounts/components/ImageModal'
import SearchButton from '../../matualAccounts/components/SearchMatualItemsButton' 


const useStyles = makeStyles((theme) => ({
    root: {
      height:'100vh',
      margin:'0 auto',
      textAlign:'center',
      zIndex:0
    

    },

    wrapper:{
        position:'absolute',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'calc(100% - 60px)',
        width:'100%',
         
    },
    details: {
      display: 'flex',
      width:'100%',
      height:'fit-content',
     

    },
    content: {
     display:'flex',
     width:'100%',
     height:'100%',
     

    
    },
    cover: {
     zIndex:3, 
     width: '10%',
      position:'absolute',
      right:'130px'

    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  

    bgImage:{
        position:'absolute',
        background:`rgba(0, 0, 0, .30) url(https://creditkarma-cms-ca.imgix.net/wp-content/uploads/sites/2/2020/08/50-30-20-rule932275488.jpg?w=1024&auto=compress) no-repeat center center`,
        filter: 'blur(5px)',
        width: '100%',
        height:'100vh',
        backgroundSize:'cover',
        backgroundBlendMode: "darken",
        zIndex:0 
      },
    

    itemCard:{
      display:'flex',
      justifyContent:'center',
      width:'100%',
      height:'fit-content'
      },

    MainCard:{
         marginTop:'60px',
        justifyContent:'center',
        display:'flex',
        alignItems:'center,'
        
         },
    
    spending:{
        display:'flex',
        width:'100%',
        flexDirection:'column',
        background:'#242333',
        color:'white',
        whiteSpace:'nowrap',
       
       
      },


      earning:{
        display:'flex',
        width:'100%',
        alignItems:'center',
        flexDirection:'column',
        background:'#242333',
        color:'white',
        whiteSpace:'nowrap',
       
      },

      column1:{
        display:'flex',
        width:'100%',
        justifyContent:'flex-start',
        flexDirection:'column',
        
      },

      column2:{
        display:'flex',
        width:'30%',
        alignItems:'center',
        flexDirection:'column',
        
      },

      ItemsWrapper:{
          width:'100%',
          height: 'calc(100vh - calc(100vh - 80%))',
          overflowY:'scroll',
          
       },
       
       customBadgePlus: {
        backgroundColor: "#43a047",
        color: "white",
        fontSize:'16px',
        fontWeight:'bold',
        fontFamily:'Varela Round'
      },
      customBadgeMinus: {
        backgroundColor: "#d50000",
        color: "white",
        fontSize:'16px',
        fontWeight:'bold',
        fontFamily:'Varela Round',
       
      },
      
      addImageBadge:{
        '&.MuiBadge-anchorOriginBottomLeftRectangle': {
           transform:'translate(-20%, -10%)',
          }
      },

      amountDetail:{
        display:'flex',
        justifyContent:'center', 
        alignItems:'center',
        whiteSpace:'nowrap', 
        wordBreak:'keep-all', 
        paddingLeft:'calc(100% - 60px)',
        [theme.breakpoints.up('sm')]:{
          paddingLeft:0,
          
        }

       
        
      },
     
      descriptionDetail:{
        display:'flex',
        lineClamp:'2', 
        boxOrient:'vertical',
        justifyContent:'flex-end',
        margin:'2px 4% 15px 2px',
        wordBreak:'break-word',
        whiteSpace:'break-spaces'
      },
      
       createdAtDetail:{
        position:'sticky',
        display:'flex',
        justifyContent:'flex-end',
        top:'95%',
        zIndex:0,
        margin:'2px 3% 2px 2px'
       },

       titleDetail:{
        display:'flex',
        justifyContent:'flex-end',
        margin:'2px 1% 2px 2px',
       fontFamily:'Varela Round'
       },

       Fab:{
        position:'relative',
        margin:'0 auto',
        display:'flex',
        background:'transparent',
        border:'white solid 2px',
        
       },
       FabWrapper:{
        position:'fixed',
        bottom:0,
        width:'100%',
        minHeight:'10vh', 
        zIndex:3, 
        display:'flex', 
        flex:'wrap',
        justifyContent:'center', 
        alignItems:'center'
       }
      
     

  }));


  
  


function Index({match}) {
  
   const dispatch = useDispatch()
    const classes = useStyles()
   const params = useParams()
   const ModalIsOpen = window.location.pathname === `/matualAccounts/${match.params.accountId}/addItem`
   const accountId = match.params.accountId
   const user = useSelector(state => state.userReducer.userDetails)
   
   let SumEarningstas; 
   let SumSpendingstas;

   
 
   const {data, loading, subscribeToMore} = useQuery(GET_USER_MATUAL_ACCOUNT,{variables:{accountId}, 
   onCompleted:() => scrollToBottom(), 
   onError:(err) => history.goBack(),
  })

  React.useLayoutEffect(() => {
    let unsubscribe;

   if(!ModalIsOpen){
      unsubscribe = subscribeToMore({
        document:ITEM_CHANGED_SUBS,
        updateQuery:(prev, {subscriptionData}) => {
          if(!subscriptionData.data) return prev
          const newList = subscriptionData.data.itemChangedSubs
          console.log("compare length", newList.list.length,prev.getUserMatualAccount.list.length);
          return Object.assign({}, prev, {
            getUserMatualAccount: {newList, ...prev.getUserMatualAccount}
            });
         },
      })
           
      unsubscribe = subscribeToMore({
        document:ACCOUNT_CHANGED_SUBS,
        updateQuery:(prev, {subscriptionData}) => {
          const updatedAccounts = subscriptionData.data.accountChangedSubs
          const filteredUpdatedAccounts = user && updatedAccounts.filter(item => item.members.find(i =>  i.userId === user.id && i.isConfirmed === true) || item.owner === user.id);
          if (!filteredUpdatedAccounts) return prev
          const accountExist = filteredUpdatedAccounts.find(ac => ac.id === accountId)
          return accountExist ? Object.assign({}, prev, {
            getUserMatualAccounts: updatedAccounts.reverse()
            }) : window.location.href = '/matualAccounts'
         }
      }) 
    }
    
    if (unsubscribe) return () => unsubscribe()


},[ModalIsOpen, subscribeToMore,accountId, user])

 
   

   React.useEffect(() => {
  if(data){
     dispatch({type:SET_Current_Account_Ui, payload:data.getUserMatualAccount})
  }

 },[data, dispatch])



   

   function getEarningLength(data){
    const result = data.filter(i => i.amount > 0).length
    return result
  }

  function getSpendingLength(data){
    const result = data.filter(i => i.amount < 0).length
    return result
  }


   function getSumEearning(data){ 
       
     const result = data.filter(i => i.amount > 0).reduce((acc, val) => (acc + val.amount),0)
       
     SumEarningstas = result   
     
     return Number.isInteger(result) ? result : result.toFixed(2);
   }

   function getSumSpending(data){
    
   const result = data.filter(i => i.amount < 0).reduce((a, b) => (a + b.amount),0)
    
  SumSpendingstas = result
  
  return Number.isInteger(result) ? result : result.toFixed(2);
}
 
function scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "containerScroll",
      delay:250
    });

    
}

//Number Format Options
const FormatOptions = {
  'justification':'L',
  'locales':'en-AU',
  'currency':false,
  'currencyIndicator':'AUD',
  'percentage':false,
  'precision':0,
  'wholenumber':null,
  'commafy':true,
  'shortFormat':true,
  'shortFormatMinValue': 1000000,
  'shortFormatPrecision': 2,
  'title':true,
  
};




   return (
       <Layout> 
         <div className={classes.bgImage}></div>
         <div className={classes.root}>
         
         <div className={classes.wrapper}>
         
         <Container fixed maxWidth='sm' className={classes.MainCard}>
         
        
         <div className={classes.spending}>
         
          { data && getSumSpending(data.getUserMatualAccount.list) < 0  ? (<> <h2 
          
          style={{
            display:'flex',
            justifyContent:'center', 
            textDecoration:'underline', 
            margin:0}} >
         <Badge  
         classes={{ badge:classes.customBadgeMinus}}
         showZero={false}
         badgeContent={data ? getSpendingLength(data.getUserMatualAccount.list): 0}  
         style={{marginTop:'12px'}}
         anchorOrigin={{
          vertical: 'top',
         horizontal: 'left',
         }}>
        הוצאות
        </Badge>
        </h2>
        <Tooltip 
        title={<NumericLabel>{-Math.abs(getSumSpending(data.getUserMatualAccount.list))}</NumericLabel>} 
        placement='bottom'>
         <h2 
         style={{
          display:'flex',
          justifyContent:'center', 
          margin:'0px'}}>₪ -{data ?
           <NumericLabel params={FormatOptions}>{Math.abs(getSumSpending(data.getUserMatualAccount.list))}</NumericLabel> 
            : 0}</h2></Tooltip></> ) : <h2>אין הוצאות</h2> }
         </div>
          
         <div className={classes.earning}>
        {data && getSumEearning(data.getUserMatualAccount.list) > 0 ? (<> <h2 
         style={{
           display:'flex',
           justifyContent:'center',
           margin:0,
           textDecoration:'underline'}}>
        <Badge  
         classes={{ badge:classes.customBadgePlus}}
         showZero={false}
         badgeContent={data ? getEarningLength(data.getUserMatualAccount.list): 0} 
         style={{marginTop:'12px'}}
         anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
         }}>
        הכנסות
        </Badge>
             </h2> 
         <Tooltip 
         title={<NumericLabel>{getSumEearning(data.getUserMatualAccount.list)}</NumericLabel>}
         placement='bottom'
         >
         <h2 
         style={{
           display:'flex',
           justifyContent:'center', 
           margin:0}} >₪ {data ? 
           <NumericLabel params={FormatOptions}>
             {getSumEearning(data.getUserMatualAccount.list)}
           </NumericLabel> : 0}</h2></Tooltip> </>) : <h2>אין הכנסות</h2>}
         </div>
               
         
       </Container> 
        
       
       <Container fixed maxWidth="sm" className={classes.ItemsWrapper} id="containerScroll">

        {loading && (<CircularProgress style={{marginTop:'50px'}} color='primary' size={200} thickness={0.5}/>)}

        {data && data.getUserMatualAccount.list.map((item) => (
         
         <SingleItem 
         key={item.id}
         item={item}
         accountId={accountId}
         ownerName={data.getUserMatualAccount.ownerName}
         />
        ))}
      
       <div/>
       
    </Container>
   
    
   
    <div className={classes.FabWrapper}>  
    <Fab 
     disableFocusRipple={true}  
    size="medium" 
    className={classes.Fab} 
    color='primary' 
     aria-label="add">
      {ModalIsOpen ? 
      
      <CloseRoundedIcon style={{color:'white', padding:'10px 10px'}} onClick={() => history.goBack()}  /> :  
      <IconButton style={{color:'white'}} component={Link} to={`/matualAccounts/${accountId}/addItem`}><AddIcon  /></IconButton> 
     } 
      </Fab> 
      
      </div>
                  
    </div>
    
    
     
   </div>   
   

    <SearchButton/>

     <StatisticButton 
      totalSpending={SumSpendingstas} 
      totalEarning={SumEarningstas} />
      
      <AddItemModal accountId={accountId} scrollToBottom={scrollToBottom} /> 
      <UpdateItemModal accountId={accountId} />
       <ImageModal/>
       </Layout>
       
    )
}

export default Index


const GET_USER_MATUAL_ACCOUNT = gql`

query($accountId:ID!){
        getUserMatualAccount(accountId:$accountId){
            title
            id
            owner
            ownerName
            list{
              id
              title
              description
              media
              amount
              createdAt
              updatedAt
            }
        }  
      }
`;

const ITEM_CHANGED_SUBS = gql`
subscription itemChangedSubs{
  itemChangedSubs{
    title
    id
   owner
   ownerName
    list{
    id
    title
    description
    media
    amount
    createdAt
    updatedAt
    }
  }
}
`;


const ACCOUNT_CHANGED_SUBS = gql`
subscription accountChangedSubs{
  accountChangedSubs{
    id
    createdAt
    updatedAt
    owner
    ownerName
    title
    members {
      userId  
      isConfirmed
      isIgnored
    
  }
    
  }
}
`;