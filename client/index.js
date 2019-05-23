import React from 'react';
import { render } from 'react-dom';
import App from './containers/App.jsx';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

//Setting up apollo client  - connection to graphql endpoint on server
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

render(
  <BrowserRouter>
    {/* Apollo wrapper injects data from the server into the application */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
