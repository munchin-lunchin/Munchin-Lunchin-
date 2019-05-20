const yelp = require('yelp-fusion');
const APIKey = 'PgeEZ_bVQ2ocvaCg89ZRCmcdPxLdsPcQWawYBYJhuD4X1ScfCkqpMNAdVHo1w4TsKXEq3G6VaGJTQyuBUrZUlElX69VEkttkVnN4YJgKSSiI8bQn0irMzClDrivgXHYx';
const client = yelp.client(APIKey);


const yelpController = {};

yelpController.searchYelp = (req, res) => {
  const { name, zip } = req.body;
  if (!name || !zip) res.json({});

  const input = {
    term: name,
    location: zip,
    limit: 20,
  }

  client
    .search(input)
    .then(result => res.status(200).send(result.jsonBody.businesses))
    .catch(e => console.log(e));
}

module.exports = yelpController;

