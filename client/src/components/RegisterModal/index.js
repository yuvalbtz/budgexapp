import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FormControl, TextField, DialogContent } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutline from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress'
import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/useForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useHistory} from 'react-router-dom'
import { SET_USER } from '../../Redux/actionTypes';
import {useDispatch} from 'react-redux'





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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  loader: {
    position:'relative',
    margin: '0 auto'
},
  title:{
    textAlign:'center'
  },
  btnLogin:{
    textAlign:'left'
  },
  phone:{
    marginLeft:'15px',
    [theme.breakpoints.down('sm')]: {
      marginTop:'10px',
      marginBottom:'30px'
    },},

    HeadLine:{
      background:'#3f51b5',
      color:'whitesmoke',
      fontFamily: 'Varela Round',
      borderRadius:'12px'
  }
}));


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



const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

 function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [phone , setPhone] = useState(false);
  const dispatch = useDispatch()
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  function cleanFeilds(){
    values.username = ""
      values.email = ""
      values.password = ""
      values.confirmPassword = ""
}

  const history = useHistory();
  
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
        {
          data: { register: userData }  
        } 
      
       ) {
      setOpen(false);
       dispatch({type:SET_USER, payload:userData});
        cleanFeilds()
        localStorage.setItem("id",userData.id)
        window.location.href = '/myAccounts'
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }


  const handleClickOpen = () => {
    
  if(window.innerWidth <= 960){
        setPhone(true)
      } else{
        setPhone(false) 
      }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  const [FormValues, setValues] = React.useState({
    password: '',
    ConfirmPassword:'',
    showPassword: false,
    showConfirmPassword:false
  });

  

  const handleClickShowPassword = () => {
    setValues({ ...FormValues, showPassword: !FormValues.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...FormValues, showConfirmPassword: !FormValues.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

  const classes = useStyles();
  return (
   <>
      <Button className={classes.phone} variant="outlined" style={{color:"whitesmoke", borderColor:'whitesmoke'}} onClick={handleClickOpen}>
        הירשם
      </Button>
      <Dialog fullScreen={phone} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        
        <form onSubmit={onSubmit}  noValidate >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{textAlign:'center'}}>
           <Typography component="div" variant="h6" className={classes.HeadLine}>:הרשמה</Typography>
        </DialogTitle>
        <DialogContent style={{textAlign:'center'}} >
      
        <div>
        <FormControl className={classes.margin}>
        
        <TextField
          id="input-with-icon-textfield"
          label=":שם משתמש"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
          helperText={errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      </div>
        <div>
      <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-email"
         label=":אימייל"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
            />
      </FormControl>
      </div>


       <div>
      <FormControl className={clsx(classes.margin, classes.textField)}>
          <TextField
            id="standard-adornment-password"
            label=":סיסמה"
            type={FormValues.showPassword ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={onChange}
            error={errors.password ? true : false}
            helperText={errors.password}
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {FormValues.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
                )
            }}
          />
        </FormControl>
        </div>


        <div>
        <FormControl className={clsx(classes.margin, classes.textField)}>
         <TextField
            id="standard-adornment-password2"
            label=":אימות סיסמה"
            type={FormValues.showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={onChange}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword}
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {FormValues.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
            }}
          />
        </FormControl>
        </div>
        </DialogContent>
        
        {errors.general && (
            <h4 style={{margin:'0 auto', color:'red', textAlign:'center'}}>{errors.general}</h4>
             )}

        <DialogActions>
       {!loading ? <Button type="submit" autoFocus fullWidth  variant="contained" onClick={onSubmit} color="primary">
            הירשם
          </Button> :  <CircularProgress className={classes.loader} />}
               
        
        </DialogActions>
        </form>
      </Dialog>
    </>
  
  );
}

export default CustomizedDialogs;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
      profileImageUrl
    }
  }
`;