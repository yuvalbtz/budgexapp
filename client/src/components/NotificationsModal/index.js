import React from 'react'
import {LinkStyle} from '../Navbar/NavbarElements'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import history from '../../util/history'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
    flex: 1,
    },
    Fab:{
      position:'fixed',
      right:theme.spacing(2),
      bottom:theme.spacing(1),
      zIndex:3,
    
    },
  
    stasWrapper:{
      height:'100%', 
      width:'100%', 
      [theme.breakpoints.up('md')]:{
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center'
      }
    }
  }));





function Index() {
   
   const classes = useStyles()
   
   const handleClose = () => {
    history.goBack()
  };

  const open = window.location.pathname === `/notifications`

    return (
        <div>
          <LinkStyle to='/notifications'>
            התראות  
          </LinkStyle>  
        
          <Dialog dir='rtl' style={{textAlign:'center'}} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar color='inherit' className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              התראות
            </Typography>
          </Toolbar>  
        </AppBar>
        
        
        
        
        
        
        </Dialog>
        
        </div>
    )
}

export default Index
