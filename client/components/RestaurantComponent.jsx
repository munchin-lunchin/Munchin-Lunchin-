import React from 'react';


function RestaurantComponent ({ _id, name, rating, displayAddress, price, reviewCount, deleteLikeMutation, getLikesQuery }) {
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
    <button onClick={() => {
      console.log('Getlikesquery is', getLikesQuery);
      deleteLikeMutation({
        variables: {
          user_id: 1,
          rest_id: parseInt(_id)
        },
        refetchQueries: [{ query: getLikesQuery }]
      });
    }
    }>Delete</button>
  </div>
 )
}

export default RestaurantComponent; 