import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { Link } from "react-router-dom";

const HeaderComponent = () => (
      <div id="headerComp">
        <Link to="/main">
          <Logo>Lunchin'</Logo>
        </Link>
        <Link to="/">
          <button>Go to login ('/') page</button>
        </Link>
      </div>
    )

export default HeaderComponent;
