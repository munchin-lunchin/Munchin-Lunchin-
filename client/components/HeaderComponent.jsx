import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { Link } from "react-router-dom";
import Button from './Button';

const StyledHeader = styled('div')`
    display: flex;
    grid-column-start: 1;
    grid-column-end: 3;
    justify-content: space-between;
    align-items: center;
    background: ${props => (!props.disabled
      ? 'linear-gradient(176deg, #d9a7c7 0%, #fffcdc 100%)'
      : '#FFF0F5')}
`;

const HeaderComponent = () => (
      <StyledHeader>
        <Link to="/main">
          <Logo>Lunchin</Logo>
        </Link>
        <Link to="/">
          <Button>Sign Out
          </Button>
        </Link>
      </StyledHeader>
    )

export default HeaderComponent;
