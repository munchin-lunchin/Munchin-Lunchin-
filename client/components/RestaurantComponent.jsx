import React from 'react';


function RestaurantComponent ({ _id, name, rating, displayAddress, price, reviewCount, deleteLikeMutation }) {
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
    <button onClick={() => deleteLikeMutation(1, _id)}>Delete</button>
  </div>
 )
}

export default RestaurantComponent; 