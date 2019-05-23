import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';
import { gql } from 'apollo-boost';
import { graphql, compose, ApolloConsumer } from 'react-apollo';


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

const SearchContainer = () => {

  const [restaurantList, setRestaurantList] = useState([]);
  const [ zipcode, setZipCode ] = useState('');
  const [ restName, setRestName] = useState('');

  const searchResultComponents = [];
  for (const restaurant of restaurantList) {
    console.log('rest is ', restaurant)
    searchResultComponents.push(<RestaurantSearchResultComponent key={restaurant.id} data={restaurant} />)
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
                setRestaurantList(data.yelp);
                console.log('data is ', data.yelp);
              }}> Search for restaurants </button>
            <div id="searchContainer">
              {searchResultComponents}
            </div>
          </div>
        )}
    </ApolloConsumer>
  )
};

export default SearchContainer;