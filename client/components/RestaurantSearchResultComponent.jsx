import React from 'react';

const RestaurantSearchResultComponent = ({ data, addRestaurantMutation}) => {
  return (
    <div className="searchResult">
      <h4>{data.name}</h4>
      <h6>Address: {data.display_address}</h6>
      <h6>Price: {data.price}</h6>
      <h6>Rating: {data.rating}</h6>
      <h6>Review count: {data.review_count}</h6>
      <button onClick={() => {
        addRestaurantMutation({
          variables: data
        })
      }}>
      Like
      </button>
    </div>);
}

export default RestaurantSearchResultComponent;
