import React, { Component } from 'react';
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import isAuthenticated from "./../services/authenticate";

// const isAuthenticated = () => {
//   return true;
// }

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h1>Hello World!</h1>
        <Router>
          <Route
            path="/main"
            render={isAuthenticated ?
              <MainContainer /> :
              <Redirect to="/" />
            } />
          <Route exact path='/' component={LoginContainer} />

        </Router>
      </div> ,
      document.getElementById('root')
    );
  }
}


export default App;
