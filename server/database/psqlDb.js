const { Pool } = require('pg');

// Connect db
// Please insert your own connection string (ElephantSQL - Tiny Turtle Plan is FREE)
const pool = new Pool({
  user: 'vyniuedk',
  host: 'raja.db.elephantsql.com',
  database: 'vyniuedk',
  password: 'm-SxYOe6yIRhpJ6aTYcqieNg3_K4JhOZ',
  port: 5432
});

pool.connect((err, client, done) => {
  if (err) return console.error('could not connect to postgres', err);
  console.log('Successfully connected to db!');
});

module.exports = pool;