import React from 'react';

const queryYelpAPI = () => {
  const data = { name: document.querySelector('#whereYouAteYoFoodsInput').value,
                 zip: document.querySelector('#zipcodeOfWhereYouEatYoFoodsInput').value}
                 
  fetch(`http://localhost:3000/yelp/restaurantName/${data.name}/restaurantZip/${data.zip}`,
          { method: 'GET' })
        .then(resp => {
          console.log('resp', resp);
          return resp.json()
        }
        ).then(res2 => {
          console.log('res2', res2)
        });
}

const SearchContainer = () => (
  <div>
    <h1> THIS IS A SEARCH CONTAINER YO</h1>
    Restaurant Name: <input id="whereYouAteYoFoodsInput"></input>
    Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput"></input>
    <button id="yelpSearchButton" onClick={queryYelpAPI}> Search for restaurants </button>
  </div>
);

export default SearchContainer;