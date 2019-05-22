import React from 'react';

const RestaurantSearchResultComponent = (props) => {

  return (
    <div className="searchResult">
      <h4>{props.data.name}</h4>
      <h6>{props.data.location.display_address[0]}<br />
        {props.data.location.display_address[1]}</h6>
      <button onClick={() => {
        props.addRestaurantMutation({
          variables: props.data
        })
      }}> Like </button>
    </div>);
}

export default RestaurantSearchResultComponent;
