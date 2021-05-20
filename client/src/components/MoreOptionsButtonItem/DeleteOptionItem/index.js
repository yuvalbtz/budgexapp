import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CircularProgress } from '@material-ui/core';
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
 
function Index({accountId, setOpen, itemId}) {
    
    const classes = useStyles();
    
    const [open, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
     setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };


    const [deleteItem,{loading}] = useMutation(DELETE_ITEM,
        {
        onCompleted:() =>{
            setOpen(false)
            setOpenModal(false);
            
        },

        onError:(err) => console.log(err),
       
        variables: {
           accountId,
           itemId
        }
      });
    
    return (
        <>
        <MenuItem className={classes.Delete} onClick={handleClickOpen} >מחק פריט</MenuItem>
        
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{textAlign:'center'}}

        
      >
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-slide-title">מחיקת פריט</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
           ? האם אתה בטוח שברצונך למחוק פריט זה 
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
            <Button onClick={handleClose} color="primary"  >
            לא
          </Button>
          <Button onClick={deleteItem} color="primary">
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



const DELETE_ITEM = gql`
mutation deleteItem($accountId:ID!, $itemId:ID!){
    deleteItem(accountId:$accountId, itemId:$itemId){
        id
        createdAt
        updatedAt
        list{
          id
          title
          description
          amount
          media
          createdAt
          updatedAt
          
        }
    }
  }
`;

