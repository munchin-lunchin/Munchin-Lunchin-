const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { verifyUser } = require('./controllers/userController');
const { setCookie } = require('./controllers/cookieController');

const app = express();
const homeURL = path.join(__dirname, '../public/index.html'); // EDIT URL PATH FOR LOGIN PAGE.

app.use(bodyParser.urlencoded({ extended: true })); // allows us to use req.body
app.use(bodyParser.json());
app.use(cookieParser()); // allows us to read req.cookies (dont need it for res.cookie)
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

app.post('/login', verifyUser, setCookie);

app.listen(3000, () => 'Listening on port 3000');