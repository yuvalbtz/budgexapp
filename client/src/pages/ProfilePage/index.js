import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import {useDispatch, useSelector} from 'react-redux'
import EditProfileModal from '../../components/ModalProfile'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url("https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg") no-repeat',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    
    [theme.breakpoints.down('sm')]: {
         flexDirection:'column' 
      },
    
    
    '& > *': {
     
    },
  },
  Avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  UserDetails:{
    padding:'3%',
    justifyContent:'center',
    
    
  },
  UserDetailsText:{
    fontFamily:'Varela Round',
    fontWeight:'bold',
    color:'white'
  },
  overlay:{
      position:'absolute',
      top:0,
      bottom:0,
      left:0,
      right:0,
      height:'100%',
      width:'100%',
      background:'black'
  }
  
}));

export default function ImageAvatars() {
  const classes = useStyles();

  const user = useSelector(state => state.userReducer.userDetails)




  return (
    
    <div className={classes.root}>
       
       <Avatar  src={user && user.profileImageUrl} className={classes.Avatar} />
        <div className={classes.UserDetails}>
            <Typography className={classes.UserDetailsText}  variant="h5" component="h2">{user && user.username}</Typography>
            <Typography className={classes.UserDetailsText} variant="h5" component="h2">{user && user.email}</Typography>
       
        </div> 
    <EditProfileModal/>
    </div>
   
  );
}
