import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import IconButton from '@material-ui/core/IconButton';
import DeleteMenuItem from './DeleteOptionAccount';
import UpdateMenuItem from './UpdateOptionAccount'
import {useDispatch, useSelector} from 'react-redux';
import history from '../../../util/history';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import RemoveParticaipantItem from './RemoveParticipant'
import { SET_UpdateAccount_Modal_Open } from '../../../Redux/actionTypes';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      zIndex:13
    },
    
    OptionBar:{
        position:'absolute',
        zIndex:13,
        top:8,
        left:2, 
        color:'white',
        
      },
      Delete:{
          color:'#d50000',
          fontFamily:'Varela Round',
          fontWeight:'bold'
      },
      

     
  }));



function Index({accountId, accountDetails, IsUserOwner}) {
   const dispatch = useDispatch()

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const params = useParams()
  
    

  
   


  const handleToggle = () => {
    if(params.accountId){
       history.goBack()
    }
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }; 

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
    
    
     return (
        
        <div className={classes.root}>
      
      <div style={{position:'relative'}}>
        <IconButton 
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
            className={classes.OptionBar}>
          <MoreVertRoundedIcon  />
          </IconButton>
          </div>
         
        <Popper  open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.paper}>
                 <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {IsUserOwner ? (<div><UpdateMenuItem accountId={accountId} accountDetails={accountDetails} />
                    <DeleteMenuItem accountId={accountId} setOpen={setOpen}/></div>) : (<RemoveParticaipantItem accountId={accountId} setOpen={setOpen}/>) }
                    
                    
                  </MenuList>
                  </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      
    </div>
        
    
    )
}

export default Index


