// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');

// // Dummy data
// const users = [
//   { _id: '1', username: 'user1', password: 'pw1' },
//   { _id: '2', username: 'user2', password: 'pw2' },
//   { _id: '3', username: 'user3', password: 'pw3' }
// ];

// const restaurants = [
//   { 
//     id: '1', 
//     name: 'McDonalds', 
//     url: 'www.mcdonalds.com', 
//     displayAddress: '123 Canal Street, NY 11111', 
//     review_count: '$',
//   },
//   { 
//     id: '2', 
//     name: 'Chipotle', 
//     url: 'www.chipotle.com', 
//     displayAddress: '111 White Street, NY 11111', 
//     review_count: '$$',
//   },
//   { 
//     id: '3', 
//     name: 'Vivis', 
//     url: 'www.vivis.com', 
//     displayAddress: '581 Walker Street, NY 11244', 
//     review_count: '$$',
//   }
// ];

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     user(username: String!, password: String!): String
//     quoteOfTheDay: String
//     random: Float!
//     rollThreeDice: [Int]
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   quoteOfTheDay: () => {
//     return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
//   },
//   random: () => {
//     return Math.random();
//   },
//   rollThreeDice: () => {
//     return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
//   },
//   user: ({ username, password }) => {
//     for (let user of users) {
//       if (user.username === username && user.password === password) return user;
//     }
//   },
// };

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');

/******************************** */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`);

// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

var root = {
  user: function ({id}) {
    return fakeDatabase[id];
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');