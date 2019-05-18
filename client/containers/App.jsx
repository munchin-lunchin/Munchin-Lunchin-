import React, { Component } from 'react';
import LoginContainer from './LoginContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <div>
          <Route path="/" exact component={LoginContainer} />
          {/* <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} /> */}
        </div>
      </Router>
    );
  }

}

export default App;