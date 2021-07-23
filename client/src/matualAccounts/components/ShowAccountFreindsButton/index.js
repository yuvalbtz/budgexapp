import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import history from '../../../util/history';


const useStyles = makeStyles((theme) => ({
    FreindIcons:{
        position:'absolute',
        zIndex:13,
        top:15,
        right:90,
      
       },

       customAvatars:{
        height:theme.spacing(4),
        width:theme.spacing(4),
        fontSize:'1rem',
        cursor: 'pointer'
        
       }
      

      

}))


function Index({members,accountId}) {
  const classes = useStyles();
  const open = window.location.pathname ===  `/matualAccounts/${accountId}/ShowAccountFreinds`
  
   
   
  
   

 const {data, loading, error} = useQuery(GET_ALL_USERS) 
 const usersConfirmedArray =[]
 const usersNotConfirmedArray =[]
 
 const [usersInAccount, setUsersInAccount] = React.useState([])
 const [usersNotInAccount, setUsersNotInAccount] = React.useState([])
 




 function getCurrentUsersAccount(membersData){
   if(data){
    membersData.forEach(user => {
        let findMembersInAccount = data.getAllUsers.find(member => member.id === user.userId && user.isConfirmed === true) 
        findMembersInAccount && usersConfirmedArray.push(findMembersInAccount)
        let findMembersNotInAccount = data.getAllUsers.find(member => member.id === user.userId && user.isConfirmed === false)
        findMembersNotInAccount && usersNotConfirmedArray.push(findMembersNotInAccount)
    
    })
    
    
    return {usersInAccount:usersConfirmedArray, usersNotInAccount:usersNotConfirmedArray}
    
    }
    

 }

React.useEffect(() => {

if(!loading && members){
  let getState = getCurrentUsersAccount(members)
  setUsersInAccount(getState.usersInAccount)
  setUsersNotInAccount(getState.usersNotInAccount)
}


},[members,loading])


  return (
    <>
    <div style={{position:'relative'}} >
    <AvatarGroup  spacing='medium' className={classes.FreindIcons} classes={{avatar:classes.customAvatars}} 
     max={4}>
      {usersInAccount &&  usersInAccount.length > 0 && usersInAccount.map(freind => (
         <Avatar component={Link} 
         to={`/matualAccounts/${accountId}/ShowAccountFreinds`} 
         key={freind.id} 
         alt={freind.username} 
         src={freind.profileImageUrl} />
      ))}
      </AvatarGroup>
    </div>
    <Dialog onClose={() => history.goBack()} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">חברים לחשבון</DialogTitle>
      <List>
       
          {usersInAccount && usersInAccount.map((freind, index) => (
              <div key={index}>
              <ListItem  >
              <ListItemAvatar>
                <Avatar src={freind.profileImageUrl} className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={freind.username} secondary={'!הצטרפ/ה לחשבון'} />
            </ListItem>
             <Divider/>
           </div>
          ))}

           {usersNotInAccount && usersNotInAccount.map((freind, index) => (
              <div key={index}>
              <ListItem  >
              <ListItemAvatar>
                <Avatar src={freind.profileImageUrl} className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={freind.username} secondary={'...עדיין לא אישר/ה בקשה'} />
            </ListItem>
           </div>
          ))}
      </List>
    </Dialog>
  </>
  );
}

export default Index;

const GET_ALL_USERS = gql`
query{
  getAllUsers{
    id
    username
    profileImageUrl
  }
}

`;







