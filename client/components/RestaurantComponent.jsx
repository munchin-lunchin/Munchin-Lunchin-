import React from 'react';


function RestaurantComponent ({ name, rating, displayAddress, price, reviewCount }) {
 return (
  <div>

    <strong>Name: </strong>{name}
    <br/>
    <strong>Rating: </strong>{rating}
    <br/>
    <strong>Review Count: </strong>{reviewCount}
    <br/>
    <strong>Price: </strong>{price}
    <br/>
    <strong>Address: </strong>{displayAddress}
  </div>
 )
}

export default RestaurantComponent; 