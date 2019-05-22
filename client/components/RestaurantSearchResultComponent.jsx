import React from 'react';

const RestaurantSearchResultComponent = ({ data, addRestaurantMutation}) => {
  console.log(' props are ', data);
  return (
    <div className="searchResult">
      <h4>{data.name}</h4>
      {/* <h6>{props.data.location.display_address[0]}<br />
        {props.data.location.display_address[1]}</h6> */}
      <button onClick={() => {
        addRestaurantMutation({
          variables: data
        })
      }}> Like </button>
    </div>);
}

export default RestaurantSearchResultComponent;
