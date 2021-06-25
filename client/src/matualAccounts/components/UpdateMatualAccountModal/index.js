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
  IconButton, 
  Chip,
  Avatar,
  Checkbox} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import gql from 'graphql-tag'
import {useLazyQuery, useMutation, useQuery} from '@apollo/react-hooks'
import {useForm} from '../../../hooks/useForm'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../../../util/history';
import { useParams } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const useStyles = makeStyles((theme) => ({
    
        root: {
          height: 0,
          
        },
        wrapper: {
          width: 100 + theme.spacing(2),
          
        },
        margin:{
          margin:'5px'
        }      
      
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
    const accountDetails = useSelector(state => state.uiReducer.UpdateAccountModalIsOpen.accountDetails)
    const ModalIsOpen = window.location.pathname === `/matualAccounts/updateAccount/${params.accountId}` && accountDetails !== null
    const [options, setOptions] = React.useState([]);
   
    
    
    
    const [selectedFreinds, setSelectedFreinds] = React.useState([])
   
    const [getAllUsers,{data}] = useLazyQuery(GET_ALL_USERS)
    
    const [MembersInAccount, setMembersInAccount] = React.useState([])
   
 
    
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const input = React.useRef()
    
    
    const [errors, setErrors] = useState({});
  
  const {onSubmit, values} = useForm(updateAccountCallback, {
    title: title,
  
   
  });
 
  const selectedFreindsId =  selectedFreinds.map(f => f.id)
    
  

    const [updateAccount, { loading }] = useMutation(UPDATE_ACCOUNT, {
      variables:{
        accountId:params.accountId,  
        title: title,
        freinds:selectedFreindsId
      },
      update(proxy, result) {
        /* const data = proxy.readQuery({
          query: GET_USER_MATUAL_ACCOUNTS
        });
        data.getUserMatualAccounts = [result.data.updateMatualAccount, ...data.getUserMatualAccounts];
        proxy.writeQuery({ query: GET_USER_MATUAL_ACCOUNTS, data }); */
        values.title = ''
       },
      onCompleted:() =>{
        history.goBack()
        
      },
      refetchQueries:[{query:GET_USER_MATUAL_ACCOUNTS, 
        variables:{
        accountId:params.accountId,  
        title: title,
        freinds:selectedFreindsId}}]});

      
    
  
    function updateAccountCallback() {
        updateAccount();
    }
    
    
    
    
    
   
    function UpdateAccountFeild(){
        if(accountDetails){
            setTitle(accountDetails.title)
            if(accountDetails.members.length > 0 ){
              const AccountMembers = accountDetails.members.map(m => m.userId)
              const MembersAlreadyInAccount = options.filter(({id}) => AccountMembers.includes(id))
              setMembersInAccount(MembersAlreadyInAccount)
              console.log("answer", MembersAlreadyInAccount);
             }else{
              console.log("cancel event");  
              setMembersInAccount([])
            }
      }
        
    }

    console.log("selected id" ,selectedFreindsId);
    
    


    
   console.log("options!!",options);
   React.useEffect(() => {
    if(!ModalIsOpen){
      setSelectedFreinds([])
    }
    
    getAllUsers();
      UpdateAccountFeild()
     
   },[ModalIsOpen])

   React.useEffect(() => {
    if(data){
        const users = data.getAllUsers;
        setOptions(users);
        console.log("users",options);
      }
     }, [data]);


    
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
        
        
            <DialogTitle id="alert-dialog-slide-title" onClose={() => {
              setSelectedFreinds([])
              history.goBack()}} style={{textAlign:'center'}}> 
        <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:עריכת חשבון</Typography>
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          : עדכן את שם החשבון
          </DialogContentText>
        
          <div>
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
      </div> 
    
      <div>
      <FormControl className={classes.margin}>
      
        <Autocomplete
              multiple
              disableCloseOnSelect
              id="asynchronous-demo6"
              name="addFreinds"
              style={{maxWidth:250,minWidth:220}}
             
              open={open}
              onOpen={() => setOpen(true)}
             
              onClose={() => setOpen(false)}
              groupBy={(option) => data && `${data.getAllUsers.length + ' users'}`}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(e,val, res) => {
                if(MembersInAccount.length > 0 && res === "clear"){
                  setMembersInAccount([])
                  val = null
                } else {
                  setSelectedFreinds(val)
                }
              }}
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
              value={selectedFreinds.length === 0 ? MembersInAccount : selectedFreinds}
             
              /* loading */
              
             
        
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
                 label=":הוסף חברים"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (<>{(selectedFreinds.length === 0 && MembersInAccount.length === 0) && (<GroupRoundedIcon/>)} {params.InputProps.startAdornment}</>),
                }}
                />
              )}
            />
    
      
      
  
      </FormControl>   
      </div> 





        
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
            disabled={accountDetails && (title.trim() === "" || title.trim() === accountDetails.title) && selectedFreinds.length === 0 }
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
mutation updateMatualAccount($accountId:ID!,$title:String!, $freinds:[String]! ) {
  updateMatualAccount(accountId:$accountId,title:$title, freinds:$freinds){
    id
    createdAt
    updatedAt
    title
    owner
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
    title
    owner
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


 
 
