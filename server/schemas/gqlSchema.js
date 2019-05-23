const { searchYelp } = require('../controllers/yelpController.js');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID, // GraphQLID is only descriptive. It's actually just type GraphQLString
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat
} = require('graphql');
const yelp = require('yelp-fusion');
const pool = require('../database/psqlDb.js');
const client = yelp.client(process.env.YELP_API_KEY);



/*
Table Schema:
1. User Table:
 - _id
 - username
 - password

2. Restaurant Table:
 - rating,
 - review_count,
 - yelp_id,
 - name,
 - display_address,
 - image_url,
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
          FROM likes l INNER JOIN restaurants r ON l.rest_id = r._id
          WHERE l.user_id = ${parent._id}
        `;
        return pool
          .query(getRestaurants)
          .then(restaurants => restaurants.rows)
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
    review_count: { type: GraphQLInt },
    yelp_id: { type: GraphQLString },
    name: { type: GraphQLString },
    display_address: { type: GraphQLString },
    image_url: { type: GraphQLString },
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
          .then(users => users.rows)
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
          .then(user => user.rows[0])
          .catch(err => console.error('Error during "select user" GraphQL query\n', err));
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      args: { userId: { type: GraphQLID } },
      resolve(parent, { userId }) {
        const getRestaurants = `
          SELECT r.*
          FROM likes l INNER JOIN restaurants r ON r._id = l.rest_id
          WHERE l.user_id = ${userId}
        `;
        return pool
          .query(getRestaurants)
          .then(restaurants => {
            return restaurants.rows;
          })
          .catch(err => console.error('Error during "select restaurants" GraphQL query\n', err));
      }
    },
    yelp: {
      type: new GraphQLList(RestaurantType),
      args: { name: { type: GraphQLString }, zipcode: { type: GraphQLInt }},
      resolve(parent, { name, zipcode }){
        const input = {
          term: name,
          location: zipcode,
          limit: 20,
        }
        return client
          .search(input)
          .then(result => {
            const queryResult = [];
            for(let rest in result.jsonBody.businesses){
      
              const {
                name,
                rating,
                review_count,
                id,
                location,
                image_url,
                url,
                price,
                coordinates
              } = result.jsonBody.businesses[rest]

              const restaurant = {
                name,
                rating,
                review_count,
                yelp_id: id,
                display_address: location.address1 + ', ' + location.city + ', ' + location.state + ', ' + location.zip_code,
                image_url,
                url,
                price,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
              }

              queryResult.push(restaurant)

            }
            return queryResult;
          })
          .catch(e => console.error(e));
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
          .then(like => like.rows[0])
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
        let like;
        return pool
          .query(`SELECT * FROM likes WHERE user_id = ${user_id} AND rest_id = ${rest_id}`)
          .then(likeData => {
            return pool
              .query(`DELETE FROM likes WHERE user_id = ${user_id} AND rest_id = ${rest_id}`)
              .then(() => likeData.rows[0])
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
          .then(user => user.rows[0])
          .catch(err => console.error('Error during addUser GraphQL mutation\n', err));
      }
    },

    addRestaurant: {
      type: RestaurantType,
      args: {
        rating: { type: GraphQLFloat },
        review_count: { type: GraphQLInt },
        yelp_id: { type: GraphQLString },
        name: { type: GraphQLString },
        display_address: { type: GraphQLString },
        image_url: { type: GraphQLString },
        url: { type: GraphQLString },
        price: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        user_id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const {
          rating,
          review_count,
          yelp_id,
          name,
          display_address,
          image_url,
          url,
          price,
          latitude,
          longitude,
          user_id
        } = args;
        console.log(' in the resolve!! ', user_id, args)
        const insertRestaurant = {
          text: `
            INSERT INTO restaurants (
              rating,
              "review_count",
              "yelp_id",
              name,
              "display_address",
              "image_url",
              url,
              price,
              latitude,
              longitude
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
          `,
          values: [
            rating,
            review_count,
            yelp_id,
            name,
            display_address,
            image_url,
            url,
            price,
            latitude,
            longitude
          ]
        };

       return pool
          .query(insertRestaurant)
          .then(restaurant => {
            return pool
              .query(`INSERT INTO likes (user_id, rest_id) VALUES(${user_id}, ${restaurant.rows[0]._id});`)
              .then(result => result.rows[0])
              .catch(err => console.log('error!!', err))
          })
          .catch(err => console.error('Error during addRestaurant GraphQL mutation\n', err));
      }
    },

    // EDIT ME FOR WHAT FIELDS
    // mutation {
    //   deleteRestaurant(yelp_id: "GQLID") {
    //     rating
    //     review_count
    //     yelp_id
    //     name
    //     display_address
    //     image_url
    //     url
    //     price
    //     latitude
    //     longitude
    //   }
    // }

    deleteRestaurant: {
      type: RestaurantType,
      args: {
        yelp_id: { type: GraphQLString }
      },
      resolve(parent, { yelp_id }) {
        return pool
          .query(`SELECT * FROM restaurants WHERE "yelp_id" = '${yelp_id}'`)
          .then(rest => {
            return pool
              .query(`DELETE FROM restaurants WHERE "yelp_id" = '${yelp_id}'`)
              .then(() => rest.rows[0]);
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
