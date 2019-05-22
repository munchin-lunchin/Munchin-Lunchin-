import React from 'react';

function RestaurantComponent ({ _id, name, rating, display_address, price, review_count, deleteLikeMutation, getLikesQuery, userId }) {
 return (
  <div className='history'>
    <strong>Name: </strong>{name}
    <br/>
    <strong>Rating: </strong>{rating}
    <br/>
    <strong>Review Count: </strong>{review_count}
    <br/>
    <strong>Price: </strong>{price}
    <br/>
    <strong>Address: </strong>{display_address}
    <button onClick={() => {
      console.log('Getlikesquery is', getLikesQuery);
      deleteLikeMutation({
        variables: {
          user_id: parseInt(userId),
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