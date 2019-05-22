import React from 'react';

const RestaurantComponent = ({ _id, name, rating, display_address, price, review_count, deleteLikeMutation, getLikesQuery, userId }) => {
 return (
  <div className='history'>
    <p className="history-name">Name: </p>{name}
    <p className="history-rating">Rating: </p>{rating}
    <p className="history-review-count">Review Count: </p>{review_count}
    <p className="history-price">Price: </p>{price}
    <p className="history-address">Address: </p>{display_address}
    <button
      onClick={() => {
        deleteLikeMutation({ variables: {
            user_id: parseInt(userId),
            rest_id: parseInt(_id)
          }, refetchQueries: [{ query: getLikesQuery }]
        });
      }}>
      Delete
    </button>
  </div>
 )
}

export default RestaurantComponent;
