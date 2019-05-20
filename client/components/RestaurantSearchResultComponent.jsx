import React from 'react';

const RestaurantSearchResultComponent = (props) => (
  <div>
    <h5>Dis a restaurant</h5>
    <h6>{props.data.name}</h6>
    <h6>{JSON.stringify(props.data.location)}</h6>
  </div>
)

export default RestaurantSearchResultComponent;
