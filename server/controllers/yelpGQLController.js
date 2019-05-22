const APIKEY = process.env.YELP_API_Key;
const fetch = require('node-fetch');
const searchLimit = 18;

const yelpGQLController = {};

console.log('APIKEY: ', APIKEY);

yelpGQLController.searchYelpGQL = (req, res) => {
  const { name, zip } = req.params;
  console.log(req.params);
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
      'Authorization': 'Bearer RCHzqJmqDK-BgGQYiNjqjV5f0GuhOybwvvkSJGkWDKTdX03BXU3aT83MMKNmdoKvs3_sy4vWgj-60sDtbYb_WkLs0jvYoyzWyPZXiqNAs4JoN7J2vQ626rcQI4DkXHYx',
      'Accept': '*/*',
      'Content-Type': 'application/graphql',
    },
    body: searchInput,
  })
    .then(res => res.json())
    .then(data => res.send(data.data.search.business))
    .catch(err => {
      console.log('err: ', err);
      res.status(400).send(err)
    });
}


module.exports = yelpGQLController;
