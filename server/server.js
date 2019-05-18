const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { verifyUser } = require('./controllers/userController')
// const cookieParser = require('cookie-parser');

const app = express();
const homeURL = path.join(__dirname, './test.html'); // EDIT URL PATH FOR LOGIN PAGE.

app.use(bodyParser.urlencoded({ extended: true })); // allows us to use req.body
app.use(bodyParser.json());
// app.use(cookieParser()); // allows us to read req.cookies (dont need it for res.cookie)


// Login Page - get request
app.get('/login', (req, res) => {
  console.log(homeURL);
  res.sendFile(homeURL);
});

app.post('/login', verifyUser);

app.listen(3000, () => 'Listening on port 3000');