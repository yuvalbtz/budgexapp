import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import images from '../../util/bg-images.json'
import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import MatualAccountModal from '../../matualAccounts/components/ModalMatualAccount'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import MenuBarButton from '../../matualAccounts/components/MoreOptionsButton'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import UpdateMatualAccountModal from '../../matualAccounts/components/UpdateMatualAccountModal'
import ShowAccountFreindsButton from '../../matualAccounts/components/ShowAccountFreindsButton'
import { IconButton, Typography } from '@material-ui/core';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
   
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.up('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 200,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(6)}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },

  button:{
    display: 'flex',
    flexWrap: 'wrap',
    },
    
    createdBySubtitle:{
      lineHeight:'inherit'
    }
});



function ButtonBases(props) {
  const { classes } = props;
   
  
  console.log("myMatual page");
  
   const dispatch = useDispatch()
   
   const user = useSelector(state => state.userReducer.userDetails)


   const {data, subscribeToMore} = useQuery(GET_USER_MATUAL_ACCOUNTS);
  
   React.useEffect(() => {
     let unsubscribe;

     unsubscribe = subscribeToMore({
      document:ITEM_CHANGED_SUBS,
      updateQuery:(prev, {subscriptionData}) => {
        const newList = subscriptionData.data.itemChangedSubs
        if(!subscriptionData.data) return prev
        
        return Object.assign({}, prev, {
          getUserMatualAccount: {newList, ...prev.getUserMatualAccount}
          });
       },
    })
     
    unsubscribe = subscribeToMore({
      document:ACCOUNT_CHANGED_SUBS,
      updateQuery:(prev, {subscriptionData}) => {
        const updatedAccounts = subscriptionData.data.accountChangedSubs
        const filteredUpdatedAccounts = user && updatedAccounts.filter(item => item.members.find(i =>  i.userId === user.id && i.isConfirmed === true) || item.owner === user.id);
        if (!filteredUpdatedAccounts){
          return Object.assign({}, prev, {
            getUserMatualAccounts:[...prev.getUserMatualAccounts]
            });
        } 
        return Object.assign({}, prev, {
          getUserMatualAccounts: filteredUpdatedAccounts.reverse()
          });
       }
    })
    
    if(unsubscribe) return () => unsubscribe() 

   },[subscribeToMore,user])
  
  
  console.log('data',data);
  
   return (
    <div className={classes.root}>
      <Grid  container 
        direction="row"
      >
      
      {data && data.getUserMatualAccounts.map((account, index) => (
        <Grid key={account.id} item xs={12} sm={4}>
      
       <div className={classes.button}>
       {user && ( <MenuBarButton accountId={account.id} accountDetails={account} IsUserOwner={account.owner === user.id}/>)}
       </div>
      
       <div style={{display:'flex', position:'relative',zIndex:13}}>
        <IconButton style={{position:'absolute', right:4,top:1, color:'white'}}>
        <ListAltRoundedIcon />
        <Typography variant='h6' component='h6' style={{marginLeft:5,fontFamily:'Varela Round',}}>
          {account.list.length}
        </Typography>
        </IconButton>
        </div>
       
        {user && (<ShowAccountFreindsButton members={account.members} accountId={account.id} /> )}
       
       <ButtonBase
          focusRipple
          key={account.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          component={Link}
          to={`/matualAccounts/${account.id}`}
          >
         
         <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(https://creditkarma-cms-ca.imgix.net/wp-content/uploads/sites/2/2020/08/50-30-20-rule932275488.jpg?w=1024&auto=compress)`,
            }}
          />
          <span className={classes.imageBackdrop} />
          
        <GridListTileBar
              classes={{subtitle:classes.createdBySubtitle}}
              title={account.title}
              subtitle={<span 
                style={{
                  position:'absolute', 
                  bottom:4, 
                  left:5,
                  whiteSpace:'noWrap',
                  maxWidth:'40%',
                  textOverflow:'ellipsis',
                  display:'inline',
                  overflow: 'hidden'}}>
                    created by: {user && account.ownerName === user.username ? 'You' : account.ownerName}
                    </span>}
            />
        
        </ButtonBase>
        <div style={{display:'flex', position:'relative',zIndex:13}}>
         <Typography 
        variant='subtitle2' 
        component='h6' 
        style={{
          position:'absolute', 
          right:4,bottom:2, 
          color:'white',
          marginLeft:5,
          fontFamily:'Varela Round',
          }}>
          {new Date(Number(account.createdAt)).toDateString()}
        </Typography>
        </div>
        </Grid>
       
    ))}
  
  
</Grid>
   
<MatualAccountModal/>
    
<UpdateMatualAccountModal/>
    
    
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);



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

const ACCOUNT_CHANGED_SUBS = gql`
subscription accountChangedSubs{
  accountChangedSubs{
    id
    createdAt
    updatedAt
    owner
    ownerName
    title
    members {
      userId  
      isConfirmed
      isIgnored
    
  }
    
  }
}
`;


const ITEM_CHANGED_SUBS = gql`
subscription itemChangedSubs{
  itemChangedSubs{
    title
    id
   owner
   ownerName
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