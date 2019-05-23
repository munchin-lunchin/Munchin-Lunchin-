import React from 'react';
import SearchContainer from './SearchContainer';
import HistoryContainer from './HistoryContainer';
import StyledHeader from '../components/StyledHeader';


const MainContainer = () => (
  <div id="MainContainer" >
    <StyledHeader/>
    <SearchContainer />
    <HistoryContainer />
  </div >
);

export default MainContainer;
