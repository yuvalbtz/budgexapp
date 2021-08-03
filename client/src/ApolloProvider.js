import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import {Provider} from 'react-redux'
import {store} from './Redux/Store'
import {Router} from 'react-router-dom';
import history from './util/history'
import {WebSocketLink} from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';
import {split} from '@apollo/client'
import { HttpLink } from '@apollo/client'
import { ThemeProvider } from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core'



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#17395C',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#DC143C',
      dark: '#ba000d',
      contrastText: '#fff',
    },

    appColor:{
      main:'#242333'
    }
    
  },
});



console.log( process.env.REACT_APP_WSS_SERVER_URL);
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL,
  credentials:'include',
});


const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WSS_SERVER_URL, //wss in production
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
   
    link: splitLink,
    cache: new InMemoryCache(),
  });




export default (
  <ApolloProvider client={client}>
    <Provider store={store}>
    <Router history={history}>
    <ThemeProvider theme={theme}>
     <App />
    </ThemeProvider>
    </Router>
   </Provider>
  </ApolloProvider>
);
