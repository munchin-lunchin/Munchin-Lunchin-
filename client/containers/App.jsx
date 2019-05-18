import React, { Component } from 'react';
import LoginContainer from './LoginContainer'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        Hello World!
        <LoginContainer />
      </div>
    );
  }

}

export default App;