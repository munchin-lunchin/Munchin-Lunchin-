const { Pool } = require('pg');

// Connect db
// Please insert your own connection string (ElephantSQL - Tiny Turtle Plan is FREE)
const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 1111 
});

pool.connect((err, client, done) => {
  if (err) return console.error('could not connect to postgres', err);
  console.log('Successfully connected to db!');
});

module.exports = pool;