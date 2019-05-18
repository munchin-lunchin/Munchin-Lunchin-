const { Pool } = require('pg');

// Connect to db
const pool = new Pool({
  user: 'kzbujefd',
  host: 'isilo.db.elephantsql.com',
  database: 'kzbujefd',
  password: 'az33ZfTosSKCrfqnrM1dtGHDPIywoiQ2',
  port: 5432
});

pool.connect((err, client, done) => {
  if (err) return console.error('could not connect to postgres', err);
  console.log('Successfully connected to db!');
});

const userController = {};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const userQuery = `SELECT username, password FROM users where username='${username}' AND password='${password}'`;
  // console.log(username, password)
  // query our database with the input 
  pool
    .query(userQuery)
    .then(result => {
        if (result.rows[0]) res.redirect('https://www.yelp.com/');
        else res.redirect('http://www.google.com');
    })
    .catch(err => console.log('error. cannot select username'))

  
  //if password match redirect user to main page 
  //if not send redirect user to yelp.com
   
}

module.exports = userController;