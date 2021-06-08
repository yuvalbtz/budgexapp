import React,{useState} from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import { Typography,  
  DialogContent, 
  DialogActions, 
  DialogContentText,
  TextField,
  FormControl,
  InputAdornment,
  IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../../../hooks/useForm'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../../../util/history';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    
        root: {
          height: 0,
          
        },
        wrapper: {
          width: 100 + theme.spacing(2),
          
        },      
      
})); // styles for general modal


const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
   
  });


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });   



const Transition = React.forwardRef(function Transition(props, ref) {
 
  return <Slide direction="up" ref={ref} {...props} />;
  });



const useFormStyles = makeStyles(() => ({
    HeadLine:{
        background:'#242333',
        color:'whitesmoke',
        fontFamily: 'Varela Round',
        borderTopLeftRadius:'4px',
        borderTopRightRadius:'4px'
    }
}));

export default function SimpleSlide() {
    const classes = useStyles();
    const FormClasses = useFormStyles()
    const dispatch = useDispatch()
    const params = useParams()
    
    // const ModalIsOpen = useSelector(state => state.uiReducer.UpdateAccountModalIsOpen.isOpen)
   
  
   
    const accountDetails = useSelector(state => state.uiReducer.UpdateAccountModalIsOpen.accountDetails)
    
    const ModalIsOpen = window.location.pathname === `/myAccounts/updateAccount/${params.accountId}` && accountDetails !== null  
    
   
    
    const [title, setTitle] = useState('');
    const input = React.useRef()
    
    const [errors, setErrors] = useState({});
  
  const {onSubmit, values} = useForm(updateAccountCallback, {
    title: title,
  
   
  });

    
    const [updateAccount, { loading }] = useMutation(UPDATE_ACCOUNT, {
      variables:{
        accountId:accountDetails && accountDetails.id,  
        title: title
      },
      update(proxy, result) {
        values.title = ''
        
        
      },
      onCompleted:() =>{
        history.goBack()
        
      }

      
    });
  
    function updateAccountCallback() {
        updateAccount();
    }
    
    
    
    
    setTimeout(() => ModalIsOpen && input.current.focus(),100) 
   
    function UpdateAccountFeild(){
        
        if(accountDetails){
            console.log(accountDetails.title);
             setTitle(accountDetails.title)
        }
        
    }




   React.useEffect(() => UpdateAccountFeild(),[ModalIsOpen])



  return (
    
  
      <div>
     
      <Dialog
        onEscapeKeyDown={() => ModalIsOpen}
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => !ModalIsOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:12, textAlign:'center'}}
        
      >
        <form onSubmit={onSubmit} noValidate>
        
        
            <DialogTitle id="alert-dialog-slide-title" onClose={() => history.goBack()} style={{textAlign:'center'}}> 
        <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:עריכת חשבון</Typography>
        </DialogTitle>
        
        
        
        
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          : עדכן את שם החשבון
          </DialogContentText>
        
          
          <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-textfield"
          label=":שם החשבון"
          type="text"
          name="title"
          inputRef={input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title ? true : false}
          helperText={errors.title} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceWalletRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
        
        
        
        </DialogContent>
        <DialogActions>
        {loading ? (<CircularProgress variant='indeterminate' style={{margin:'0 auto',color:'green'}} size={35}/>)
         : (<Fab
            aria-label="save"
            color="primary"
            style={{margin:'0 auto',backgroundColor:'green'}}
            size={'small'}
            type="submit"
            onClick={onSubmit}
            disabled={accountDetails && (title.trim() === "" || title.trim() === accountDetails.title) }
          >
           <CheckIcon />
          </Fab>)}
        
        
        </DialogActions>
        </form>
      </Dialog>
    </div>

      


      
  );
}


const UPDATE_ACCOUNT = gql`
mutation updateAccount($accountId:ID!,$title:String!) {
  updateAccount(accountId:$accountId,title:$title){
    id
    createdAt
    updatedAt
    title
    owner
    }
 }
`;

const GET_USER_ACCOUNTS = gql`
{
  getUserAccounts{
    id
    createdAt
    updatedAt
    owner
    title
    }
}
`;


 
 
