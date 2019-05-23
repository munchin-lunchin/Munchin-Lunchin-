import React from 'react'
import HeaderComponent from './HeaderComponent';
import styled from 'styled-components';

const StyledHeader = styled(HeaderComponent)`
    display: flex;
    background: linear-gradient(to bottom left, lightblue, green);
    justify-content: space-around;
`;



export default StyledHeader;
