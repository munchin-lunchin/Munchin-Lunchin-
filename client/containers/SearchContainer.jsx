import React, { useState } from 'react';
import RestaurantSearchResult from './../components/RestaurantSearchResult';

const SearchContainer = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [name, setName] = useState('');
  const [zip, setZip] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const { target } = event;
    if (target.name = 'restaurantName') setName(target.value);
    else if (target.name = 'restaurantZip') setZip(target.value);
    else (console.error('Unrecognized form field'));
    canSubmit();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
      body: JSON.stringify({
        'name': name,
        'zip': zip,
      })
    }
    console.log(JSON.stringify(payload));
    fetch('http://localhost:3000/yelp', payload)
      .then(res => res.json())
      .then(res => setRestaurantList(res));
  }

  // const queryYelpAPI = () => {
  //   const data = {
  //     name: document.querySelector('#restaurantName').value,
  //     zip: document.querySelector('#restaurantZip').value
  //   }

  //   fetch(`http://localhost:3000/yelp/restaurantName/${data.name}/restaurantZip/${data.zip}`,
  //     { method: 'GET' })
  //     .then(res => res.json())
  //     .then(res => setRestaurantList(res));
  // };

  function likeRestaurant(data) {
    console.log('yo data here:', data);
    fetch('http://localhost:3000/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => {
      console.log('We have received a response from the server about liking a restaurant:');
      console.log(resp);
      if (resp.status === 200) setRestaurantList([]);
      else console.log('There was an error!');
    }).then(() => location.reload())
      .catch(err => console.error(err));
  };

  const searchResultComponents = [];
  for (const restaurant of restaurantList) {
    searchResultComponents.push(<RestaurantSearchResult key={restaurant.id} data={restaurant} likeRestaurant={likeRestaurant.bind(this)} />)
  };

  const canSubmit = () => {
    let fields = document.querySelectorAll('input');
    fields = [...fields];
    setDisabled(!fields.every(field => field.value));
  }

  return (
    <form onSubmit={queryYelpAPI}>
      <input id="restaurantName" onChange={handleChange} onBlur={handleChange} required />
      <input id="restaurantZip" onChange={handleChange} onBlur={handleChange} required />
      <Button type='submit' id='login' disabled={disabled}>Search</Button>
      <div id="searchContainer">
        {searchResultComponents}
      </div>
    </form>
  );
};

export default SearchContainer;
