const pool = require('../database/psqlDb.js');

const dbController = {};

dbController.searchForRestaurant = (req, res, next) => {
  const { url } = req.body.businesses[0];
  // console.log(url);
  const find = `SELECT _id FROM restaurant WHERE URL='${url}'`
  pool.query(find)
    .then(result => {
      console.log('searching database for restaurant')
      if (result.rows.length) {
        res.locals.rest_id = result.rows[0]._id
      }
      res.locals.rest_id ? console.log('found restaurant in db') : console.log('did not find restaurant in db');
      return next();
    })
    .catch(err => {
      console.log('ERROR');
      res.status(400).send();
    });
}

dbController.addRestaurant = (req, res, next) => {
  if (res.locals.rest_id) return next();
  const { id, name, rating, image_url, review_count, url, price } = req.body.businesses[0];
  const { latitude, longitude } = req.body.businesses[0].coordinates;
  const { display_address } = req.body.businesses[0].location;
  const displayAddress = display_address.join(" ");

  console.log(`adding ${name} to db! `)

  //create query string
  const add = {
    text: `INSERT INTO restaurant (rating, "reviewCount", "yelpID", name, "displayAddress", "imageURL", url, price, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    values: [rating, review_count, id, name, displayAddress, image_url, url, price, latitude, longitude]
  }

  //add query to database
  pool.query(add)
    .then(result => {
      console.log(`successfully added ${name} to db`);
      return next();
    })
    .catch(err => res.status(400).send());
}

dbController.addToLikeTable = (req, res) => {
  console.log('add to the like table now!')
  res.status(200).send(req.body);
}



// pool.query(add)
// .then(result => {
//   console.log('successfully added to database');
//   res.status(200).send(req.body);
// })
// .catch(err => {
//   if (err.routine = '_bt_check_unique') return res.status(200).send(req.body);
//   else return 
// })



module.exports = dbController;