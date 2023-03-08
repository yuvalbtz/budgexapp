import React,{useState} from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import { Typography, DialogContent,DialogActions,DialogContentText,TextField,FormControl,IconButton} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../../../hooks/useForm'
import {SET_UpdateItem_Modal_Open } from '../../../Redux/actionTypes';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import history from '../../../util/history';
import {itemsList} from '../../../util/spendingEarningList'

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
    
        root: {
          height: 0,
          
          
        },
        wrapper: {
          width: 100 + theme.spacing(2),
          
        },

        margin:{
           margin:theme.spacing(1)
        },

        radioButton:{
            backgroundColor:"#f50057",
        }
    
})); // styles for general modal




function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
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
 
  return <Slide direction="up" ref={ref}  {...props} />;
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

export default function SimpleSlide({accountId}) {
    
    const options = itemsList.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
    
   
 
    
   
    const classes = useStyles();
    const FormClasses = useFormStyles()
    const dispatch = useDispatch()
    const params = useParams()
    
    const itemDetails = useSelector(state => state.uiReducer.UpdateItemModalIsOpen.itemDetails)
    
    const ModalIsOpen = window.location.pathname === `/myAccounts/${accountId}/updateItem/${params.itemId}` 
    
    

    const [radioValue, setRadioValue] =useState('') 
    const [errors, setErrors] = useState({});
    const [category, setCategory] = useState('')  
    const [numberformat ,setNumberformat] = useState('')
   
    


    const { onChange, onSubmit, values } = useForm(updateItemCallback, {
    title:'',
    description:'',
    media:'',
    amount: numberformat
   
  });

  
 

  function CheckRadioValue(){
    if(itemDetails){
       
        let res = Math.sign(itemDetails.amount)
        
        switch(res){
            case 1:
                return "earning";
            
                case -1:
                 
            return "spending";
                 
          default:
                 return ""
    
        }
    }
    
 }

  

    const [updateItem, { loading }] = useMutation(UPDATE_ITEM, {
        onCompleted:() => {
        history.goBack()
        dispatch({type:SET_UpdateItem_Modal_Open, payload:null})  
       },
        update(_,result){
            values.title = ''
            values.description = ''
            values.media = ''
            values.amount = null
            setRadioValue('')
            setNumberformat('')
            setCategory('')
            console.log("verify action itemUpdated!"); 
        },
        variables:{
            accountId, 
            itemId:params.itemId,
            title: category,
            description:values.description,
            amount: radioValue === "spending" ? -Math.abs(numberformat) : Math.abs(numberformat),
        },

      
      onError:(err) =>{
        console.log(err);
      }
    });
  
    function updateItemCallback() {
        updateItem();
     }
    
     const handleRadioChange = (event) => {
       setRadioValue(event.target.value);
    };



    function checkUpdateFormValid(category,description,amount){
        if(itemDetails){
            if(category !== '' && !isNaN(amount)){
                return false
            }else{
                return true
            }
          }
     }
    


     function checkIfFeildsChanged(category,description,amount){
        if(itemDetails){
            if(category !== itemDetails.title || 
                description !== itemDetails.description || 
                amount !== itemDetails.amount || 
                radioValue !== CheckRadioValue()){
                 
                return false
                
            }else{
                return true
            }
        }
       
     }



    function UpdateFeildsOnOpen(){
        if(itemDetails){
            setRadioValue(CheckRadioValue())
            setCategory(itemDetails.title) 
            values.description = itemDetails.description
            setNumberformat(itemDetails.amount) 
        }
    }

React.useEffect(() =>{ 
  UpdateFeildsOnOpen(); 

  console.log(itemDetails);  
} 


  ,[ModalIsOpen])
    
  return (
    
      <div>
     
      <Dialog
        open={ModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => !ModalIsOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:3, textAlign:'center'}}
        
      >
        <form  onSubmit={onSubmit} noValidate>
        <DialogTitle id="alert-dialog-slide-title" onClose={() => {
            history.goBack()
            setRadioValue('')
             }} style={{textAlign:'center'}}> 
        <Typography component="div" variant="h5" className={FormClasses.HeadLine}>:עריכת פריט</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          : עדכן פריט מהרשימה
          </DialogContentText>
        
           <div>
           <FormControl  className={classes.margin}  component="fieldset"  >

          <div 
          style={{display:'flex', 
          alignItems:'center', 
          justifyContent:'space-around', 
          width:'110%'}}  
          onChange={handleRadioChange}>
          
          <label htmlFor="spending" style={{fontSize:18}}>הוצאה</label>
          <input 
          style={{
              height:18, 
              width:18}} 
              readOnly 
              type="radio" 
              className={classes.radioButton}
              id="spending" 
              value="spending"  
              checked={radioValue === "spending"} 
              name="spending" /> 
          
         
          <label htmlFor="earning" style={{fontSize:18}}>הכנסה</label>
          <input 
          style={{
              height:18, 
              width:18}} 
              type="radio" 
              id="earning" 
              value="earning" 
              readOnly
              checked={radioValue === "earning"}
              name="earning"
              /> 
          
        </div>
        </FormControl>
        </div>




          <div>
        <FormControl className={classes.margin}>
         <Autocomplete
         id="grouped-demo"
         options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
         groupBy={(option) => option.firstLetter}
         getOptionLabel={(option) =>option.title}
         getOptionSelected={(option, value) => option.title === value.title}
         onInputChange={(e,value) => setCategory(value)}
         style={{ minWidth:210}}
         inputValue={category}
         renderInput={(params) => <TextField {...params} onChange={onchange} value={category} name="title" type="text" label="קטגוריה" />}
         clearOnEscape
        
        
    />
        
      </FormControl>
      </div>  

      <div>
      <FormControl className={classes.margin}>
      <TextField
          id="standard-textarea"
          value={values.description}
          onChange={onChange}
          name="description" 
          type="text" 
          label="תיאור"
          multiline
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
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
      />
       </FormControl>
       </div>   
       </DialogContent>
        <DialogActions>
        
        {loading ? (<CircularProgress variant='indeterminate'  style={{margin:'0 auto', color:'green'}} size={35}/>) 
        
        : (<Fab
            aria-label="save"
            color="primary"
            style={{margin:'0 auto',backgroundColor:'green'}}
            size={'small'}
            type="submit"
            onClick={onSubmit}
            disabled={checkUpdateFormValid(category,values.description,numberformat) || 
              checkIfFeildsChanged(category,values.description,numberformat)}
  
          >
           <CheckIcon />
          </Fab>)}

        </DialogActions>
        </form>
      </Dialog>
    </div>




      
  );
}


const UPDATE_ITEM = gql`
mutation updateItem($accountId:ID!, $itemId:ID!, $title:String!, $description:String!, $amount:Float) {
    updateItem(accountId:$accountId, itemId:$itemId, title:$title ,description:$description, amount:$amount){
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


 
 
