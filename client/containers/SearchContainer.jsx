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
  };

  function likeRestaurant () {
    fetch('http://localhost:3000/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props.data)
    }).then(resp => resp.json()
    ).then(res2 => {
      console.log('We have received a response from the server about liking a restaurant:');
      console.log(res2);
      if (res2.status === 200) setRestaurantList([]);
    })
      .catch(err => console.error(err));
  };

  const searchResultComponents = [];
  console.log(restaurantList)
  for (const restaurant of restaurantList) {
    searchResultComponents.push(<RestaurantSearchResultComponent key={restaurant.id} data={restaurant} likeRestaurant={likeRestaurant} />)
  };

  return (
    <div>
      <h1> THIS IS A SEARCH CONTAINER YO</h1>
      Restaurant Name: <input id="whereYouAteYoFoodsInput"></input>
      Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput"></input>
      <button id="yelpSearchButton" onClick={queryYelpAPI}> Search for restaurants </button>
      {searchResultComponents}
    </div>
  );
};

export default SearchContainer;
