const pool = require('../database/psqlDb.js');
const dbController = {};

dbController.searchForRestaurant = (req, res, next) => {
  const { url } = req.body;
  const find = `SELECT _id FROM restaurants WHERE URL='${url}'`

  pool.query(find)
    .then(result => {
      if (result.rows.length) {
        res.locals.rest_id = result.rows[0]._id;
      }
      return next();
    })
    .catch(err => {
      console.error(err)
      res.status(400).send();
    });
}

dbController.addRestaurant = (req, res, next) => {
  if (res.locals.rest_id) return next();
  const { id, name, rating, image_url, review_count, url, price } = req.body;
  const { latitude, longitude } = req.body.coordinates;

  const { display_address } = req.body.location;
  const displayAddress = display_address.join(" ");
  
  // const { location } = req.body.location;
  // const display_address = location.join(" ");

  //create query string
  const add = {
    text: `
      INSERT INTO restaurants (
        rating,
        "review_count",
        "yelp_id",
        name,
        "display_address",
        "image_url",
        url,
        price,
        latitude,
        longitude
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING _id`,
    values: [rating, review_count, id, name, display_address, image_url, url, price, latitude, longitude]
  }

  //add query to database
  pool
    .query(add)
    .then(result => {
      res.locals.rest_id = result.rows[0]._id;
      return next();
    })
    .catch(err => res.status(400).send());
}

dbController.addToLikeTable = (req, res) => {
  const userID = req.cookies.userId;
  const restID = res.locals.rest_id;

  const addLike = `INSERT INTO likes (user_id, rest_id) VALUES ('${userID}', '${restID}')`

  pool
    .query(addLike)
    .then(result => {
      return res.send(req.body);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err)
    });
}

dbController.checkUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('username ', username);
  console.log('password ', password);
  let taken;
  //check if username is available
  const checkUsername = `SELECT * FROM users WHERE username='${username}';`
  pool.query(checkUsername)
    .then(result => {
      console.log('Result from DB when searching user ', result);
      if (result.rowCount) {
        console.log('Found user in DB')
        return res.json({ authenticated: false });
      } else {
        console.log('user not in db');
        next()
      }
      
    })
    .catch(err => res.status(400).send());

  }

  dbController.addUser = (req, res, next) => {

    const { username, password } = req.body;
    //create query string
    const add = {
      text: `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING _id`,
      values: [ username, password ]
    }

    //add query to database
    pool.query(add)
      .then(result => {
        if (result.rows[0]._id) {
          console.log('Adding user to db')
          next()
        } else {
          return res.json({ authenticated: false });
        }
      })
      .catch(err => res.status(400).send());
  }




module.exports = dbController;
