import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height:'100vh',
    width: '100%',
    background:'url("https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_1280.jpg") no-repeat center center fixed',
    backgroundSize:'cover',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  
  

},

  
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <>
    <div className={classes.root}>
      <LinearProgress />
      </div>
   
    </>
  );
}

