import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';
import { gql } from 'apollo-boost';
import Hit from '../components/HitComponent';
import algoliasearch from 'algoliasearch';
import {
  graphql,
  compose,
  ApolloConsumer
} from 'react-apollo';
import {
  InstantSearch,
  Hits,
  SearchBox,
} from 'react-instantsearch-dom';

const client = algoliasearch('54V98YN658', 'd4fd1c2bd8718edd438f6fc30b0e8c30');
const searchClient = algoliasearch('54V98YN658', '488d342c46cad2e1015749231a63eaf3');
const index = client.initIndex('yelp')

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

const SearchContainer = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [zipcode, setZipCode] = useState('');
  const [restName, setRestName] = useState('');

  const searchResultComponents = [];
  for (const restaurant of restaurantList) {
    searchResultComponents.push(
      <RestaurantSearchResultComponent
        key={restaurant.id}
        data={restaurant}
        addRestaurantMutation={AddRestaurantMutation}
      />
    )
  };

  return (
    <ApolloConsumer>
      {client => (
        <div>
          <h1> Search</h1>
          Restaurant Name: <input id="whereYouAteYoFoodsInput" onChange={(e) => setRestName(e.target.value)}></input>
          Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput" onChange={(e) => setZipCode(e.target.value)}></input>

          <button
            id="yelpSearchButton"
            onClick={async () => {
              const { data } = await client.query({
                query: query1,
                variables: { name: restName, zipcode: parseInt(zipcode) }
              });
              setRestaurantList(data.yelp);
              index.addObjects(data.yelp, (err) => {
                if (err) return console.error(err)
              })
            }}>
            Search for restaurants
          </button>

          <div id="searchContainer">
            {searchResultComponents}
          </div>

          <hr />

          <div>
            <h2>recently viewed</h2>
            <InstantSearch indexName="yelp" searchClient={searchClient}>
              <div>
                <SearchBox />
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
          </div>

        </div>
      )}
    </ApolloConsumer>
  )
};

export default SearchContainer;