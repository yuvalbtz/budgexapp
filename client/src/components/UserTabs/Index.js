import React,{useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import green from '@material-ui/core/colors/green';
import { Link } from 'react-router-dom';
import history from '../../util/history'
import MyAccounts from '../../pages/MyAccountsPage'
import MatualAccounts from '../../pages/MatualAccountsPage'
import Profile from '../../pages/ProfilePage'
import {useDispatch, useSelector} from 'react-redux'
import {SET_Account_Modal_Open, SET_MatualAccount_Modal_Open, SET_Profile_Modal_Open} from '../../Redux/actionTypes'
import CloseIcon from '@material-ui/icons/Close';
import MenuButton from '../../components/MenuButton'

const styles = theme => ({
    
    TabContainerProfile:{
        overflowY:'scroll',
        display:'flex',
        [theme.breakpoints.down('sm')]:{
            height: 'calc(100vh - 100px)',
        },
        
      
        
        [theme.breakpoints.up('sm')]: {
            height:'calc(100vh - 100px)',
          }, 
    },
    
    TabContainer:{
        overflowY:'scroll',
         
        [theme.breakpoints.down('sm')]:{
            height: 'calc(100vh - 110px)',
        },
        
       [theme.breakpoints.up('sm')]: {
            height:'calc(100vh - 100px)',
          },

        
          
    },
    
    
    
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      
      overflowY:'hidden',
      
    
      
     },
    
    
    
     fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex:12
      
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
   },
  
   iconFullPadding:{
      padding:'15px 15px',
      
  },
  
  appBar:{
     paddingTop:'50px',
     display:'block',
     background:'Snow',
     
    },
     
    Tab:{
      fontFamily:'Varela Round',
      fontWeight:'bold',
      
      
    },
    SwipeableViews:{
      overflowY:'hidden',
      
         
      [theme.breakpoints.down('sm')]:{
        height: 'calc(100vh - 110px)',
    },
    }
  });

function TabContainer(props) {
  const { children, dir, classes } = props;
  
  return (
    <Typography component="div" className={classes} dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
  
};



function FloatingActionButtonZoom(props)  {
    let [value,setValue] = useState(1)
    const dispatch = useDispatch()
    const { classes, theme } = props;
    
    if(window.location.pathname === '/matualAccounts'){
        value = 0
      }else if(window.location.pathname === '/profile'){
         value = 2 
      }else{
         value = 1
      }



function getUrltab(value){
    switch (value) {
        case 0:
          return  history.push('/matualAccounts'); 
         
        case 1:
            return history.push('/myAccounts');
         
        case 2:
            return history.push('/profile');
          
       
        default:
         return value;
          
      }
}
  

  
  const handleChange = (event, value) => {
    setValue(value)
   
   };

  const handleChangeIndex = (index) => {
    getUrltab(index)
   /// setValue(index)
  
  };

  
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const ModalAccountIsOpen = useSelector(state => state.uiReducer.AccountModalIsOpen)
    const ModalMatualAccountIsOpen = useSelector(state => state.uiReducer.MatualAccountIsOpen)
    const ModalProfileIsOpen =  useSelector(state => state.uiReducer.ModalProfileIsOpen)
    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: ModalMatualAccountIsOpen ? <CloseIcon
        onClick={() => dispatch({type:SET_MatualAccount_Modal_Open})} 
        className={classes.iconFullPadding}/> : <AddIcon className={classes.iconFullPadding} 
        onClick={() => dispatch({type:SET_MatualAccount_Modal_Open})} />,
        cssColor:'#3c57f2'
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: ModalAccountIsOpen ? <CloseIcon
        onClick={() => dispatch({type:SET_Account_Modal_Open})}
        className={classes.iconFullPadding}/> : <AddIcon className={classes.iconFullPadding}
        onClick={() => dispatch({type:SET_Account_Modal_Open})} />,
        cssColor:'#ff0054',
        
      },
      {
        color: 'inherit',
        className: classes.fab,
        icon: ModalProfileIsOpen ? <CloseIcon
        onClick={() => dispatch({type:SET_Profile_Modal_Open})}
        className={classes.iconFullPadding}/> : <EditIcon className={classes.iconFullPadding}
        onClick={() => dispatch({type:SET_Profile_Modal_Open})} />,
        cssColor:'white',
      },
    ];

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{style: {background:fabs[value].cssColor}}}
            
          >
            <Tab  className={classes.Tab}  label="חשבונות משותפים" component={Link}  to='/matualAccounts'/>
            <Tab  className={classes.Tab}  label="החשבונות שלי" component={Link}   to='/myAccounts'/>
            <Tab  className={classes.Tab}  label="פרופיל"  component={Link}  to='/profile'/>
          </Tabs>
        </AppBar>
        
       
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.SwipeableViews}
          >
          <TabContainer classes={classes.TabContainer} dir={theme.direction}><MatualAccounts/></TabContainer>
          <TabContainer classes={classes.TabContainer}  dir={theme.direction}><MyAccounts/></TabContainer>
          <TabContainer  classes={classes.TabContainerProfile}  dir={theme.direction} ><Profile/></TabContainer>
        </SwipeableViews>
        
        <MenuButton FabColor={fabs[value].color} />
       
        
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
             
            <Fab disableFocusRipple className={fab.className} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
     
      </div>
    );
  
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);
