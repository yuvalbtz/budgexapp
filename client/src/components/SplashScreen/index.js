import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Splash} from './SpalshElements'
import './style.css'
const useStyles = makeStyles((theme) => ({
  root: {
    height:'100vh',
    width: '100%',
  },

  
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
  <div className='background'>
   <div className="logo">
     BudgeX
   </div>
   <div className="loader">
  <div className="wrapper">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    
    
  </div>
</div>
 </div>
  );
}

