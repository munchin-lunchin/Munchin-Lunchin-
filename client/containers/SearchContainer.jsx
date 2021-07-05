import React, { useState } from 'react';
import RestaurantSearchResult from './../components/RestaurantSearchResult';
import Form from './SearchFormStyle';
import Zip from './ZipInput';
import Name from './NameInput';

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
      <Form onSubmit={handleSubmit}>
        <Name type='text' name='name' placeholder="Location" onfocus="this.placeholder= ''" onChange={handleChange} onBlur={handleChange} required autoComplete="off" />
        <Zip type='text' name='zip' placeholder="Zip Code" onfocus="this.placeholder= ''" onChange={handleChange} onBlur={handleChange} required />
        {/* <button type='submit' id='login' disabled={disabled}>Search</button> */}

        <svg onClick={handleSubmit} width="20px" height="20px" viewBox="0 0 20 20">
          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Search-Icon" fill="#A69E91" fill-rule="nonzero">
              <g id="search">
                <path d="M8.28257507,7.91683864e-06 C11.4118232,-0.00430987469 14.2755649,1.75784236 15.6821772,4.55322064 C17.0887895,7.34859892 16.797389,10.6984926 14.9292293,13.2089873 L19.4003335,16.9908714 C19.8892999,17.4081645 20.1027575,18.064547 19.9527783,18.6896401 C19.8027992,19.3147331 19.3147544,19.802793 18.6896808,19.9527768 C18.0646072,20.1027607 17.4082451,19.8892964 16.990965,19.4003149 L13.2082829,14.9297692 C10.3188338,17.0713459 6.37724321,17.1022455 3.45457601,15.0062323 C0.531908818,12.9102191 -0.703117614,9.1668688 0.398427573,5.74308307 C1.49997276,2.31929735 4.68605182,-0.00154856159 8.28257507,7.91683864e-06 L8.28257507,7.91683864e-06 Z M8.28257507,14.8211823 C11.8937166,14.8211823 14.8211253,11.8936827 14.8211253,8.28242889 C14.8211253,4.67117511 11.8937166,1.74367549 8.28257507,1.74367549 C4.67143351,1.74367549 1.74402487,4.67117511 1.74402487,8.28242889 C1.74404894,11.8936657 4.67145053,14.8211387 8.28257507,14.8211387 L8.28257507,14.8211823 Z" id="Shape"></path>
              </g>
            </g>
          </g>
        </svg>


      </Form>
      <div id="searchContainer">
        {searchResultComponents}
      </div>
    </div >
  );
};

export default SearchContainer;
