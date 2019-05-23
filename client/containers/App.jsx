import React, { Component } from 'react';
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
// import HeaderComponent from './../components/HeaderComponent';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// import { isAuthenticated } from "./../services/authenticate";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
          <Route
              path="/main"
              render={() => (
                true ?
                  (<MainContainer />) :
                  (<Redirect to="/" />)
              )} />
          <Route path="/" exact component={LoginContainer} />
      </div>
    );
  }
}

export default App;

