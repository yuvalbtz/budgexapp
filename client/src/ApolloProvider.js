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


const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});




const client = new ApolloClient({
  link: createUploadLink({
    uri: '/graphql',
    credentials:'include',
    
}),
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
