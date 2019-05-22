const yelp = require('yelp-fusion');
const APIKey = 'PgeEZ_bVQ2ocvaCg89ZRCmcdPxLdsPcQWawYBYJhuD4X1ScfCkqpMNAdVHo1w4TsKXEq3G6VaGJTQyuBUrZUlElX69VEkttkVnN4YJgKSSiI8bQn0irMzClDrivgXHYx';
const client = yelp.client(APIKey);


const yelpController = {};

yelpController.searchYelp = (name, zip) => {
  if (!name || !zip) return {};

  const input = {
    term: name,
    location: zip,
    limit: 20,
  }

  client
    .search(input)
    .then(result => {
      console.log('in yelp controller')
      return result.jsonBody.businesses;
    })
    .catch(e => console.log(e));
}

module.exports = yelpController;

