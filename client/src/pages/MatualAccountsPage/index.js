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
import {SET_BG_SINGLE_ACCOUNT} from '../../Redux/actionTypes'
import UpdateMatualAccountModal from '../../matualAccounts/components/UpdateMatualAccountModal'
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
});



function ButtonBases(props) {
  const { classes } = props;
   
  
  console.log("myMatual page");
  
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.userDetails)


   const {data} = useQuery(GET_USER_MATUAL_ACCOUNTS);
  
  
  
  
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
      

       <ButtonBase
          focusRipple
          key={account.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          component={Link}
          to={`/matualAccounts/${account.id}`}
          onClick={() => dispatch({type:SET_BG_SINGLE_ACCOUNT,payload:images[data.getUserMatualAccounts.length-index-1].img})}
         >
         
         <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(https://creditkarma-cms-ca.imgix.net/wp-content/uploads/sites/2/2020/08/50-30-20-rule932275488.jpg?w=1024&auto=compress)`,
            }}
          />
          <span className={classes.imageBackdrop} />
          
        <GridListTileBar
              title={account.title}
              subtitle={<span>created by: {user && account.ownerName === user.username ? 'You' : account.ownerName}</span>}
            />
        
        </ButtonBase>
        
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
    members {
      userId  
      isConfirmed
      isIgnored
    
  }
}
}
`;
