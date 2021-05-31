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
  FormControl } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../../hooks/useForm'
import { SET_AddItem_Modal_Open } from '../../Redux/actionTypes';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../../util/history';
import { Redirect } from 'react-router-dom';

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
    
    const options = top100Films.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
    
    
 
    const classes = useStyles();
    const FormClasses = useFormStyles()
    const dispatch = useDispatch()
    //const ModalIsOpen = useSelector(state => state.uiReducer.AddItemModalIsOpen)
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
         id="grouped-demo"
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
          id="standard-textarea"
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

const top100Films = [
    { title: 'ביגוד והלבשה', year: 1994 },
    { title: 'חולצות', year: 1972 },
    { title: 'מכנסיים', year: 1974 },
    { title: 'גרביים', year: 2008 },
    { title: 'בגדים לשינה', year: 1957 },
    { title:  "מעיל", year: 1993 },
    { title: "ז'קט", year: 1994 },
    { title: 'מעיל גשם/ רוח', year: 2003 },
    { title: 'נעלי הליכה', year: 1966 },
    { title: 'נעלי בית', year: 1999 },
    { title: 'כפכפים', year: 2001 },
    { title: 'חגורות', year: 1980 },
    { title: 'עניבות', year: 1994 },
    { title: 'מגבות', year: 2010 },
    { title: 'משכורת', year: 2002 },
    { title: "פנס", year: 1975 },
    { title: 'בגד ים', year: 1990 },
    { title: 'מצפן', year: 1999 },
    { title: 'ארנק', year: 1954 },
    { title: 'שעון', year: 1977 },
    { title: 'פלאפון', year: 2002 },
    { title: 'ספר', year: 1995 },
    { title: 'תרופות', year: 1991 },
    { title: "טלויזיה", year: 1946 },
    { title: 'סוני פלייסטישן', year: 1997 },
    { title: 'מחשב נייד', year: 1995 },
    { title: 'מחבט טניס', year: 1994 },
    { title: "מוצ'ילה", year: 2001 },
    { title: 'שתייה', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];


 
 
