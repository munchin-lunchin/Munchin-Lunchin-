const APIKEY = process.env.YELP_API_Key;
const fetch = require('node-fetch');
const searchLimit = 18;

const yelpGQLController = {};
<<<<<<< HEAD
yelpGQLController.searchYelpGQL = (req, res) => {
  const { name, zip } = req.params;
  // console.log(req.params);
=======

yelpGQLController.searchYelpGQL = (req, res) => {
  const { name, zip } = req.params;
>>>>>>> dev
  if (!name || !zip) res.json({});

  const searchInput = `{
    search(term: "${name}", location: "${zip}", limit: ${searchLimit}) {
      business {
        name
        id
        rating
        review_count
        url
        hours {
          open {
            start
            end
            day
            }    
        }
        location {
          formatted_address
        }
        coordinates {
          latitude
          longitude
        }
        price
        photos
      }
    }
  }`;


  fetch('https://api.yelp.com/v3/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${APIKEY}`,
      'Accept': '*/*',
      'Content-Type': 'application/graphql',
    },
    body: searchInput,
  })
    .then(res => res.json())
    .then(data => res.send(data.data.search.business))
    .catch(err => {
      console.log('err: ', err);
      res.status(500).send(err)
    });
}


module.exports = yelpGQLController;
