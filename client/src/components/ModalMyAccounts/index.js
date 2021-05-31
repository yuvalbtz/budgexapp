import React,{useState} from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import { Typography, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogContentText,
  TextField,
  FormControl,
  InputAdornment } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../../hooks/useForm'
import { SET_Account_Modal_Open } from '../../Redux/actionTypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../../util/history';



const useStyles = makeStyles((theme) => ({
    
        root: {
          height: 0,
          
        },
        wrapper: {
          width: 100 + theme.spacing(2),
          
        },
        /* desktop config */
        paper: {
          zIndex:13,
          position: 'absolute',
          bottom:'15%',
          width:'40%',
          left:'130%',
          height:'70%',
          boxShadow: theme.shadows[5],
          
         /* mediun config */
         [theme.breakpoints.only('md')]: {
          top:'8%',
          bottom:'15%',
          width:'50%',
          left:'125%',
          height:'70%',
              
        },
      
             /* small config */
             [theme.breakpoints.only('sm')]: {
              top:'8%',
              bottom:'15%',
              width:'50%',
              left:'125%',
              height:'70%',
                  
            },
      
      
      
          /* very small config */
          [theme.breakpoints.only('xs')]: {
              top:'8%',
              bottom:'15%',
              width:'70%',
              left:'115%',
              height:'70%',
                  
            },
      },
      
      
       
      
})); // styles for general modal

const Transition = React.forwardRef(function Transition(props, ref) {
 
  return <Slide direction="down" ref={ref} {...props} />;
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

export default function SimpleSlide({scrollToTop}) {
    const classes = useStyles();
    const FormClasses = useFormStyles()
    const dispatch = useDispatch()
    const ModalIsOpen = useSelector(state => state.uiReducer.AccountModalIsOpen)
    const input = React.useRef()
    
    const [errors, setErrors] = useState({});
  
  const { onChange, onSubmit, values } = useForm(createAccountCallback, {
    title: '',
  
   
  });

    
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT, {
      variables: values,
      update(proxy, result) {
        const data = proxy.readQuery({
          query: GET_USER_ACCOUNTS
        });
        data.getUserAccounts = [result.data.createAccount, ...data.getUserAccounts];
        proxy.writeQuery({ query: GET_USER_ACCOUNTS, data });
        history.push('/myAccounts/')
        //dispatch({type:SET_Account_Modal_Open})
        values.title = ''
        
        
      },
      onCompleted:() =>{
        scrollToTop()
      }

      
    });
  
    function createAccountCallback() {
      createAccount();
    }
    
    
    
    
    setTimeout(() => {
      if(ModalIsOpen){
       input.current.focus()
       }
    },100) 
   
  return (
    
  
      <div>
     
      <Dialog
        onEscapeKeyDown={() => dispatch({type:SET_Account_Modal_Open})}
        open={window.location.pathname === '/myAccounts/addAccount'}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => window.location.pathname === '/myAccounts/addAccount'}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:1, textAlign:'center'}}
        
      >
        <form onSubmit={onSubmit} noValidate>
        <DialogTitle id="alert-dialog-slide-title"> <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:יצירת חשבון</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          : צור חשבון
          </DialogContentText>
        
          
          <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-textfield"
          label=":שם החשבון"
          type="text"
          name="title"
          inputRef={input}
          value={values.title}
          onChange={onChange}
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
       {loading ? (<CircularProgress size={35} style={{margin:'0 auto', color:'green'}} />) : (
        <Fab
        aria-label="save"
        color="primary"
        style={{margin:'0 auto',backgroundColor:'green'}}
        size={'small'}
        type="submit"
        onClick={onSubmit}
        disabled={values.title.trim() === ""}
        >
        <CheckIcon />
        </Fab>
       )} 
       </DialogActions>
        </form>
      </Dialog>
    </div>

      


      
  );
}


const CREATE_ACCOUNT = gql`
mutation createAccount($title:String!) {
  createAccount(title:$title){
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


 
 
