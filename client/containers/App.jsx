import React, { Component } from 'react';
<<<<<<< HEAD
import LoginContainer from './LoginContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainContainer from './MainContainer'
=======
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
import HeaderComponent from './../components/HeaderComponent';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import isAuthenticated from "./../services/authenticate";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

//Setting up apollo client  - connection to graphql endpoint on server
const client = new ApolloClient ({
  uri: 'http://localhost:3000/graphql'
})
>>>>>>> dev


class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
<<<<<<< HEAD
      <Router>
        <div>
          <Route path="/" exact component={LoginContainer} />
          <Route path="/main" component={MainContainer} />
        </div>
      </Router>
=======
      //Apollo wrapper injects data from the server into the application
      <ApolloProvider client={client}>
        <div>
          <Router>
            <HeaderComponent />
            <Route
              path="/main"
              render={() => (
                isAuthenticated() ?
                  (<MainContainer />) :
                  (<Redirect to="/" />)
              )} />
            <Route exact path='/' component={LoginContainer} />

          </Router>
        </div>
      </ApolloProvider>
>>>>>>> dev
    );
  }
}

export default App;
