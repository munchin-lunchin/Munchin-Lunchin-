const yelp = require('yelp-fusion');
const APIKey = process.env.YELP_API_Key;
const client = yelp.client(APIKey);

const yelpController = {};

yelpController.searchYelp = (req, res) => {
  const { name, zip } = req.params;
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

