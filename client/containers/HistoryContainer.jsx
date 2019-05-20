import { gql } from 'apollo-boost'
import { graphql, Query, compose } from 'react-apollo'
import RestaurantComponent from '../components/RestaurantComponent'
import React, { useState, useEffect } from 'react';


//Graphql query for restaurants our user has liked previously.
const getLikesQuery = gql`
{
  user(_id: 1) {
    username
    restaurants {
      name
      displayAddress
      price
      rating
      reviewCount
      imageURL
      _id
    }
  }
}
`;

const deleteLikeMutation = gql`
  mutation ($user_id: Int!, $rest_id: Int!) {
    deleteLike(user_id: $user_id, rest_id: $rest_id) {
      user_id
      rest_id
    }
  }
`;

const HistoryContainer = ({ getLikesQuery, deleteLikeMutation }) => {
  // const [restaurantHistory, setRestaurantHistory] = useState([]);

  //no idea why this function runs a second time once data has loaded and why use effect is not needed
  const restaurantMapping = () => {
    if (getLikesQuery.loading) {
      return <div>Loading</div> 
    } else {
      console.log(getLikesQuery);
      return getLikesQuery.user.restaurants.map((rest) => (
        <RestaurantComponent {...rest} deleteLikeMutation={deleteLikeMutation} key={rest._id}/>
        ))
    }
  }

  return (
      <div>
        <h2> a history container is here! </h2>
        {restaurantMapping()}
      </div> 
  )
};


//binds our query to the current container by adding the output to props.  The name property we assign determines the key in props  
//It's like redux when you use connect on map state to props and map dispatch to props
export default compose(
  graphql(getLikesQuery, { name:"getLikesQuery" }),
  graphql(deleteLikeMutation, { name: "deleteLikeMutation" }))
  (HistoryContainer);
