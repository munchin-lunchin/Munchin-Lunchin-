import React, { Component } from 'react';
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
// import HeaderComponent from './../components/HeaderComponent';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { isAuthenticated } from "./../services/authenticate";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route
          path="/main"
          render={() => (
            // Set authenticated to true for testing purposes. Change to isAuthenticated() for production
            isAuthenticated() ?
              (<MainContainer />) :
              (<Redirect to="/" />)
          )} />
        <Route exact path="/" component={LoginContainer} />
      </div>
    );
  }
}

export default App;

