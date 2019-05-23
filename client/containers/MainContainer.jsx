import React from 'react';
import SearchContainer from './SearchContainer';
import HistoryContainer from './HistoryContainer';
import HeaderComponent from '../components/HeaderComponent';


const MainContainer = () => (
  <div id="MainContainer" >
    <HeaderComponent />
    <SearchContainer />
    <HistoryContainer />
  </div >
);

export default MainContainer;
