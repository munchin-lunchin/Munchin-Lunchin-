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

module.exports = pool;