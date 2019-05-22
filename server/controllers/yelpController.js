const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);
const yelpController = {};

yelpController.searchYelp = (name, zip) => {
  if (!name || !zip) return {};

  const input = {
    term: name,
    location: zip,
    limit: 20,
  }

  client.search(input)
    .then(result => result.jsonBody.businesses)
    .catch(e => console.error(e));
}

module.exports = yelpController;

