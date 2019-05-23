import React, { useState } from 'react';
import RestaurantSearchResult from './../components/RestaurantSearchResult';

const SearchContainer = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [name, setName] = useState('');
  const [zip, setZip] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const { target } = event;
    if (target.name === 'name') setName(target.value);
    else if (target.name === 'zip') setZip(target.value);
    else (console.error('Unrecognized form field'));
    canSubmit();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': name,
        'zip': zip,
      }),
    }
    console.log(JSON.stringify(payload));
    fetch('http://localhost:3000/yelp', payload)
      .then(res => res.json())
      .then(res => setRestaurantList(res));
  }


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
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' className='loginInputs' onChange={handleChange} onBlur={handleChange} required autoComplete="off" />
        <input type='text' name='zip' className='loginInputs' onChange={handleChange} onBlur={handleChange} required />
        <button type='submit' id='login' disabled={disabled}>Log In</button>
      </form>
      <div id="searchContainer">
        {searchResultComponents}
      </div>
    </div>
  );
};

export default SearchContainer;
