import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DialogContent, FormControl, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress'
import { useForm } from '../../hooks/useForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Link, withRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {SET_USER} from '../../Redux/actionTypes'
import history from '../../util/history'






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
    margin: '0 auto',
    color:'#242333'
},
  title:{
    textAlign:'center'
  },
  btnLogin:{
    textAlign:'left'
  },
  phone:{
    marginLeft:'12px',
    [theme.breakpoints.down('sm')]: {
      marginTop:'10px',
      marginBottom:'10px'
    },},

    HeadLine:{
      background:'#242333',
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
  

    const dispatch = useDispatch()
  
  
  const open = window.location.pathname === '/login'
  
  const [phone , setPhone] = useState(false);
 
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
   
  });

  function cleanFeilds(){
    values.username = ""
    values.password = ""
    
}
  
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy,{data: { login: userData }}) {
        setErrors({});
        console.log(userData);
        dispatch({type:SET_USER, payload:userData});
        cleanFeilds()
        localStorage.setItem("id",userData.id)
        window.location.href = '/myAccounts'
      },
   
    onError(err) {
    setErrors(err.graphQLErrors[0].extensions.exception.errors)
   
    },
    variables: values,
    
  });

  function loginUserCallback() {
    loginUser();
     
  }

  
 
    window.addEventListener('resize', () => {
      if(window.innerWidth <= 760){
        setPhone(true)
      } else{
        setPhone(false) 
      }
    },() => window.removeEventListener('resize'));



  const [FormValues, setValues] = React.useState({
    password: '',
    showPassword: false,

  });

  
  const handleClickShowPassword = () => {
    setValues({ ...FormValues, showPassword: !FormValues.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

  const classes = useStyles();
  return (
  <>
      <Button 
      className={classes.phone} 
      component={Link} 
      to={`/login`} 
      variant="outlined" 
      style={{color:"whitesmoke", 
      borderColor:'whitesmoke'}} 
     >
        התחבר
      </Button>
      <Dialog fullScreen={phone} onClose={() => history.goBack()} aria-labelledby="customized-dialog-title" open={open}>
         <form onSubmit={onSubmit} noValidate >
        
        <DialogTitle id="customized-dialog-title" onClose={() => history.goBack()} style={{textAlign:'center'}}>
        <Typography component="div" variant="h6" className={classes.HeadLine}>:כניסה</Typography>
        </DialogTitle>
        
        
        <DialogContent style={{textAlign:'center'}}>
        <div>
       <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-textfield123"
          label=":שם משתמש"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
          helperText={errors.username}
          autoFocus
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
      <FormControl className={clsx(classes.margin, classes.textField)}>
          <TextField
            id="standard-adornment-password"
            label=":סיסמה"
            autoComplete="on"
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
       
        </DialogContent>
        
        
        
       
       
        { errors.general && (
            <h4 style={{margin:'0 auto', color:'red', textAlign:'center'}}>{errors.general}</h4>
             )}
       
        <DialogActions>
       
       {!loading ?  <Button type="submit" fullWidth style={{backgroundColor:'#242333', color:'whitesmoke'}}  variant="contained" onClick={onSubmit} color="primary">
            התחבר
          </Button> :  <CircularProgress className={classes.loader} />}
             
         
        </DialogActions>
        
        </form>
      
      </Dialog>
    </> 
  
  );
}

export default withRouter(CustomizedDialogs);

  const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        createdAt
        token
        profileImageUrl
      }
    }
  `;


  const GET_USER_STATE = gql`
query{
    getUserState{
      email
      id
      username
      profileImageUrl
    }
  }


`;