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
import CloseIcon from '@material-ui/icons/Close';
import MenuButton from '../../myAccounts/components/MenuButton'
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
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
    
    searchFabs:{
      position: 'fixed',
      bottom: theme.spacing(10),
      right: theme.spacing(2),
      zIndex:12
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
    const [searchUrl, setUrlSearch] = React.useState(false)
    
    console.log("split",window.location.pathname.split('/')[1]);
    if(window.location.pathname.split('/')[1] === 'matualAccounts'){
        value = 0
      }else if(window.location.pathname.split('/')[1] === 'profile'){
         value = 2 
      }else if(window.location.pathname.split('/')[1] === 'myAccounts'){
         value = 1
      }else{
        return value
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

  

    const searchFabs = [
      {
        icon: window.location.pathname === '/matualAccounts/search' ? <CloseIcon
        onClick={() => history.goBack()}
        /> : <IconButton 
        style={{color:'white'}} 
        component={Link} 
        to={`/matualAccounts/search`}>
          <SearchIcon/>
          </IconButton>,
        color:'primary',
        style:classes.searchFabs
      },
      {
        icon: window.location.pathname === '/myAccounts/search' ? <CloseIcon
        onClick={() => history.goBack()}
        
        /> : <IconButton 
        style={{color:'white'}} 
        component={Link} 
        to={`/myAccounts/search`}>
          <SearchIcon/>
          </IconButton>,
        color:'secondary',
        style:classes.searchFabs
      }
    ]
   
    
    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: window.location.pathname === '/matualAccounts/addAccount' ? <CloseIcon
        onClick={() => history.goBack()} 
        className={classes.iconFullPadding}/> : <IconButton style={{color:'white'}} component={Link} to={`/matualAccounts/addAccount`}>
          <AddIcon 
          className={classes.iconFullPadding}/>
        </IconButton>,
        cssColor:'#3c57f2',
       
      },  
      {
        color: 'secondary',
        className: classes.fab,
        icon: window.location.pathname === '/myAccounts/addAccount' ? <CloseIcon
        
        onClick={() => history.goBack()}
        className={classes.iconFullPadding}/> :<IconButton  style={{color:'white'}} component={Link} to={'/myAccounts/addAccount'} >
          <AddIcon 
          className={classes.iconFullPadding}
          
        />
        </IconButton> ,
        cssColor:'#ff0054',
        
        
      },
      {
        color: 'inherit',
        className: classes.fab,
        icon: window.location.pathname === '/profile/edit' ? <CloseIcon
        onClick={() => history.goBack()}
        className={classes.iconFullPadding}/> : <IconButton  component={Link} to={`/profile/edit`}>
          <EditIcon className={classes.iconFullPadding} />
        </IconButton>,
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
        
      
      
        
       
          {searchFabs.map((fab, index) => (
            <div key={index}>
                <Zoom
            key={index}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
             <Fab disableFocusRipple color={fab.color} className={fab.style} >
              {fab.icon} 
            </Fab>
          </Zoom>
            </div>
          ))}
      





       {/*  <MenuButton FabColor={fabs[value].color} /> */}
       
         {/* <SearchButton/> */}
        

        
        
        
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
