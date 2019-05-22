const APIKEY = process.env.YELP_API_Key;
console.log(process.env.APIKEY);

const fetch = require('node-fetch');

console.log(APIKEY);

const yelpGQLController = {};
const searchLimit = 18;

yelpGQLController.searchYelpGQL = (req, res) => {
  const { name, zip } = req.params;
  if (!name || !zip) res.json({});

  console.log(name, zip);

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
    .then(result => {
      console.log('result from yelp api : ', result);
      result.json()
    })
    .then(result => {
      console.log('yelp graphql result', result);
      return res.send(result);
      // res.send(result.data.search.business)
    })
    .catch(err => {
      console.log('err: ', err);
      res.status(400).send(err)
    });
}


module.exports = yelpGQLController;
