const pool = require('../database/psqlDb.js');

const dbController = {};

dbController.addRestaurant = (req, res, next) => {
  // console.log('reqbody', req.body);
  const { id, name, rating, image_url, review_count, url, price } = req.body;
  const { latitude, longitude } = req.body.coordinates;
  const { display_address } = req.body.location;
  const displayAddress = display_address.join(" ");

  //create query string
  const add = {
    text: `INSERT INTO restaurant (rating, "reviewCount", "yelpID", name, "displayAddress", "imageURL", url, price, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    values: [rating, review_count, id, name, displayAddress, image_url, url, price, latitude, longitude]
  }

  //add query to database
  pool.query(add)
    .then(result => {
      console.log('successfully added to database');
      res.status(200).send(req.body);
    })
    .catch(err => {
      if (err.routine = '_bt_check_unique') return res.status(200).send(req.body);
      else return res.status(400).send();
    })
}

//need to create !! 
//next -- add user/restaurant to likes table




module.exports = dbController;