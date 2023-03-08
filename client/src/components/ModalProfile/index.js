import React from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutline from '@material-ui/icons/MailOutline';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import { Typography,
     DialogTitle,
      DialogContent,
       DialogActions,
        DialogContentText,
        FormControl,
        TextField
     } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import {SET_USER } from '../../Redux/actionTypes';
import { useState } from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios'
import history from '../../util/history';
import { useForm } from '../../hooks/useForm';

const useStyles = makeStyles((theme) => ({
    
        root: {
          height: 0,
          
        },
        wrapper: {
          width: 100 + theme.spacing(2),
          
        },

      margin:{
          margin:'5px'
      },

      avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
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
    },
    input:{
      display:'none'
    }
}));


const FAbEdit = ({setProfileImage}) => {
  const FormClasses = useFormStyles();
  const classes = useStyles()
  const [fileSelected, setFileSelected] = useState(null)
  const [imageProfile ,setImageProfile] = useState('')
  const [loading ,setLoading] = useState(false)
  const currentImageProfile = useSelector(state => state.userReducer.userDetails)
  const formData = new FormData()
  
  
 useEffect(() =>{ 
 
  if(fileSelected){
    formData.append('file', fileSelected)
    formData.append('upload_preset','temed3va')
    formData.append('folder',`Users/${currentImageProfile.id}/Profile`)
    
    Axios.post("https://api.cloudinary.com/v1_1/dw4v5axnj/image/upload/",formData)
    .then(res => {
      setImageProfile(res.data.secure_url) // for Profile Preveiw
      setProfileImage(res.data.secure_url) // for Updating Mutation
      console.log(res.data.secure_url);
      setLoading(false)}).catch(err => console.log(err)) 
  
    
  }
} 
    ,[fileSelected]) 
  
  function handleFileChanged(e){
    e.preventDefault() 
   setFileSelected(e.target.files[0])
   setLoading(true)
   
}









return (
      <>
       <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<>
       {loading ? (<CircularProgress color="secondary" size={30}/>) : 
       
       (<><input name="file" accept="image/*" className={FormClasses.input} id="icon-button-file" type="file" onChange={handleFileChanged} />
       <label htmlFor="icon-button-file">
      <Fab color="inherit" aria-label="edit" size={'small'} component="span">
      <AddAPhotoRoundedIcon />
     </Fab>
     </label></>)}
     </>}
      >
      <Avatar alt="image" src={imageProfile === '' && currentImageProfile ? currentImageProfile.profileImageUrl : imageProfile} className={classes.avatar} />
     
      </Badge>   
     </>
  )
}



export default function SimpleSlide() {
    const classes = useStyles();
    const FormClasses = useFormStyles()
    
   
    const ModalIsOpen = window.location.pathname === "/profile/edit"
    
    
    const user = useSelector(state => state.userReducer.userDetails)
    const dispatch = useDispatch()
    const [profileImage, setProfileImage] = useState('');
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(UpdateUserCallback, {
       profileImage:profileImage,
       email:"",
      });
    

  
    const [UpdateProfileCallback,{data,loading}] = useMutation(UPDATE_USER_PROFILE,
       {
          variables:{
        profileImage:profileImage,
        email:values.email
      },
      onCompleted:() => {
        setErrors({})
        setProfileImage('')
        history.goBack()
      }, 
      refetchQueries:[{query:GET_USER_STATE,variables:values}],
      onError(err) {
       setErrors(err.graphQLErrors[0].extensions.exception.errors)
        console.log(err);
        },
      })
     
  useEffect(() =>{
       if(user){
          values.email = user.email
         }
     
  },[user])
  
  

function UpdateUserCallback(){
  UpdateProfileCallback()
}
  
  return (
    
      <div>
     
      <Dialog
        onEscapeKeyDown={() =>!ModalIsOpen}
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => history.goBack()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:1, textAlign:'center'}}
        
      >
        <form onSubmit={onSubmit} noValidate>
        <DialogTitle id="alert-dialog-slide-title"> <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:עריכת פרופיל</Typography></DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          :עדכן את פרטי הפרופיל שלך
          </DialogContentText> 
          <div>
          <FormControl className={classes.margin}>
          <FAbEdit setProfileImage={setProfileImage}/>
         </FormControl>    
          </div>
          
       
         <div>
       <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-textfield783"
          label=":שם משתמש"
          type="text"
          name="username"
          value={"!שם משתמש קבוע"}
          disabled
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
          id="input-with-icon-textfield9845"
          label=":אימייל"
          type="email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
               <MailOutline/>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      </div>
        
        
        </DialogContent>
        <DialogActions>
        {loading ? (
           <CircularProgress size={35} variant='indeterminate' style={{margin:'0 auto', color:'green'}}/>
          ) : (
          <Fab
          aria-label="save"
          color="primary"
          style={{margin:'0 auto',backgroundColor:'green'}}
          size={'small'}
          onClick={() => UpdateUserCallback()}
          disabled={user && (user.email === values.email && profileImage === "")}
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



const UPDATE_USER_PROFILE = gql`

mutation updateUserProfile($profileImage:String! $email:String!) {
  updateUserProfile(profileImage:$profileImage email:$email){
    email
    id
    username
    profileImageUrl
  }
}

`;


const GET_USER_STATE = gql`
{
    getUserState{
      email
      id
      username
      profileImageUrl
    }
  }


`;