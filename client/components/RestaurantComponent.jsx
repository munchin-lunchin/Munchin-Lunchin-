import React from 'react';
import styled from 'styled-components';

const Restaurant = styled.div`
  border: none;
  background-color: white;
  width: 300px;
  transition: 0.3s;

  :hover {
    box-shadow: 1px 0px 10px grey;
    transform: scale(1.01);
  }
`

const RestaurantTitle = styled.p`
  background-color: 29335C;
  padding: 10px;
  color: white;
  text-align: center;
  margin: 10px 0px;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px;

`
const DeleteBtn = styled.button`
  padding: 10px;
  border-radius: 3px;
`

const RestaurantComponent = ({ _id, name, rating, display_address, price, review_count, deleteLikeMutation, getLikesQuery, userId }) => {
  return (
  <Restaurant>
    <RestaurantTitle>{name}</RestaurantTitle>
    <Info>
      <p className="history-rating">Rating: {rating} </p>
      <p className="history-review-count">Review Count: {review_count}</p>
      <p className="history-price">Price: {price} </p>
      <p className="history-address">Address: {display_address} </p>
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
    </Info>
  </Restaurant>
 )
}

export default RestaurantComponent;
