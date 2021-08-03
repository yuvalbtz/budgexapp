import React from 'react'
import Layout from '../../components/Layout'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import Info from './components/Info'

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));
function Index() {
    
    const classes = useStyles();
    
    return (
        <Layout>
        <div className={classes.root}>
         <CssBaseline />
          <Header />
           <Info/>
          </div>
     
        </Layout>
        
    )
}

export default Index




