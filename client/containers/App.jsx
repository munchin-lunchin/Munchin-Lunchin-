import React, { Component } from 'react';
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
import HeaderComponent from './../components/HeaderComponent';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./../services/authenticate";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//Setting up apollo client  - connection to graphql endpoint on server
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})


class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      //Apollo wrapper injects data from the server into the application
      <ApolloProvider client={client}>
        <div>
          {/* For our React Router, this is the 'Hash History' approach from the excellent
              Stack Overflow here: https://stackoverflow.com/questions/27928372/ */}
          <Router >
         
            <Route
              path="/main"
              render={() => (
                isAuthenticated() ?
                  (<MainContainer />) :
                  <HeaderComponent />
                  (<Redirect to="/" />)
                 
              )} />
            
            <Route exact path='/' component={LoginContainer} />
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
