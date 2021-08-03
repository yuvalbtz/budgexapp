import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useQuery} from '@apollo/react-hooks';
import MyAccountModal from '../../myAccounts/components/ModalMyAccounts';
import UpdateAccountModal from '../../myAccounts/components/UpdateMyAccountModal'
import gql from 'graphql-tag'
import MenuOptionsBar from '../../myAccounts/components/MoreOptionsButton'
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Container, IconButton} from '@material-ui/core';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded'

const styles = theme => ({
  root: {
    
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
        border: '2px solid currentColor',
        backgroundColor:'rgba(0,0,0,0.2)'
      },

      '& $button': {
        color:'black',
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
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(2)}px`,
    fontFamily:'Varela Round',
    fontSize:18,
    
    
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

const NoAccountsDisplay = () => (
  <Typography style={{margin:'20% auto'}} color='primary' variant='h5' component='h5'>
  ...אין לך חשבונות עדיין
  </Typography> 
 )

function ButtonBases(props) {
  const { classes } = props;
   const input = useRef()
  
 
  const {data} = useQuery(GET_USER_ACCOUNTS);
  
  console.log("myAccounts page");
  

  
  
  return (
    
      <Container disableGutters maxWidth={false} className={classes.root}>
      <Grid  
      container
      direction="row"
      spacing={0}
      ref={input} 
      >
      
      
      {data && data.getUserAccounts.length === 0 && (<NoAccountsDisplay/>)}
      
       {data &&  data.getUserAccounts.map((account, index) => (
      
      <Grid  key={account.id} item xs={12} sm={4} >
        
        <div className={classes.button}>
       <MenuOptionsBar accountId={account.id} accountDetails={account}/>
        </div>
        
       <div style={{display:'flex', position:'relative',zIndex:13}}>
        <IconButton style={{position:'absolute', right:4,top:1, color:'white'}}>
        <ListAltRoundedIcon />
        <Typography variant='h6' component='h6' style={{marginLeft:5,fontFamily:'Varela Round',}}>
          {account.list.length}
        </Typography>
        </IconButton>
        </div>
        
        <ButtonBase
          focusRipple
          key={account.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          component={Link}
          to={`/myAccounts/${account.id}`}
          >
        
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(https://www.moneycrashers.com/wp-content/uploads/2011/02/woman-making-budget.jpg)`,
            }}
          />
       
        
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
         
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {account.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
         
         
        </ButtonBase>
        
        <div style={{display:'flex', position:'relative',zIndex:13}}>
        <Typography 
        variant='caption' 
        component='h6' 
        style={{
          position:'absolute', 
          right:4,bottom:2, 
          color:'white',
          marginLeft:5,
          fontFamily:'Varela Round',}}>
          {new Date(Number(account.createdAt)).toDateString()}
        </Typography>
      
        </div>
        </Grid>
        
    ))}
  
  </Grid>
  
  

<MyAccountModal/>

<UpdateAccountModal/>
  

</Container>
  
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);

const GET_USER_ACCOUNTS = gql`
 {
  getUserAccounts{
    id
    createdAt
    updatedAt
    owner
    title
    list{
      id
    }
    }
}
`;