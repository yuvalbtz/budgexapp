import React from 'react';
import {makeStyles, withStyles } from '@material-ui/core/styles';
import {Paper, Slide } from '@material-ui/core';
import {useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



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
  
  const open = window.location.pathname === '/matualAccounts/search'

 
 const [searchQuery, setSearchQuery] = React.useState("")
 const [options, setOptions] = React.useState([])


 const [searchAccount,{loading}] = useMutation(SEARCH_ACCOUNTS,{
    variables:{
     searchQuery
    },
    update:(proxy, result) => {
     const data = proxy.readQuery({
       query: GET_USER_MATUAL_ACCOUNTS,
       variables:{searchQuery}
     });
     
       data.getUserMatualAccounts = result.data.searchMatualAccount
      
  
     proxy.writeQuery({ query: GET_USER_MATUAL_ACCOUNTS,data});
    
    },
   
    onCompleted:(data) => console.log(data),
    onError:(err) => console.log(err)
  })

const {data} = useQuery(GET_USER_MATUAL_ACCOUNTS)

 React.useEffect(() => {
 /*  if(!open){
    setSearchQuery('')
    searchAccount()
} */
  
if(data){
   
 const unic =  data.getUserMatualAccounts.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
 const filterdTitle = unic.map(item => item.title) 
  
  setOptions(filterdTitle)
  
  }

 },[data,open])



  

  

  return (
    <div >
     <Slide in={open}>
     <Paper className={classes.paper}> 
         <div  className={classes.search}>
            <Autocomplete
                id="grouped-demoAItem"
                classes={{inputRoot:classes.SearchField}}
                closeIcon={false}
                options={options}
                getOptionLabel={(option) => option ? option : '' }
                style={{ width: 300 }}
                renderInput={(params) => <CssTextField 
                  {...params} 
                placeholder="Search..." 
                inputRef={input => input && open && input.focus()}
                variant="standard" />}
                onSelect={() => searchAccount() }
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


const SEARCH_ACCOUNTS = gql`

mutation searchMatualAccount($searchQuery:String!){
    searchMatualAccount(searchQuery:$searchQuery){
        id
        createdAt
        updatedAt
        owner
        ownerName
        title
        list{
          id
        }
        members {
          userId  
          isConfirmed
          isIgnored
        
      }
    }
  }


`;

const GET_USER_MATUAL_ACCOUNTS = gql`
 {
  getUserMatualAccounts{
    id
    createdAt
    updatedAt
    owner
    ownerName
    title
    list{
      id
    }
    members {
      userId  
      isConfirmed
      isIgnored
    
  }
}
}
`;
