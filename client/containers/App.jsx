import React, { Component } from 'react';
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
import HeaderComponent from './../components/HeaderComponent';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import isAuthenticated from "./../services/authenticate";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
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
    );
  }
}

export default App;
