import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import history from '../../util/history'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { useDispatch, useSelector } from 'react-redux';
import {Divider} from '@material-ui/core';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ConfirmOrRemoveRequestButton from '../../notifications/components/ConfirmRequestButton'
import { SET_NotificationsCount } from '../../Redux/actionTypes';
import LeaveMatualAccountButton from '../../notifications/components/LeaveMatualAccountButton'
import { Link } from 'react-router-dom';
import hebConf from 'dayjs/locale/he'


  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
    flex: 1,
    textAlign:'center'
    },
    Fab:{
      position:'fixed',
      right:theme.spacing(2),
      bottom:theme.spacing(1),
      zIndex:3,
    
    },
  
    stasWrapper:{
      height:'100%', 
      width:'100%', 
      [theme.breakpoints.up('md')]:{
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center'
      }
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      [theme.breakpoints.up('sm')]:{
        width:'50%',
        margin:'0 auto',
        height:'100%'
        
      },
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },

    inline: {
      wordWrap:'break-word',
      width:'1000px'
      
    },

    createdAt:{
       position: 'absolute',
       bottom: -22,

    },

    body:{
      
      
    }
  }));


 function AcceptNotificationUser({accountTitle, updatedAt, id}){
  const classes = useStyles()
  const [user, setUser] = React.useState({})
  const {data} = useQuery(GET_ALL_USERS, {
  
    onCompleted:() => {
     setUser(data.getAllUsers.filter(user => user.id === id)[0])   
    },
  
  })
  
 
 
 return(
    <>
    <ListItem style={{textAlign:'center'}}>
        
    <ListItemAvatar >
         <Avatar 
         alt="Profile Picture" 
         src={user.profileImageUrl} 
         />
         
       </ListItemAvatar>
       <ListItemText 
       primary={user.username} 
       secondary={
     <React.Fragment>
     
     <Typography
       component="span"
       variant="subtitle2"
       className={classes.body}
       color="textSecondary"
     >
       {'הסכימ/ה לבקשת ההצטרפות שלך'}
     </Typography>
     <br/>
     <Typography
       component="span"
       variant="body2"
       className={classes.inline}
       color="textPrimary"
     >
    &apos;&apos;{accountTitle}&apos;&apos;
     </Typography>
     </React.Fragment>
   
 } />
      </ListItem>
     
     <Typography
       component="span"
       variant="subtitle2"
       style={{padding:'12px', justifyContent:'flex-end', display:'flex'}}
       color="textSecondary"
     >
       {dayjs(parseInt(updatedAt)).fromNow()}&nbsp;<span>:החשבון עודכן</span>
       
     </Typography> 
           
           <ListItem style={{justifyContent:'center', backgroundColor:'green',color:'white'}}>
           הסכימ/ה לבקשה שלך {user.username}
          </ListItem>
          </>
   );
 }

 const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Index() {
  dayjs.locale('de', hebConf)
  dayjs.extend(relativeTime) 
   const classes = useStyles()
   
   const handleClose = () => {
    history.goBack()
  };
  
  const open = window.location.pathname === `/notifications`
  const user = useSelector(state => state.userReducer.userDetails)
  const [filteredNtf,setFilterdNtf] = React.useState([])
  
   
 const dispatch = useDispatch()

  const {data,loading} = useQuery(GET_NOTIFICATIONS,{
    onCompleted:() => {
        
            setFilterdNtf(data.getNotifications);
            dispatch({type:SET_NotificationsCount, payload:countingNotifications(data.getNotifications)})
            console.log('filter mutation',data.getNotifications);
          
        
      }
  })
  
  
  const {error} = useSubscription(NOTIFICATIONS,{
    onSubscriptionData:({subscriptionData}) => {
     if(subscriptionData){
        setFilterdNtf(subscriptionData.data.addRequestToList)
        console.log('filterSubs',countingNotifications(subscriptionData.data.addRequestToList));
        console.log("notification page");
         console.log("filter subs", subscriptionData.data.addRequestToList);
         dispatch({type:SET_NotificationsCount, payload:countingNotifications(subscriptionData.data.addRequestToList)})
        }
        
      
    },
  })
  

   function countingNotifications(data){
    const notificationsCount = []
    if(user){
      
      data.forEach(item => {
       
       if(!item.seen.includes(user.id) && !item.isConfirmed.includes(user.id) && item.to.includes(user.id)){ //  request sent to user
         notificationsCount.push(item.id)
      }
  })
   
  }
    
  console.log("user get ", notificationsCount.length );
  return  notificationsCount.length 
   
  }



console.log(error);
 

 
return (
        
          <Dialog
          onEscapeKeyDown={() => history.goBack()}
          fullScreen
          open={open}
          onClose={() => !open}
          TransitionComponent={Transition}
          >
          <AppBar color='inherit' dir='rtl'   className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              התראות
            </Typography>
          </Toolbar>  
        </AppBar>
      
        
      <CssBaseline />
      <Paper square className={classes.paper} >
        <List dir='ltr' className={classes.list}>
        
          {filteredNtf.sort((a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt)).map(({ id, senderName, body, senderImageUrl, accountTitle, createdAt, updatedAt,accountId, isConfirmed, from, to }) => (
            <React.Fragment key={id}>
            <React.Fragment >
            
            
            
            
             {user && from === user.id &&  isConfirmed.length > 0 && isConfirmed.map(id => ( // user accept notification
                    
                    <div style={{textAlign:'center'}} key={id+1}>
                     
                    <AcceptNotificationUser
                     id={id}
                     accountTitle={accountTitle}
                     updatedAt={updatedAt}
                     />
                   <Divider style={{marginTop:'12px'}} variant="inset" component="li" />   
                   </div> 
                ))}     
           
           
           
            {user && !isConfirmed.includes(user.id) && to.includes(user.id) && (
              
              <React.Fragment>
             
              <ListItem >
             <ListItemAvatar>
                  <Avatar 
                  alt="Profile Picture" 
                  src={senderImageUrl} />
                </ListItemAvatar>
                <ListItemText 
                primary={senderName} 
                secondary={
              <React.Fragment>
              
              <Typography
                component="span"
                variant="subtitle2"
                className={classes.body}
                color="textSecondary"
              >
                {body}
              </Typography>
              <br/>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              &apos;&apos;{accountTitle}&apos;&apos;  
              </Typography>
              </React.Fragment>
            
          } />
               </ListItem>
              
              <Typography
                component="span"
                variant="subtitle2"
                style={{padding:'12px', justifyContent:'flex-end', display:'flex'}}
                color="textSecondary"
              >
              {dayjs(parseInt(createdAt)).fromNow()}&nbsp;<span>:החשבון נוצר</span>
                
              </Typography> 
              
              
              <div style={{display:'flex', width:'94%', margin:'0 auto'}}>
             
             
             <ConfirmOrRemoveRequestButton 
             accountId={accountId} 
             userId={user && user.id} 
             />
           
            </div>
            <Divider style={{marginTop:'12px'}} variant="inset" component="li" />   
            </React.Fragment>
            )}

            
            
     {user && isConfirmed.includes(user.id) && from !== user.id  && (
               <React.Fragment>
                 <ListItem >
             <ListItemAvatar>
                  <Avatar 
                  alt="Profile Picture" 
                  src={senderImageUrl} />
                </ListItemAvatar>
                <ListItemText 
                primary={senderName} 
                secondary={
              <React.Fragment>
              
              <Typography
                component="span"
                variant="subtitle2"
                className={classes.body}
                color="textSecondary"
              >
                {'למעבר לחשבון זה'}
              </Typography>
              <br/>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <Link to={`/matualAccounts/${accountId}`}>
                &apos;&apos;{accountTitle}&apos;&apos;
                </Link>
              </Typography>
              </React.Fragment>
            
          } />
               </ListItem>
              
              <Typography
                component="span"
                variant="subtitle2"
                style={{padding:'12px', justifyContent:'flex-end', display:'flex'}}
                color="textSecondary"
              >
               {dayjs(parseInt(createdAt)).fromNow()}&nbsp;<span>:החשבון נוצר</span>
                
              </Typography> 
              <div style={{margin:'0 auto',display:'flex'}}>
              <LeaveMatualAccountButton accountId={accountId} userId={user && user.id}/>
              </div>
             
             <Divider style={{marginTop:'12px'}} variant="inset" component="li" />   
            </React.Fragment>
            
            )}
           
            </React.Fragment>
              
        </React.Fragment>
          ))}
        
        
        
        </List>
      </Paper>
     
      </Dialog>
  
    )
}

export default Index


const NOTIFICATIONS = gql`
subscription AddRequestToList{
  addRequestToList{
    id
    seen
    senderName
    senderImageUrl
    accountId
    isConfirmed
    isIgnored
    to
    from
    accountTitle
    body
    createdAt
    updatedAt
  }
}


`;


const GET_NOTIFICATIONS = gql`
{
  getNotifications{
    id
    seen
    senderName
    senderImageUrl
    accountId
    isConfirmed
    isIgnored
    to
    from
    accountTitle
    body
    createdAt
    updatedAt
  }
}`;



const GET_ALL_USERS = gql`
query{
  getAllUsers{
    id
    username
    profileImageUrl
  }
}

`;