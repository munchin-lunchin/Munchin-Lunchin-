const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID, // GraphQLID is only descriptive. It's actually just type GraphQLString
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat
} = require('graphql');

const pool = require('../database/psqlDb.js');

/*
Table Schema:
1. User Table: 
 - _id
 - username
 - password

2. Restaurant Table: 
 - rating,
 - reviewCount,
 - yelpID,
 - name,
 - displayAddress,
 - imageURL,
 - url,
 - price,
 - latitude,
 - longitude

3. Likes Table
 - _id
 - user_id
 - rest_Id

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
        const getRestaurants = `
          SELECT r.* 
          FROM likes l INNER JOIN restaurant r ON l.rest_id = r._id 
          WHERE l.user_id = ${parent._id} 
        `;
        return pool
          .query(getRestaurants)
          .then(restaurants => {
            // console.log('The restaurants from the db are: \n', restaurants.rows);
            return restaurants.rows;
          })
          .catch(err => console.error('Error during "select restaurants" GraphQL UserType\n', err));
      }
    }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    _id: { type: GraphQLID },
    rating: { type: GraphQLFloat },
    reviewCount: { type: GraphQLInt },
    yelpID: { type: GraphQLString },
    name: { type: GraphQLString },
    displayAddress: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    url: { type: GraphQLString },
    price: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) { 
        const getUsers = `
          SELECT u.* 
          FROM likes l INNER JOIN users u ON l.user_id = u._id 
          WHERE l.rest_id = ${parent._id} 
        `
        return pool
          .query(getUsers)
          .then(users => {
            console.log('The users from the db are: \n', users.rows);
            return users.rows;
          })
          .catch(err => console.error('Error during "select users" GraphQL RestaurantType\n', err));
      }
    }
  })
});

const LikeType = new GraphQLObjectType({
  name: 'Like',
  fields: {
    _id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    rest_id: { type: GraphQLInt }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, { _id }) {
        return pool
          .query(`SELECT * FROM users WHERE _id = '${_id}'`)
          .then(user => {
            console.log('The user from the db is: \n', user.rows[0]);
            return user.rows[0];
          })
          .catch(err => console.error('Error during "select user" GraphQL query\n', err));
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      args: { userId: { type: GraphQLID } },
      resolve(parent, { userId }) {
        const getRestaurants = `
          SELECT r.*
          FROM likes l INNER JOIN restaurant r ON r._id = l.rest_id
          WHERE l.user_id = ${userId}
        `;
        return pool
          .query(getRestaurants)
          .then(restaurants => {
            console.log('The restaurants from the db is: \n', restaurants.rows);
            return restaurants.rows;
          })
          .catch(err => console.error('Error during "select restaurants" GraphQL query\n', err));
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

// STRETCH FEATURE? 
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLike: {
      type: LikeType,
      args: { 
        user_id: { type: GraphQLInt },
        rest_id: { type: GraphQLInt }
      },
      resolve(parent, { user_id, rest_id }) {
        const insertLike = {
          text: `INSERT INTO likes (user_id, rest_id) VALUES ($1, $2) RETURNING *`,
          values: [user_id, rest_id]
        };
        return pool
          .query(insertLike)
          .then(like => {
            console.log('Successfully inserted like: \n', like.rows[0]);
            return like.rows[0];
          })
          .catch(err => console.error('Error during addLike GraphQL mutation\n', err));
      }
    },

    deleteLike: {
      type: LikeType,
      args: { 
        user_id: { type: GraphQLInt },
        rest_id: { type: GraphQLInt }
      },
      resolve(parent, { user_id, rest_id }) {
        console.log('userID is', user_id);
        console.log('rest_id is', rest_id);
        let like;
        return pool
          .query(`SELECT * FROM likes WHERE user_id = ${user_id} AND rest_id = ${rest_id}`)
          .then(likeData => {
            like = likeData.rows[0];
            console.log('About to delete like: \n', like);
            return pool
              .query(`DELETE FROM likes WHERE user_id = ${user_id} AND rest_id = ${rest_id}`)
              .then(() => {
                console.log('Successfully deleted like: \n', like);
                return like;
              });
          })
          .catch(err => console.error('Error during deleteLike GraphQL mutation\n', err));
      }
    },

    addUser: {
      type: UserType,
      args: { 
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, { username, password }) {
        const insertUser = {
          text: `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
          values: [username, password]
        };
        return pool
          .query(insertUser)
          .then(user => {
            console.log('Successfully inserted user: \n', user.rows[0]);
            return user.rows[0];
          })
          .catch(err => console.error('Error during addUser GraphQL mutation\n', err));
      }
    },

    // mutation {
    //   addRestaurant(rating:5, reviewCount:10, yelpID:"GQLID", name:"GQLRestaurant", displayAddress:"GQL Street, NY", imageURL:"www.gql.com", url: "www.gql.com", price:"$$$$", latitude:20, longitude:50) {
    //     rating
    //     reviewCount
    //     yelpID
    //     name
    //     displayAddress
    //     imageURL
    //     url
    //     price
    //     latitude
    //     longitude
    //   }
    // }
    addRestaurant: {
      type: RestaurantType,
      args: { 
        rating: { type: GraphQLInt },
        reviewCount: { type: GraphQLInt },
        yelpID: { type: GraphQLString },
        name: { type: GraphQLString },
        displayAddress: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        url: { type: GraphQLString },
        price: { type: GraphQLString },
        latitude: { type: GraphQLInt },
        longitude: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const {
          rating,
          reviewCount,
          yelpID,
          name,
          displayAddress,
          imageURL,
          url,
          price,
          latitude,
          longitude
        } = args;
        const insertRestaurant = {
          text: `
            INSERT INTO restaurant
            (rating, "reviewCount", "yelpID", name, "displayAddress", "imageURL", url, price, latitude, longitude)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
          `,
          values: [rating, reviewCount, yelpID, name, displayAddress, imageURL, url, price, latitude, longitude]
        };
        return pool
          .query(insertRestaurant)
          .then(restaurant => {
            console.log('Successfully inserted restaurant: \n', restaurant.rows[0]);
            return restaurant.rows[0];
          })
          .catch(err => console.error('Error during addRestaurant GraphQL mutation\n', err));
      }
    },

    // EDIT ME FOR WHAT FIELDS
    // mutation {
    //   deleteRestaurant(yelpID: "GQLID") {
    //     rating
    //     reviewCount
    //     yelpID
    //     name
    //     displayAddress
    //     imageURL
    //     url
    //     price
    //     latitude
    //     longitude
    //   }
    // }
    deleteRestaurant: {
      type: RestaurantType,
      args: {
        yelpID: { type: GraphQLString }        
      },
      resolve(parent, { yelpID }) {
        let restaurant;
        return pool
          .query(`SELECT * FROM restaurant WHERE "yelpID" = '${yelpID}'`)
          .then(rest => {
            restaurant = rest.rows[0];
            console.log('About to delete restaurant: \n', restaurant);
            return pool
              .query(`DELETE FROM restaurant WHERE "yelpID" = '${yelpID}'`)
              .then(() => {
                console.log('Successfully deleted restaurant: \n', restaurant);
                return restaurant;
              });
          })
          .catch(err => console.error('Error during deleteRestaurant GraphQL mutation\n', err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});