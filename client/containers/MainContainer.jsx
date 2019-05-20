<<<<<<< HEAD
import React, { Component } from 'react';

function MainContainer () {
  return (
    <div>
      Main Container
    </div>
  )
}

export default MainContainer;
=======
import React from 'react';
import SearchContainer from './SearchContainer';
import HistoryContainer from './HistoryContainer';

const MainContainer = () => (
  <div>
    <h1>In the main container</h1>
    <SearchContainer />
    <HistoryContainer />
  </div>
);

export default MainContainer;
>>>>>>> dev
