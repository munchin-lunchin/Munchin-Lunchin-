const pool = require('../database/psqlDb.js');

const dbController = {};

dbController.searchForRestaurant = (req, res, next) => {
  const { url } = req.body.data;
  const find = `SELECT _id FROM restaurant WHERE URL='${url}'`
  pool.query(find)
    .then(result => {
      console.log('searching database for restaurant')
      if (result.rows.length) {
        res.locals.rest_id = result.rows[0]._id;
      }
      res.locals.rest_id ?
        console.log('found restaurant in db - do not need to add to restaurant table') :
        console.log('did not find restaurant in db - adding to restaurant table');
      return next();
    })
    .catch(err => {
      console.log(err)
      console.log('ERROR');
      res.status(400).send();
    });
}

dbController.addRestaurant = (req, res, next) => {
  if (res.locals.rest_id) return next();
  const { id, name, rating, review_count, url, price } = req.body.data;
  const { latitude, longitude } = req.body.data.coordinates;
  const image_url = req.body.data.photos[0];
  const displayAddress = req.body.data.location.formatted_address;

  console.log(`adding ${name} to db! `)

  //create query string
  const add = {
    text: `INSERT INTO restaurant (rating, "reviewCount", "yelpID", name, "displayAddress", "imageURL", url, price, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING _id`,
    values: [rating, review_count, id, name, displayAddress, image_url, url, price, latitude, longitude]
  }

  //add query to database
  pool.query(add)
    .then(result => {
      // console.log('result pool.query(add): ', result);
      console.log(`successfully added ${name} to db`);
      res.locals.rest_id = result.rows[0]._id;
      return next();
    })
    .catch((err) => {
      console.log("error trying to add to database", err);
      res.status(500).send(err)
    });
}

dbController.addToLikeTable = (req, res) => {
  const userID = req.cookies.userId;
  //use this for testing - this is the userID the client gets back from the cookie
  // const userID = 1;
  const restID = res.locals.rest_id;
  const addLike = `INSERT INTO likes (user_id, rest_id) VALUES ('${userID}', '${restID}')`

  pool.query(addLike)
    .then(result => {
      console.log(`successfully added to likes table`);
      return res.send(req.body);
    })
    .catch(err => {
      console.log('error trying to add to likes tables', err);
      res.status(500).send(err)
    });
}




module.exports = dbController;