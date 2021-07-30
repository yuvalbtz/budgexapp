import React,{useState} from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogContentText,
  TextField,
  FormControl } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../../../hooks/useForm'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../../../util/history';
import {itemsList} from '../../../util/spendingEarningList'

const useStyles = makeStyles((theme) => ({
    
        root: {
          height: 0,
          
          
        },
        wrapper: {
          width: 100 + theme.spacing(2),
          
        },

        margin:{
           margin:theme.spacing(1)
        },
           
})); // styles for general modal




function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        id='numberformat'
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="₪"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


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

export default function SimpleSlide({accountId, scrollToBottom}) {
    
    const options = itemsList.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
    
    
 
    const classes = useStyles();
    const FormClasses = useFormStyles()
    
    const ModalIsOpen = window.location.pathname === `/myAccounts/${accountId}/addItem`
    
    const [radioValue, setRadioValue] =useState('')
    const [errors, setErrors] = useState({});
    const [category, setCategory] = useState('')  
    const [numberformat ,setNumberformat] = useState('')
    const { onChange, onSubmit, values } = useForm(addItemtCallback, {
    title: category,
    description:'',
    media:'',
    amount: numberformat
   
  });

  
   
  
  

    const [addItem, { loading }] = useMutation(ADD_ITEM, {
     onCompleted:() => {
       history.goBack()
       scrollToBottom()

     },
        update(_,result){
            values.title = ''
            values.description = ''
            values.media = ''
            values.amount = null
            setRadioValue('')
            setNumberformat('')
            setCategory('')
            console.log("verify action itemAdded!"); 
        },
        variables:{
            accountId, 
            title: category,
            description:values.description,
            media:values.media,
            amount: radioValue === "spending" ? -Math.abs(numberformat) : Math.abs(numberformat),
        },

      
      onError:(err) =>{
        console.log(err);
      }
    });
  
    function addItemtCallback() {
      addItem();
     }
    
     const handleRadioChange = (event) => {
      setRadioValue(event.target.value);
     
    };
  
  return (
    
  

      <div>
     
      <Dialog
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => !ModalIsOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:2, textAlign:'center'}}
        
      >
        <form  onSubmit={onSubmit} noValidate>
        <DialogTitle id="alert-dialog-slide-title"> <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:הוספת פריט</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          : הוסף פריט לרשימה
          </DialogContentText>
        
           <div>
           <FormControl component="fieldset"  >
           <RadioGroup row aria-label="option" name="option" value={radioValue} onChange={handleRadioChange}>
           <FormControlLabel labelPlacement="start"  value="spending" control={<Radio />} label="הוצאה" />
          <FormControlLabel labelPlacement="start"  value="earning" control={<Radio />} label="הכנסה" />
        </RadioGroup>
         </FormControl>
           </div>




          <div>
        <FormControl className={classes.margin}>
         <Autocomplete
         id="grouped-demo1"
         options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
         groupBy={(option) => option.firstLetter}
         getOptionLabel={(option) =>option.title}
         getOptionSelected={(option, value) => option.title === value.title}
         onInputChange={(e,value) => setCategory(value)}
         style={{ minWidth:210}}
         inputValue={category}
         renderInput={(params) => <TextField {...params} value={category} name="title" type="text" label="קטגוריה" />}
         clearOnEscape
         disabled={radioValue === ''}
        
    />
        
      </FormControl>
      </div>  

      <div>
      <FormControl  className={classes.margin}>
      <TextField
          id="standard-textarea1"
          value={values.description}
          onChange={onChange}
          name="description" 
          type="text" 
          label="תיאור"
          multiline
          disabled={radioValue === ''}
        />
      </FormControl>  
      </div>

      <div>
       <FormControl className={classes.margin}>
       <TextField
        label="סכום"
        value={numberformat}
        onChange={(e) => setNumberformat(parseFloat(e.target.value))}    
        id="formatted-numberformat-input"
        name="amount"
        disabled={radioValue === ''}
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
      />
       </FormControl>
       </div>   
       
       
       
        </DialogContent>
        <DialogActions>
       {loading ? (<CircularProgress variant='indeterminate' style={{margin:'0 auto',color:'green'}} size={35} />)
        : ( <Fab
          aria-label="save"
          color="primary"
          style={{margin:'0 auto',backgroundColor:'green'}}
          size={'small'}
          type="submit"
          onClick={onSubmit}
          disabled={ category.trim() === "" || isNaN(parseFloat(numberformat))}
           
        >
         <CheckIcon />
        </Fab>)}
       
        
        </DialogActions>
        </form>
      </Dialog>
    </div>




      
  );
}


const ADD_ITEM = gql`
mutation addItem($accountId:ID!, $title:String!, $description:String!,$media:String,$amount:Float) {
    addItem(accountId:$accountId, title:$title ,description:$description, media:$media, amount:$amount){
    id
    title
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



 
 
