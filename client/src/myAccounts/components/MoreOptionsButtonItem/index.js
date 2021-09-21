import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import IconButton from '@material-ui/core/IconButton';
import DeleteMenuItem from '../MoreOptionsButtonItem/DeleteOptionItem';
import UpdateMenuItem from '../MoreOptionsButtonItem/UpdateOptionItem'
import RemoveImageItem from '../MoreOptionsButtonItem/RemoveImageOptionItem'
import { useParams } from 'react-router-dom';
import history from '../../../util/history';

const useStyles = makeStyles((theme) => ({
    root: {
     zIndex:1
    
    },
    paper: {
    
    
    },

    OptionBar:{
        
    
        
      },
     

     
  }));



function Index({accountId, itemId, item}) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const params = useParams()
  const handleToggle = () => {
    /* if(params.itemId){
      history.replace(`/myAccounts/${accountId}`)
    } */
   
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
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
       <div >
        <IconButton 
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          size="small"
          className={classes.OptionBar}>
          <MoreVertRoundedIcon  />
          </IconButton>
          </div>
         
        <Popper  open={open} anchorEl={anchorRef.current} role={undefined} placement="left-start" transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.paper}>
                 <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <RemoveImageItem accountId={accountId} itemId={itemId} image={item.media} setOpen={setOpen}/> 
                    <UpdateMenuItem accountId={accountId} itemId={itemId} item={item}  />
                    <DeleteMenuItem accountId={accountId} itemId={itemId} setOpen={setOpen}/>
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
