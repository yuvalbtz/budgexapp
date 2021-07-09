import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { AuthProvider} from './context/auth';
import {Provider} from 'react-redux'
import {store} from './Redux/Store'
import {Router} from 'react-router-dom';
import history from './util/history'
import {createUploadLink} from 'apollo-upload-client'
import {WebSocketLink} from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';
import {split} from '@apollo/client'
import { HttpLink } from '@apollo/client'
/* const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
}); */

const httpLink = new HttpLink({
  uri: 'http://salty-ridge-45014.herokuapp.com/graphql',
  credentials:'include',
});


const wsLink = new WebSocketLink({
  uri: 'ws://salty-ridge-45014.herokuapp.com/graphql',
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
    <AuthProvider>
    <Router history={history}>
     <App />
    </Router>
   </AuthProvider>
   </Provider>
  </ApolloProvider>
);
