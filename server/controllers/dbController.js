const pool = require('../database/psqlDb.js');

const dbController = {};

dbController.searchForRestaurant = (req, res, next) => {
  const { url } = req.body;
  const find = `SELECT _id FROM restaurants WHERE URL='${url}'`
  pool.query(find)
    .then(result => {
      console.log('searching database for restaurants')
      if (result.rows.length) {
        res.locals.rest_id = result.rows[0]._id;
      }
      res.locals.rest_id ?
        console.log('found restaurant in db - do not need to add to restaurants table') :
        console.log('did not find restaurant in db - adding to restaurants table');
      return next();
    })
    .catch(err => {
      console.log(err)
      console.log('ERROR');
      res.status(400).send();
    });
}

dbController.addRestaurant = (req, res, next) => {
  if(res.locals.rest_id) return next();
  const { id, name, rating, image_url, review_count, url, price } = req.body;
  const { latitude, longitude } = req.body.coordinates;
  const { location } = req.body.location;
  const display_address = location.join(" ");

  console.log(id, name, rating, image_url, review_count, url, price, latitude, longitude ,display_address)

  console.log(id, name, rating, image_url, review_count, url, price, latitude, longitude ,displayAddress)

  console.log(`adding ${name} to db! `)

  //create query string
  const add = {
    text: `INSERT INTO restaurants (rating, "review_count", "yelp_id", name, "display_address", "image_url", url, price, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING _id`,
    values: [rating, review_count, id, name, display_address, image_url, url, price, latitude, longitude]
  }

  //add query to database
  pool.query(add)
    .then(result => {
      console.log('result : ', result);
      console.log(`successfully added ${name} to db`);
      res.locals.rest_id = result.rows[0]._id;
      return next();
    })
    .catch(err => res.status(400).send());
}

dbController.addToLikeTable = (req, res) => {
  const userID = req.cookies.userId;
  const restID = res.locals.rest_id;
  console.log(userID,'  ' ,restID)

  const addLike = `INSERT INTO likes (user_id, rest_id) VALUES ('${userID}', '${restID}')`

  pool.query(addLike)
    .then(result => {
      console.log(`successfully added to likes table`);
      return res.send(req.body);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err)
    });
}




module.exports = dbController;