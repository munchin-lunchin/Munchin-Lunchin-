import React from 'react';

const RestaurantSearchResultComponent = (props) => {

  return (
    <div className="searchResult">
      <h4>{props.data.name}</h4>
      <h6>{props.data.location.formatted_address}</h6 >
      <button onClick={() => { props.likeRestaurant(props) }}> Like </button>
    </div>);
}

export default RestaurantSearchResultComponent;
