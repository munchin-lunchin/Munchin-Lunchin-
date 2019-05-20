const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID, // GraphQLID is only descriptive. It's actually just type GraphQLString
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const pool = require('../database/psqlDb.js');

// Dummy data
// const users = [
//   { _id: '1', username: 'user1', password: 'pw1' },
//   { _id: '2', username: 'user2', password: 'pw2' },
//   { _id: '3', username: 'user3', password: 'pw3' }
// ];

// const restaurants = [
//   { 
//     _id: '1', 
//     name: 'McDonalds', 
//     url: 'www.mcdonalds.com', 
//     displayAddress: '123 Canal Street, NY 11111', 
//     review_count: '$',
//   },
//   { 
//     _id: '1', 
//     name: 'Chipotle', 
//     url: 'www.chipotle.com', 
//     displayAddress: '111 White Street, NY 11111', 
//     review_count: '$$',
//   },
//   { 
//     _id: '3', 
//     name: 'Vivis', 
//     url: 'www.vivis.com', 
//     displayAddress: '581 Walker Street, NY 11244', 
//     review_count: '$$',
//   }
// ];

/*
Table Schema:
1. User Table: 
 - _id
 - username
 - password

2. Restaurant Table: 
 - _id
 - name
 - url
 - displayAddress
 - reviewCount
 - stars

3. Likes Table
 - _id
 - userId
 - restaurantId

*/

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        // Select... from inner join all the three tables 
        const userId = parent._id;
        const getRestaurants = `
          SELECT r.* 
          FROM likes l INNER JOIN restaurant r ON l.rest_id = r._id 
          WHERE l.user_id = ${userId} 
        `;
        return pool
          .query(getRestaurants)
          .then(restaurants => {
              console.log('The restaurants from the db are: \n', restaurants.rows);
              return restaurants.rows;
          })
          .catch(err => console.error('Error during "select restaurants" GraphQL\n', err));
      }
    }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    displayAddress: { type: GraphQLString },
    reviewCount: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // Select... from inner join all the three tables 
        const restaurantId = parent._id;
        const getUsers = `
          SELECT u.* 
          FROM likes l INNER JOIN users u ON l.user_id = u._id 
          WHERE l.rest_id = ${restaurantId} 
        `
        return pool
          .query(getUsers)
          .then(users => {
            console.log('The users from the db are: \n', users.rows);
            return users.rows;
          })
          .catch(err => console.error('Error during "select users" GraphQL\n', err));
      }
    }
  })
});

// Client Query
// {
//   user (_id: 1, username: 'user') {
//     username
//     password
//   }
// }

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        // Querying dummy data
        // for (let user of users) {
        //   if (user._id === args._id) {
        //     console.log('user is the folowing', user);
        //     return user;
        //   }
        // }

        // Querying real PostgreSQL data
        console.log('Im in user resolver');
        return pool
          .query(`SELECT * FROM users WHERE _id='${args._id}'`)
          .then(user => {
              console.log('The user from the db is: \n', user.rows[0]);
              return user.rows[0];
          })
          .catch(err => console.error('Error during "select user" GraphQL\n', err));
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        const getRestaurants = `
          SELECT r.*
          FROM likes l INNER JOIN restaurant r ON r._id = l.rest_id
          WHERE l.user_id = ${args.userId}
        `;

        return pool
          .query(getRestaurants)
          .then(restaurants => {
              console.log('The restaurants from the db is: \n', restaurants.rows);
              return restaurants.rows;
          })
          .catch(err => console.error('Error during "select restaurants" GraphQL\n', err));

        // Dummy data
        // for (let restaurant of restaurants) {
        //   if (restaurant._id === args._id) return restaurant;
        // }
      }
    }
  }
});

// Client query
// mutation {
//   addUser(username: 'geoff', password: '123') {
//     username
//     age
//   }
// }

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addUser: {
//       type: UserType,
//       args: { 
//         username: { type: GraphQLString },
//         password: { type: GraphQLString }
//       },
//       resolve(parent, { username, password }) {
//         console.log('Im in Mutation -> addUser resolver');
//         const insertUser = {
//           text: `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
//           values: [username, password]
//         };
//         return pool
//           .query(insertUser)
//           .then(user => {
//               console.log('Successfully inserted user: \n', user.rows[0]);
//               return user.rows[0];
//           })
//           .catch(err => console.error('Error during "addUser" GraphQL\n', err));
//       }
//     },

//     addRestaurant: {
//       type: UserType,
//       args: { 
//         username: { type: GraphQLString },
//         password: { type: GraphQLString }
//       },
//       resolve(parent, { username, password }) {
//         console.log('Im in Mutation -> addUser resolver');
//         const insertUser = {
//           text: `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
//           values: [username, password]
//         };
//         return pool
//           .query(insertUser)
//           .then(user => {
//               console.log('Successfully inserted user: \n', user.rows[0]);
//               return user.rows[0];
//           })
//           .catch(err => console.error('Error during "addUser" GraphQL\n', err));
//       }
//     }
//   }
// });

module.exports = new GraphQLSchema({
  query: Query,
  // mutation: Mutation
})