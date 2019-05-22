import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

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

  const queryYelpAPI = () => {
    const data = {
      name: document.querySelector('#whereYouAteYoFoodsInput').value,
      zip: document.querySelector('#zipcodeOfWhereYouEatYoFoodsInput').value
    }

    fetch(`http://localhost:3000/yelp/restaurantName/${data.name}/restaurantZip/${data.zip}`,
      { method: 'GET' })
      .then(resp => {
        console.log('resp', resp);
        return resp.json()
      }
      ).then(res2 => {
        setRestaurantList(res2);
      });
  };

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
  console.log(restaurantList)
  for (const restaurant of restaurantList) {
    searchResultComponents.push(<RestaurantSearchResultComponent key={restaurant.id} data={restaurant} addRestaurantMutation={AddRestaurantMutation} />)
  };

  return (
    <div>
      <h1> Search</h1>
      Restaurant Name: <input id="whereYouAteYoFoodsInput"></input>
      Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput"></input>
      <button id="yelpSearchButton" onClick={queryYelpAPI}> Search for restaurants </button>
      <div id="searchContainer">
        {searchResultComponents}
      </div>

    </div>
  );
};

export default compose(
  graphql(AddRestaurantMutation, { name: 'AddRestaurantMutation' })
)(SearchContainer);