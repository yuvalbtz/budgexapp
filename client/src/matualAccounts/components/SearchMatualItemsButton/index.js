import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Fab, Paper, Slide } from '@material-ui/core';
import {useParams } from 'react-router-dom';
import {useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';


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
    backgroundColor:theme.palette.primary.main

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };


  const accountId = params.accountId
 
 const [searchQuery, setSearchQuery] = React.useState("")
 const accountIdReducer = useSelector(state => state.uiReducer.getCurrentAccountUi)
 const [options, setOptions] = React.useState([])
const input = React.useRef()
 


 React.useEffect(() => {
    if(!open){
        setSearchQuery('')
        searchItem()
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
      
        data.getUserMatualAccount = result.data.searchMatualItem
       
   
      proxy.writeQuery({ query: GET_USER_ACCOUNT,data});
     },
     onCompleted:(data) => console.log(data),
     onError:(err) => console.log(err)
   })

  




  return (
    <div >
    
    <Fab  
    onClick={handleClickOpen}
    className={classes.FabSearch} 
    size="medium" 
    color="primary" 
    aria-label="search" >
     <IconButton 
      component='span'  
     style={{color:'white'}} 
     /* to={`/myAccounts/${params.accountId}/statis`} */>
       <SearchIcon /> 
      </IconButton> 
      </Fab>
      
      <Slide in={open}>
     <Paper className={classes.paper}> 
         <div  className={classes.search}>
            <Autocomplete
                id="grouped-demoAItem"
                classes={{inputRoot:classes.SearchField}}
                closeIcon={false}
                options={options}
                getOptionLabel={(option) =>  option  ? option : '' }
                style={{ width: 300 }}
                renderInput={(params) => <CssTextField 
                  {...params} 
                value={searchQuery}
                placeholder="Search..." 
                inputRef={input => input && open && input.focus()}
                variant="standard" />}
                onSelect={() => searchItem() }
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

mutation searchMatualItem($searchQuery:String!, $accountId:ID!){
   searchMatualItem(searchQuery:$searchQuery,accountId:$accountId){
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
        getUserMatualAccount(accountId:$accountId){
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


