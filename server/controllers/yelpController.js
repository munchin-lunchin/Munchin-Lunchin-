const yelp = require('yelp-fusion');
const APIKey = 'PgeEZ_bVQ2ocvaCg89ZRCmcdPxLdsPcQWawYBYJhuD4X1ScfCkqpMNAdVHo1w4TsKXEq3G6VaGJTQyuBUrZUlElX69VEkttkVnN4YJgKSSiI8bQn0irMzClDrivgXHYx';
const client = yelp.client(APIKey);


/** 
 * MVP:
 * When client searches for list of restaurants, server just queries the data and returns/displays
 * the best matched results
 * 
 * When client clicks add/like restaurant, we add that restaurant to our database from our server
 * 
 * When client clicks 'X', remove the restaurant from database
 * 
 * THEN 
 * 
*/

client
  .search({
    term: 'Food', // restaurant name
    location: 'Mott Street, NY', // zip code
    limit: 20,
    // price:
  })
  .then(response => {
    // response.jsonBody.businesses.forEach(bus => {
    //   console.log(bus);
    // })

    // `rating
    // review_count
    // id (yelp_id)
    // name
    // displayAddress
    // image_url
    // url
    // price*
    // coordinates*`
    console.log(response.jsonBody.businesses[0]);
  })
  .catch(e => {
    console.log(e);
  });