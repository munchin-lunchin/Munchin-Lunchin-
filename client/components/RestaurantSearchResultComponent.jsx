import React from 'react';

const RestaurantSearchResultComponent = (props) => {

  return (<div>
    <h5>Dis a restaurant</h5>
    <h6>{props.data.name}</h6>
    <h6>{JSON.stringify(props.data.location)}</h6>
    <button onClick={props.likeRestaurant}> This is the restaurant I liked! </button>
  </div>);
}

export default RestaurantSearchResultComponent;
