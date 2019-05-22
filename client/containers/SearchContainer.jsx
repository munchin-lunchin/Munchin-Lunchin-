import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';
import { gql } from 'apollo-boost';
import { graphql, compose, Query, ApolloConsumer } from 'react-apollo';

let nameOfRest;
let zipcodeOfRest;

const SearchRestaurantsQuery = gql`
  query yelp( 
        $name: String!,
        $zipcode: Int!
      ){
        yelp (name: $name, zipcode: $zipcode) {
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
  }`;

  const query1 = SearchRestaurantsQuery;

const AddRestaurantMutation = gql`
  mutation {
    addRestaurant(
        rating: $rating,
        review_count: $review_count,
        yelp_id: $yelp_id,
        name: $name,
        display_address: $display_address,
        image_url: $image_url,
        url: $url,
        price: $price,
        latitude: $latitude,
        longitude: $longitude
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

const SearchContainer = (props) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [ zipcode, setZipCode ] = useState('');
  const [ restName, setRestName] = useState('');


  const searchResultComponents = [];
  for (const restaurant of restaurantList) {
    searchResultComponents.push(<RestaurantSearchResultComponent key={restaurant.id} data={restaurant} addRestaurantMutation={AddRestaurantMutation} />)
  };

  return (
    <ApolloConsumer>
        {client => (
          <div>
            <h1> Search</h1>
            Restaurant Name: <input id="whereYouAteYoFoodsInput" onChange={(e) => setRestName(e.target.value)}></input>
            Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput" onChange={(e) => setZipCode(e.target.value)}></input>
            <button id="yelpSearchButton" onClick={ async () => {
                const { data } = await client.query({
                  query: query1,
                  variables: { name: restName, zipcode: parseInt(zipcode) }
                });
                console.log('Click');
                console.log(data);
              }}> Search for restaurants </button>
            <div id="searchContainer">
              {searchResultComponents}
            </div>
          </div>
        )}
    </ApolloConsumer>
  )
};

export default compose(
  graphql(AddRestaurantMutation, { name: 'AddRestaurantMutation' }),
  graphql(SearchRestaurantsQuery, { name: 'SearchRestaurantsQuery' })
)(SearchContainer);