import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse, Typography } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
   

    
 },
     bg:{
       position:'absolute', 
       top:'-20%',
       right:'300px',
      backgroundColor: theme.palette.appColor.main,
       backgroundSize:'cover',
       height: 400,
       width: 400,
       borderRadius:'50%',
      [theme.breakpoints.down('xs')]:{
        display: 'none',
        
      }
      
      
      },
   
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: '#5AFF3D',
  },
  container: {
    textAlign: 'center',
    zIndex:12,
   
  },
  title: {
    color: theme.palette.appColor.main,
    fontSize: '4.5rem',
  },
  goDown: {
    color: theme.palette.appColor.main,
    fontSize: '4rem',
  },
  lineInfo:{
    color: theme.palette.appColor.main,
    fontSize: '2rem',
    fontWeight:'bold',
    padding:'12px 12px'
  }
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
   <>
    <div className={classes.bg}/>
   
   <div className={classes.root} id="header">
    <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
       
        <div className={classes.container}>
          <h1 className={classes.title}>
           BudgeX
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
            <Typography dir='rtl' className={classes.lineInfo} variant='h4' component='h4'>
            אפליקציית ניהול הוצאות הכנסות  באופן פרטי ומשותף בזמן אמת ! 
              </Typography>
          </Scroll>
        </div>
      </Collapse>
    </div>
    </>
  );
}
