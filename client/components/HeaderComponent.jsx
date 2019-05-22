import React from 'react';
import { Link } from "react-router-dom";

const HeaderComponent = () => (
  <div id="headerComp">
    <h1>Feasting With Friends</h1>
    <Link to="/main">
      <button>Homepage!</button>
    </Link>
    <Link to="/">
      <button>Login!</button>
    </Link>
    <Link to="/signup">
      <button>Signup!</button>
    </Link>
  </div>
)

export default HeaderComponent;
