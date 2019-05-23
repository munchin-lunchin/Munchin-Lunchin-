import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import RestaurantComponent from '../components/RestaurantComponent'
import React from 'react';
import { joesFrontEndCookieParser } from './../services/authenticate';

//Graphql query for restaurants our user has liked previously.
const myCookies = joesFrontEndCookieParser(document.cookie);
const myUserId = myCookies.userId;
const getLikesQuery = gql`
{
  user(_id: ${myUserId}) {
    username
    restaurants {
      name
      display_address
      price
      rating
      review_count
      image_url
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

const HistoryContainer = (props) => {
  const getLikes = props.getLikesQuery;
  const deleteLikeMutation = props.deleteLikeMutation;

  //no idea why this function errors out in line 47 but we added a refresh button in 48 to resolve
  const restaurantMapping = () => {
    if (getLikes.loading) {
      return <div>Loading</div>
    } else if (getLikes.error) {
      return <button onClick={() => location.reload()}>See History!</button>
    } else {
      console.log(' delete ', deleteLikeMutation)
      console.log(' rest liked ', getLikes.user.restaurants)
      return getLikes.user.restaurants.map((rest) => (
        <RestaurantComponent
          {...rest}
          deleteLikeMutation={deleteLikeMutation}
          getLikesQuery={getLikesQuery}
          userId={myUserId}
          key={rest._id}
        />
      ));
    }
  }

  return (
    <div>
      <h2>Restaurants You've Liked!</h2>
      {restaurantMapping()}
    </div>
  )
};


//binds our query to the current container by adding the output to props.  The name property we assign determines the key in props  
//It's like redux when you use connect on map state to props and map dispatch to props
export default compose(
  graphql(getLikesQuery, { name: "getLikesQuery" }),
  graphql(deleteLikeMutation, { name: "deleteLikeMutation" }))
  (HistoryContainer);
