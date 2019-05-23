import React from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { joesFrontEndCookieParser } from '../services/authenticate';
import { exGetLikes } from './../containers/HistoryContainer';


const myCookies = joesFrontEndCookieParser(document.cookie);
const myUserId = myCookies.userId;

const AddRestaurantMutation = gql`
  mutation ($rating: Float!, $review_count: Int!, $yelp_id: String!, $name: String!, $display_address: String!, $image_url: String!, $url: String!, $price: String!, $latitude: Float!, $longitude: Float!, $user_id: Int!){
    addRestaurant(
        rating: $rating,
        review_count: $review_count,
        yelp_id: $yelp_id,
        name: $name,
        display_address: $display_address,
        image_url: $image_url
        url: $url,
        price: $price,
        latitude: $latitude,
        longitude: $longitude
        user_id: $user_id
      ) {
      rating
      review_count
      yelp_id
      name
      display_address
      image_url
      url
      price
      latitude
      longitude
    }
  }
`



const RestaurantSearchResultComponent = (props) => {

  props.data.user_id = parseInt(myUserId);
  return (
    <div className="searchResult">
      <h4>{props.data.name}</h4>
      <h6>Address: {props.data.display_address}</h6>
      <h6>Price: {props.data.price}</h6>
      <h6>Rating: {props.data.rating}</h6>
      <h6>Review count: {props.data.review_count}</h6>
      <button onClick={() => {
        props.AddRestaurantMutation({
          variables: props.data,
          // refetch: [{ query: getLikesQuery }]
        }, location.reload());
      }}>
      Like
      </button>
    </div>);
}

export default compose(
  graphql(AddRestaurantMutation, { name: 'AddRestaurantMutation' })
)(RestaurantSearchResultComponent);