import { gql } from 'apollo-boost'
import { graphql, Query } from 'react-apollo'
import RestaurantComponent from '../components/RestaurantComponent'
import React, { useState, useEffect } from 'react';
import { joesFrontEndCookieParser } from './../services/authenticate';


//Graphql query for restaurants our user has liked previously.
const myCookies = joesFrontEndCookieParser(document.cookie);
const myUserId = myCookies.userId;
console.log(myCookies);
const getLikesQuery = gql`
{
  user(_id: ${myUserId}) {
    username
    restaurants {
      name
      displayAddress
      price
      rating
      reviewCount
      imageURL
      _id
    }
  }
}
`



const HistoryContainer = ({ data }) => {
  // const [restaurantHistory, setRestaurantHistory] = useState([]);

  //no idea why this function runs a second time once data has loaded and why use effect is not needed
  const restaurantMapping = () => {
    if (data.loading) {
      return <div>Loading</div>
    } else {
      console.log(data);
      return data.user.restaurants.map((rest) => (
        <RestaurantComponent {...rest} key={rest._id} />
      ))
    }
  }

  return (
    <div id="History Container">
      <h2> History Container </h2>
      {restaurantMapping()}
    </div>
  )
};


//binds our query to the current container by adding the output to props.data.  
//It's like redux when you use connect on map state to props and map dispatch to props
export default graphql(getLikesQuery)(HistoryContainer);
