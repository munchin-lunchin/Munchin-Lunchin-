const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { verifyUser } = require('./controllers/userController');
const { setCookie } = require('./controllers/cookieController');
const { searchYelp } = require('./controllers/yelpController');
const { addRestaurant, addToLikeTable, searchForRestaurant, checkUser, addUser } = require('./controllers/dbController');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const homeURL = path.join(__dirname, '../public/index.html');

/* 
 Express-GraphQL module allows Express to understand GraphQL. Provides simple way to create
 an Express server to run the GraphQL API. Used as middleware on a single route.
 This route will be an endpoint to interact with GraphQL data ('supercharged' endpoint to handle queries)
 */
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/gqlSchema.js');
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.use('/public', express.static(__dirname + './../public/'));
  app.get('/', (req, res) => res.sendFile(homeURL));
}

app.get('/yelp/restaurantName/:name/restaurantZip/:zip', searchYelp);

app.post('/likes', searchForRestaurant, addRestaurant, addToLikeTable);

app.post('/login', verifyUser, setCookie);

app.post('/signup', checkUser, addUser, setCookie)

app.get('/*', function(req, res) {
  res.sendFile(homeURL)
})


app.listen(3000, () => 'Listening on port 3000');

