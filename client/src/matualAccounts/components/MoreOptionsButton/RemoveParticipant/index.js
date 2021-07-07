import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import {useSelector} from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CircularProgress } from '@material-ui/core';
import history from '../../../../util/history';
import { Link, useParams } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      zIndex:13
    },
    paper: {
    
     
    },

    OptionBar:{
        position:'absolute',
        zIndex:13,
        top:8,
        left:2, 
        color:'white'
      },
      Delete:{
          color:'#d50000',
          fontFamily:'Varela Round',
          fontWeight:'bold'
      },
      Update:{
        fontFamily:'Varela Round',
        fontWeight:'bold'  
      },

      dialogTitle:{
          fontFamily:'Varela Round',
          fontWeight:'bold',
          backgroundColor:'#d50000',
          color:'white',

          
      }

     
  }));
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
 
function Index({accountId, setOpen}) {
    
    const classes = useStyles();
    
    const [open, setOpenModal] = React.useState(false);
    
    const params = useParams()
    const user = useSelector(state => state.userReducer.userDetails)
   const ModalIsOpen = window.location.pathname === `/matualAccounts/LeaveAccount/${params.accountId}`





  const handleClickOpen = () => { 
    setOpenModal(true);
  };

  

    const [LeaveAccount,{loading}] = useMutation(LEAVE_ACCOUNT,
        {
        refetchQueries:[{query:GET_USER_ACCOUNTS}],
        onCompleted:() => {
         history.goBack()
         setOpen(false)
       },

        onError:(err) => console.log(err),
        variables: {
           accountId,
           userId:user && user.id
        },
      });
    
    return (
        <>
        <MenuItem 
        className={classes.Delete} 
        component={Link} 
        to={`/matualAccounts/LeaveAccount/${accountId}`} 
        onClick={handleClickOpen} >יציאה מהחשבון</MenuItem>
        
      <Dialog
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => ModalIsOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{textAlign:'center'}}

        
      >
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-slide-title">יציאה מהחשבון</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
           ? האם אתה בטוח שברצונך לצאת מחשבון זה 
          </DialogContentText>
        </DialogContent>
        <DialogActions  style={{margin:'0 auto'}} >
          
          {loading ? (
            <CircularProgress 
            size={35} 
            variant='indeterminate' 
            style={{color:'red', margin:'0 auto'}}/>
          ) : (
            <>
            <Button onClick={() => history.goBack()} color="primary"  >
            לא
          </Button>
          <Button onClick={LeaveAccount} color="primary">
            כן
          </Button>
          </>
          )}
        
        </DialogActions>
      </Dialog>
      </>
    )
}

export default Index


const LEAVE_ACCOUNT = gql`
mutation confirmRequest($accountId:ID!, $userId:ID!){
    confirmRequest(accountId:$accountId, userId:$userId){
        id
    senderName
    senderImageUrl
    accountTitle
    accountId
    from
    to
    body
    seen
    isConfirmed
    isIgnored
    createdAt
    updatedAt
    }
}
`;

const GET_USER_ACCOUNTS = gql`
{
  getUserMatualAccounts{
    id
    createdAt
    updatedAt
    owner
    title
    members{
        userId
        isConfirmed
        isIgnored
    }
    }
}
`;