import React, { Component } from 'react';
import SearchComponent from '../components/SearchComponent';
import HistoryContainer from 'HistoryContainer'


function MainContainer () {
  return (
    <div>
      <SearchComponent />
      <HistoryContainer />
    </div>
  )
}

export default MainContainer;