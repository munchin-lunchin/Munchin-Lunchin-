const APIKey = 'PgeEZ_bVQ2ocvaCg89ZRCmcdPxLdsPcQWawYBYJhuD4X1ScfCkqpMNAdVHo1w4TsKXEq3G6VaGJTQyuBUrZUlElX69VEkttkVnN4YJgKSSiI8bQn0irMzClDrivgXHYx'';
const fetch = require('node-fetch');

const yelpGQLController = {};
const searchLimit = 18;

yelpGQLController.yelpGQLsearch = (req, res) => {
  const { name, zip } = req.params;
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
      'Authorization': `Bearer ${APIKEY} `,
      'Accept': '*/*',
      'Content-Type': 'application/graphql',
    },
    body: searchInput,
  })
    .then(result => result.json())
    .then(result => {
      res.send(result.data.search.business)
      // console.log('yelp graphql business search ', result.data.search.business);
    })
    .catch(err => {
      console.log('err: ', err);
      res.status(400).send(err)
    });
}


module.exports = yelpGQLController;
