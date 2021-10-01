import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {CircularProgress, Fab, Paper, Slide } from '@material-ui/core';
import {Link, useParams } from 'react-router-dom';
import {useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import history from '../../../util/history';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
   '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);


const useStyles = makeStyles((theme) => ({
   search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: (theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
   
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    curser:'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
    zIndex:15
    

  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    

    width: '100%',
    
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      
      
      '&:focus': {
        width: '20ch',
      },
    },
  },
  FabSearch:{
    position:'fixed',
    left:theme.spacing(2),
    bottom:theme.spacing(1),
    zIndex:3,
  
  },
  paper:{
    width:'100%', 
    height:'50px',
    position:'fixed',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    top:0, 
    zIndex:14, 
    borderRadius:0,
    backgroundColor:theme.palette.secondary.main

  },
  closeIndicator:{
    color: 'white',
  },
  SearchField:{
   color: 'white',
   fontFamily:'Varela Round',
   "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: '2px',
    borderColor: "blue"
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderWidth: "2px",
    borderColor: "blue"
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: "2px",
    borderColor: "blue"
  }
  }
}));



  

export default function SearchAppBar() {
  const classes = useStyles();
  
 
  
  const params = useParams()
  const accountId = params.accountId

  const open  = window.location.pathname === `/myAccounts/${accountId}/search`
 
 let input = React.useRef() 
 const [searchQuery, setSearchQuery] = React.useState("")
 const accountIdReducer = useSelector(state => state.uiReducer.getCurrentAccountUi)
 const [options, setOptions] = React.useState([])

 React.useEffect(() => {
  if(open){
    input.focus()
     
  }else{
   input.blur();
  }

  if(accountIdReducer){
   
 const unic =  accountIdReducer.list.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
 const filterdTitle = unic.map(item => item.title) 
  console.log(filterdTitle);
  setOptions(filterdTitle)
 
  }

 },[accountIdReducer,open])



   const [searchItem,{data, loading}] = useMutation(SEARCH_ITEMS,{
     variables:{
      searchQuery,
      accountId
     },
     update:(proxy, result) => {
      const data = proxy.readQuery({
        query: GET_USER_ACCOUNT,
        variables:{
          accountId
        }
        });
        
        data.getUserAccount = result.data.searchItem
       
   
      proxy.writeQuery({ query: GET_USER_ACCOUNT,data});
     },
     onCompleted:(data) => console.log(data),
     onError:(err) => console.log(err)
   })

  

  return (
    <div >
    <Fab  
    disableFocusRipple 
    disableRipple
    component={Link}  
   className={classes.FabSearch} 
   to={`/myAccounts/${params.accountId}/search`}
   size="medium" 
    color="secondary" 
    aria-label="search" >
     {open ? <IconButton disableFocusRipple disableRipple style={{color:'white'}} onClick={() => history.goBack()}><CloseIcon /></IconButton>: <SearchIcon/>}
     </Fab>
      
      <Slide in={open}>
     <Paper className={classes.paper}> 
         <div  className={classes.search}>
            <Autocomplete
                id="grouped-demoAItem123"
                classes={{inputRoot:classes.SearchField,clearIndicator:classes.closeIndicator,popupIndicatorOpen:classes.closeIndicator}}
                options={options}
                loading={loading}
                getOptionLabel={(option) => option ? option : '' }
                style={{ width: 300 }}
                renderInput={(params) => <CssTextField 
                  {...params} 
                placeholder="Search..." 
                inputRef={(el) => input = el}
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                />
              }
              
                onSelect={() => searchItem()}
                onChange={(val,value,res) =>{
                 
                  if(value){
                   setSearchQuery(value)  
                  }else{
                    setSearchQuery('') 
                    
                  }}}

                 
            />
          </div>
     </Paper>
      </Slide>
</div>
  );
}


const SEARCH_ITEMS = gql`

mutation searchItem($searchQuery:String!, $accountId:ID!){
   searchItem(searchQuery:$searchQuery,accountId:$accountId){
    title
    id
    owner
    list{
      id
      title
      description
      media
      amount
      createdAt
      updatedAt
     }
    }
  }


`;

const GET_USER_ACCOUNT = gql`

query($accountId:ID!){
        getUserAccount(accountId:$accountId){
            title
            id
            owner
            list{
              id
              title
              description
              media
              amount
              createdAt
              updatedAt
            }
        }  
      }


`;


