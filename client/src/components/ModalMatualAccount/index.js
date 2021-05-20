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
import {themeModal} from '../../util/themeModal'
import Dialog from '@material-ui/core/Dialog';
import { SET_MatualAccount_Modal_Open } from '../../Redux/actionTypes';

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


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}






export default function SimpleSlide() {
    const classes = useStyles();
    const FormClasses = useFormStyles()
    const ModalIsOpen = useSelector(state => state.uiReducer.MatualAccountIsOpen)
    const dispatch = useDispatch();




    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
  

    const input = React.useRef()
    setTimeout(() => {
      if(ModalIsOpen){
       input.current.focus()
       }
    },100) 
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return true;
      }
  
      (async () => {
        const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
        await sleep(1e3); // For demo purposes.
        const countries = await response.json();
  
        if (active) {
          setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
        }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);

    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

  
  return (

      <div>
     
      <Dialog
        onEscapeKeyDown={() => dispatch({type:SET_MatualAccount_Modal_Open})}
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => !ModalIsOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:1, textAlign:'center'}}
      >
        <form>
        <DialogTitle id="alert-dialog-slide-title">  <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:יצירת חשבון משותף</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          :רשום את שם החשבון שברצונך ליצור והוסף חברים לחשבון
          </DialogContentText>
          
          <div>
          <FormControl className={classes.margin}>
        <TextField
          id="input-with-icon-textfield1"
          label=":שם החשבון"
          type="text"
          name="title"
          inputRef={input}
         /*  value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
          helperText={errors.username} */
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
      id="asynchronous-demo"
      name="addFreinds"
      style={{minWidth:220}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label=":הוסף חברים"
          style={{width:'100%'}}
          InputProps={{
            ...params.InputProps,
            startAdornment:(<GroupRoundedIcon/>),
            endAdornment: (
              <React.Fragment>
                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
      </FormControl>   
      </div> 
        </DialogContent>
        <DialogActions>
        <Fab
          aria-label="save"
          color="primary"
          style={{margin:'0 auto',backgroundColor:'green'}}
          size={'small'}
          
          /* onClick={handleButtonClick}  */
        >
         <CheckIcon />
        </Fab>
        </DialogActions>
       
        </form>
      </Dialog>
    </div>




  );
}
