const pool = require('../database/psqlDb.js');

const userController = {};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ authenticated: false });

  const userQuery = `SELECT * FROM users where username='${username}' AND password='${password}'`;
  pool
    .query(userQuery)
    .then(user => {
        console.log('The user from the db is: \n', user.rows[0]);
        if (!user.rows[0]) return res.json({ authenticated: false });
        res.locals.id = user.rows[0]._id;
        return next();
    })
    .catch(err => res.status(400).send('Error getting user from db', err))
}

module.exports = userController;