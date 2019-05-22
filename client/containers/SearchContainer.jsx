import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';
import { gql } from 'apollo-boost';
import { graphql, compose, Query } from 'react-apollo';

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

let name;
let zipcodeRest;

const SearchRestaurantsQuery = gql`
    {
      yelp( 
        name: ${name},
        zipcode: ${zipcodeRest}
      ){
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

  // <Query query={SearchRestaurantsQuery} >
  // { ({loading, error, data}) => {
  //     if(loading) return console.log("loading...")
  //     if(error) return console.log("error...")

  //THIS IS COMMENTED OUT. THIS PREVIOUSLY MADE A CALL TO GET THE YELP RESULTS
  // const queryYelpAPI = () => {
  //   const data = {
  //     name: document.querySelector('#whereYouAteYoFoodsInput').value,
  //     zip: document.querySelector('#zipcodeOfWhereYouEatYoFoodsInput').value
  //   }

  //   fetch(`http://localhost:3000/yelp/restaurantName/${data.name}/restaurantZip/${data.zip}`,
  //     { method: 'GET' })
  //     .then(resp => {
  //       console.log('resp', resp);
  //       return resp.json()
  //     }
  //     ).then(res2 => {
  //       setRestaurantList(res2);
  //     });
  // };

  // function likeRestaurant(data) {
  //   console.log('yo data here:', data);
  //   fetch('http://localhost:3000/likes', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  //   }).then(resp => {
  //     console.log('We have received a response from the server about liking a restaurant:');
  //     console.log(resp);
  //     if (resp.status === 200) setRestaurantList([]);
  //     else console.log('There was an error!');
  //   }).then(() => location.reload())
  //     .catch(err => console.error(err));
  // };

  const searchResultComponents = [];
  for (const restaurant of restaurantList) {
    searchResultComponents.push(<RestaurantSearchResultComponent key={restaurant.id} data={restaurant} addRestaurantMutation={AddRestaurantMutation} />)
  };

  // console.log(' rest name ', zipcode)
  // console.log(' zip code ', restName)

  return (
    <div>
      <h1> Search</h1>
      Restaurant Name: <input id="whereYouAteYoFoodsInput" onChange={(e) => setRestName(e.target.value)}></input>
      Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput" onChange={(e) => setZipCode(e.target.value)}></input>
      <button id="yelpSearchButton" onClick={() => {
        name = restName;
        zipcodeRest = zipcode;
        graphql(SearchRestaurantsQuery, { name: 'SearchRestaurantsQuery' });
        if(SearchRestaurantsQuery.loading) {
          console.log('loading')
        } else console.log(' RESULT IS ', SearchRestaurantsQuery.yelp);
      }}> Search for restaurants </button>
      <div id="searchContainer">
        {searchResultComponents}
      </div>

    </div>
  );
    // }}
    // </Query>
};

export default compose(
  graphql(AddRestaurantMutation, { name: 'AddRestaurantMutation' })
)(SearchContainer);