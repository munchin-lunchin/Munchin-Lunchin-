import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { Link } from "react-router-dom";

const HeaderComponent = () => (
      <div id="headerComp">
        <h1>Munchin' Lunchin'</h1>
        <Link to="/main">
          <button>Go to main page</button>
        </Link>
        <Link to="/">
          <button>Go to login ('/') page</button>
        </Link>
      </div>
    )

export default HeaderComponent;
