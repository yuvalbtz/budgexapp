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
import { SET_Profile_Modal_Open, SET_USER } from '../../Redux/actionTypes';
import { useState } from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios'


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


const FAbEdit = ({setProfileImageUrl, user}) => {
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
    formData.append('folder',`Users/${currentImageProfile.username}/Profile`)
    
    Axios.post("https://api.cloudinary.com/v1_1/dw4v5axnj/image/upload/",formData)
    .then(res => {
      setImageProfile(res.data.url) // for Profile Preveiw
      setProfileImageUrl(res.data.url) // for Updating Mutation
      setLoading(false)}).catch(err => console.log(err)) 
  
    console.log(user);
  }
} 
    ,[fileSelected]) 
  
  function handleFileChanged(e){
    e.preventDefault() 
   setFileSelected(e.target.files[0])
   setLoading(true)
   
}

//{file:fileSelected, upload_preset:'temed3va'}




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
    const ModalIsOpen = useSelector(state => state.uiReducer.ModalProfileIsOpen)
    const [profileImageUrl, setProfileImageUrl] = useState('')
    
    
    
    const user = useSelector(state => state.userReducer.userDetails)
    const dispatch = useDispatch()
    const input = React.useRef()
    
    const [UpdateProfileCallback,{data,loading}] = useMutation(UPDATE_USER_PROFILE,{variables:{profileImage:profileImageUrl},
      onCompleted:() => dispatch({type:SET_Profile_Modal_Open}), 
      onError:(err) => console.log(err)})
     
    useEffect(() =>{
        if(data){
          dispatch({type:SET_USER, payload:data.updateUserProfile})
          console.log(user);
        }
    },[data])
  
  
    setTimeout(() => {
      if(ModalIsOpen){
       input.current.focus()
       }
    },100) 
  
    



  return (
    
      <div>
     
      <Dialog
         onEscapeKeyDown={() => dispatch({type:SET_Profile_Modal_Open})}
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => !ModalIsOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:1, textAlign:'center'}}
        
      >
        <form >
        <DialogTitle id="alert-dialog-slide-title"> <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:עריכת פרופיל</Typography></DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          :עדכן את פרטי הפרופיל שלך
          </DialogContentText>
        
          
          
          <div>
          <FormControl className={classes.margin}>
          <FAbEdit user={user} setProfileImageUrl={setProfileImageUrl}/>
         </FormControl>    
          </div>
          
       
         <div>
       <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-textfield3"
          label=":שם משתמש"
          type="text"
          name="username"
          inputRef={input}
          /* value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
          helperText={errors.username} */
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
          id="input-with-icon-textfield5"
          label=":אימייל"
          type="email"
          name="email"
          /* value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
          helperText={errors.username} */
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
          onClick={() => UpdateProfileCallback()}
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

mutation updateUserProfile($profileImage:String!) {
  updateUserProfile(profileImage:$profileImage){
    username
    profileImageUrl
    email
  }
}

`;