import React, { Component } from 'react';
import LoginContainer from './LoginContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainContainer from './MainContainer'


class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <div>
          <Route path="/" exact component={LoginContainer} />
          <Route path="/main" component={MainContainer} />
        </div>
      </Router>
    );
  }

}

export default App;