import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';

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
  }

  const searchResultComponents = [];
  console.log(restaurantList)
  for (const restaurant of restaurantList) {
    searchResultComponents.push(<RestaurantSearchResultComponent key={restaurant.id} data={restaurant} />)
  }

  return (<div>
    <h1> THIS IS A SEARCH CONTAINER YO</h1>
    Restaurant Name: <input id="whereYouAteYoFoodsInput"></input>
    Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput"></input>
    <button id="yelpSearchButton" onClick={queryYelpAPI}> Search for restaurants </button>
    {searchResultComponents}
  </div>)
};

export default SearchContainer;