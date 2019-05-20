const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { verifyUser } = require('./controllers/userController');
const { setCookie } = require('./controllers/cookieController');
const { searchYelp } = require('./controllers/yelpController');
const { addRestaurant } = require('./controllers/dbController');

const app = express();
const homeURL = path.join(__dirname, '../public/index.html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Set up routes
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.get('/', (req, res) => res.sendFile(homeURL));
}

// // Login Page - get request
app.get('/redirect', (req, res) => {
  console.log(path.resolve(__dirname, 'test.html'));
  res.sendFile(path.resolve(__dirname, 'test.html'));
});

//route to yelp API
app.get('/yelp', searchYelp);

//route to add liked restaurant
app.post('/likes', addRestaurant);

app.post('/login', verifyUser, setCookie);

app.listen(3000, () => 'Listening on port 3000');