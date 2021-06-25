import React from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import { Typography, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogContentText,
  FormControl,
  TextField,
  InputAdornment,
  
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useState } from 'react';
import history from '../../../util/history';
import { useForm } from '../../../hooks/useForm';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
      left:'30%',
      height:'70%',
     
      
     /* mediun config */
     [theme.breakpoints.only('md')]: {
      top:'8%',
      bottom:'15%',
      width:'50%',
      left:'25%',
      height:'70%',
          
    },
  
         /* small config */
         [theme.breakpoints.only('sm')]: {
          top:'8%',
          bottom:'15%',
          width:'50%',
          left:'25%',
          height:'70%',
              
        },
  
  
  
      /* very small config */
      [theme.breakpoints.only('xs')]: {
          top:'8%',
          bottom:'15%',
          width:'70%',
          left:'15%',
          height:'70%',
             
        },
  },
  
  margin:{
    margin:'5px'
  }
   
  
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








export default function SimpleSlide() {
    const classes = useStyles();
    const FormClasses = useFormStyles()
   // const ModalIsOpen = useSelector(state => state.uiReducer.MatualAccountIsOpen)
     const ModalIsOpen = window.location.pathname === `/matualAccounts/addAccount`
    
    
    
    const [getAllUsers,{ data}] = useLazyQuery(GET_ALL_USERS)
    const [selectedFreinds, setSelectedFreinds] = useState([])
  
    const [errors, setErrors] = useState({});
  
    const { onChange, onSubmit, values } = useForm(createAccountCallback, {
      title: '',
    
     
    });
      const selectedFreindsId =  selectedFreinds.map(f => f.id)
      console.log(selectedFreindsId);
      
      
      
      const [createAccount,{loading}] = useMutation(CREATE_MATUAL_ACCOUNT, {
        variables: {
          title:values.title,
          freinds:selectedFreindsId
        },
        update(proxy, result) {
          const data = proxy.readQuery({
            query: GET_USER_MATUAL_ACCOUNTS
          });
          data.getUserMatualAccounts = [result.data.createMatualAccount, ...data.getUserMatualAccounts];
          proxy.writeQuery({ query: GET_USER_MATUAL_ACCOUNTS, data });
           values.title = ''
         },
        onCompleted:() =>{
          setSelectedFreinds([])
          history.goBack()
        }
  
        
      });
    
      function createAccountCallback() {
        createAccount();
      }

   
   
   
   
   
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const input = React.useRef()
  
    
    
    
    
    React.useEffect(() => {
    if(data){
        const users = data.getAllUsers;
         
        setOptions(users);
       
        console.log("users",options);
       
      }
     }, [open, data]);

  
  return (

      <div>
     
      <Dialog
        onEscapeKeyDown={() => history.goBack()}
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => !ModalIsOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:1, textAlign:'center'}}
      >
        <form onSubmit={onSubmit} noValidate>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:יצירת חשבון משותף</Typography>
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          :צור חשבון והוסף חברים לחשבון
          </DialogContentText>
          
          <div>
          <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-textfield1"
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
      </div>
       
       <div>
      <FormControl className={classes.margin}>
      <Autocomplete
      multiple
      disableCloseOnSelect
      id="asynchronous-demo"
      name="addFreinds"
      style={{maxWidth:250,minWidth:220}}
      open={open}
      onOpen={() => {
        getAllUsers();
         setOpen(true);
       }}
     
      onClose={() => setOpen(false)}
      groupBy={(option) => data && `${data.getAllUsers.length + ' users'}`}
      getOptionSelected={(option, value) => option.id === value.id}
      onChange={(e,val, res) => setSelectedFreinds(val)}
      getOptionLabel={(option) => option.username}
     
      renderOption={(option, { selected }) => (
        <React.Fragment>
       <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={selected}
          />
        <Avatar 
        src={option.profileImageUrl} 
        style={{marginRight:'12px', width:35, height:35}}/>
          {option.username}
      </React.Fragment>
      )}
      options={options}
      /* loading */
      value={selectedFreinds.length === 0 ? [] : selectedFreinds}
      renderTags={(tagValue, getTagProps) =>
       
        tagValue.map((option, index) => (
          <Chip
            label={option.username}
            avatar={<Avatar src={option.profileImageUrl} />}
            {...getTagProps({ index })}
            
          />
        ))
      }
      renderInput={(params) => (
        <TextField
        {...params}
           multiline
          rowsMax={4}  
          label=":הוסף חברים"
        
         InputProps={{
            ...params.InputProps,
            startAdornment: (<>{selectedFreinds.length === 0 && (<GroupRoundedIcon/>)} {params.InputProps.startAdornment}</>),
        }}
        />
      )}
    />
      </FormControl>   
      </div> 
       
        </DialogContent>
        <DialogActions>
       {loading ? (<CircularProgress size={35} style={{margin:'0 auto', color:'green'}} />) : (
          <Fab
          aria-label="save"
          color="primary"
          style={{margin:'0 auto',backgroundColor:'green'}}
          size={'small'}
          type='submit'
          onClick={onsubmit}
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


const CREATE_MATUAL_ACCOUNT = gql`
mutation createMatualAccount($title:String!, $freinds:[String]!) {
  createMatualAccount(title:$title, freinds:$freinds){
    id
    createdAt
    updatedAt
    title
    owner
    ownerName
    members {
        userId
        isConfirmed
        isIgnored
      
    }
   
    }
 }
`;


const GET_USER_MATUAL_ACCOUNTS = gql`
{
  getUserMatualAccounts{
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


const GET_ALL_USERS = gql`
query{
  getAllUsers{
    id
    username
    profileImageUrl
  }
}

`;